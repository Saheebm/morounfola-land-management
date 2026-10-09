import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';

export interface FormFieldProps {
  labelBn: string;
  labelEn?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  id?: string;
  className?: string;
  children: (props: {
    id: string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
    className: string;
  }) => React.ReactNode;
}

export function FormField({
  labelBn,
  labelEn,
  required = false,
  helperText,
  error,
  id: customId,
  className = '',
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const id = customId || generatedId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  const inputClasses = `w-full rounded-lg min-h-[44px] px-3.5 py-2 text-[15px] bg-white text-ink transition-colors ${
    error
      ? 'border border-accent-500 focus:ring-2 focus:ring-accent-500/20'
      : 'border border-[#d1d5db] focus:border-brand-600 focus:ring-2 focus:ring-brand-500/30'
  } outline-none disabled:bg-surface-sunken disabled:cursor-not-allowed`;

  const describedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[14px] font-semibold text-ink flex items-center gap-1.5 flex-wrap">
        <span>{labelBn}</span>
        {labelEn && <span className="text-[13px] text-ink-muted font-normal">({labelEn})</span>}
        {required && (
          <span className="text-accent-600 font-bold" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children({
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
        className: inputClasses,
      })}

      {error ? (
        <p id={errorId} role="alert" className="text-[13px] text-accent-600 flex items-center gap-1 mt-0.5">
          <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-[13px] text-ink-muted mt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-lg min-h-[44px] px-3.5 py-2 text-[15px] bg-white text-ink border ${
          error
            ? 'border-accent-500 focus:ring-2 focus:ring-accent-500/20'
            : 'border-[#d1d5db] focus:border-brand-600 focus:ring-2 focus:ring-brand-500/30'
        } outline-none disabled:bg-surface-sunken disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full rounded-lg min-h-[44px] px-3.5 py-2 text-[15px] bg-white text-ink border ${
          error
            ? 'border-accent-500 focus:ring-2 focus:ring-accent-500/20'
            : 'border-[#d1d5db] focus:border-brand-600 focus:ring-2 focus:ring-brand-500/30'
        } outline-none disabled:bg-surface-sunken disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, rows = 3, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full rounded-lg p-3 text-[15px] bg-white text-ink border ${
          error
            ? 'border-accent-500 focus:ring-2 focus:ring-accent-500/20'
            : 'border-[#d1d5db] focus:border-brand-600 focus:ring-2 focus:ring-brand-500/30'
        } outline-none disabled:bg-surface-sunken disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
