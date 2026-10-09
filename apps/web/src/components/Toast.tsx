import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import type React from 'react';
import { useAppStore, type ToastMessage } from '../store/useAppStore';

const toastConfig: Record<
  ToastMessage['type'],
  {
    bg: string;
    border: string;
    text: string;
    iconColor: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }
> = {
  success: {
    bg: 'bg-brand-50',
    border: 'border-brand-200',
    text: 'text-brand-900',
    iconColor: 'text-brand-600',
    icon: CheckCircle2,
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-900',
    iconColor: 'text-accent-600',
    icon: AlertCircle,
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-900',
    iconColor: 'text-amber-600',
    icon: AlertTriangle,
  },
  info: {
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-900',
    iconColor: 'text-sky-600',
    icon: Info,
  },
};

export function ToastContainer() {
  const toasts = useAppStore((state) => state.toasts);
  const removeToast = useAppStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const config = toastConfig[toast.type];
        const Icon = config.icon;

        return (
          <div
            key={toast.id}
            role={toast.type === 'error' ? 'alert' : 'status'}
            className={`pointer-events-auto p-4 rounded-xl border shadow-card flex items-start gap-3 ${config.bg} ${config.border} ${config.text} transition-all duration-200`}
          >
            <Icon size={20} className={`${config.iconColor} shrink-0 mt-0.5`} aria-hidden="true" />
            <div className="flex-1 min-w-0">
              {toast.title && <h4 className="text-[14px] font-semibold">{toast.title}</h4>}
              <p className="text-[13px] leading-snug">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-sunken/40 cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
