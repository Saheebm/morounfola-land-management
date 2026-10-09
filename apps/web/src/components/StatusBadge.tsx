import { statusMap, type StatusKey } from '../lib/statusMap';
import { useAppStore } from '../store/useAppStore';

export interface StatusBadgeProps {
  status: StatusKey;
  bilingual?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({
  status,
  bilingual = false,
  className = '',
  size = 'md',
}: StatusBadgeProps) {
  const language = useAppStore((state) => state.language);
  const config = statusMap[status] || statusMap.Pending;
  const Icon = config.icon;

  const text = bilingual
    ? `${config.labelBn} · ${config.labelEn}`
    : language === 'bn'
      ? config.labelBn
      : config.labelEn;

  const sizeClasses =
    size === 'sm'
      ? 'text-[12px] py-[1.5px] px-2.5 gap-1.5'
      : 'text-[13px] py-[2.5px] px-3 gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      <Icon size={size === 'sm' ? 13 : 14} aria-hidden="true" className="shrink-0" />
      <span>{text}</span>
    </span>
  );
}
