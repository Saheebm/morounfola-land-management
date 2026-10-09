import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-sm border border-transparent disabled:bg-brand-300',
  secondary:
    'bg-brand-50 text-brand-800 border border-brand-200 hover:bg-brand-100 font-semibold disabled:opacity-60',
  outline:
    'bg-white border border-[#d1d5db] text-ink hover:bg-surface-sunken font-medium disabled:opacity-50',
  danger:
    'bg-accent-500 hover:bg-accent-600 text-white font-semibold shadow-sm border border-transparent disabled:opacity-50',
  ghost:
    'bg-transparent hover:bg-surface-sunken text-ink font-medium disabled:opacity-40',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center gap-2 rounded-lg text-[15px] min-h-[44px] px-4 transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={18} aria-hidden="true" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0" aria-hidden="true">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
