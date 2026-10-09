import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white border border-[#e5e7eb] rounded-xl shadow-card overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({ className = '', action, children, ...props }: CardHeaderProps) {
  return (
    <div
      className={`px-5 py-4 border-b border-[#e5e7eb] flex items-center justify-between flex-wrap gap-3 ${className}`}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export interface CardTitleProps {
  titleBn: string;
  titleEn?: string;
  badge?: React.ReactNode;
  className?: string;
}

export function CardTitle({ titleBn, titleEn, badge, className = '' }: CardTitleProps) {
  return (
    <div className={`flex items-center gap-2.5 flex-wrap ${className}`}>
      <h2 className="text-[20px] md:text-[22px] font-semibold text-ink leading-tight">
        {titleBn}
      </h2>
      {titleEn && (
        <span className="text-[13px] md:text-[14px] text-ink-muted font-normal">
          · {titleEn}
        </span>
      )}
      {badge && <div className="ml-auto">{badge}</div>}
    </div>
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ className = '', children, ...props }: CardContentProps) {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardFooter({ className = '', children, ...props }: CardFooterProps) {
  return (
    <div
      className={`px-5 py-3.5 bg-surface-subtle border-t border-[#e5e7eb] flex items-center justify-end gap-3 flex-wrap ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
