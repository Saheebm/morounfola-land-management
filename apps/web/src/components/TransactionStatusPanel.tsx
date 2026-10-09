import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export type TransactionStatusType =
  | 'Available'
  | 'MutationInProgress'
  | 'TransferredUpdated'
  | 'Restricted';

export interface TransactionStatusPanelProps {
  status: TransactionStatusType;
  compact?: boolean;
  onActionClick?: () => void;
  actionTextBn?: string;
  actionTextEn?: string;
  className?: string;
}

interface PanelContent {
  bg: string;
  border: string;
  titleColor: string;
  bodyColor: string;
  iconBoxBg: string;
  iconColor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  actionDefaultBn?: string;
  actionDefaultEn?: string;
}

const statusConfigs: Record<TransactionStatusType, PanelContent> = {
  Available: {
    bg: 'bg-brand-50',
    border: 'border-brand-200',
    titleColor: 'text-brand-900',
    bodyColor: 'text-brand-800',
    iconBoxBg: 'bg-brand-600',
    iconColor: 'text-white',
    icon: CheckCircle2,
    titleBn: 'নিবন্ধনের জন্য প্রস্তুত',
    titleEn: 'Available for Registration',
    descBn:
      'এই জমির খতিয়ান ও দাগ যাচাই সম্পন্ন হয়েছে। বর্তমান স্বত্বে কোনো বিরোধ বা মামলা নেই। নতুন দলিল নিবন্ধনের জন্য প্রস্তুত।',
    descEn:
      'This land parcel has verified records with no active encumbrances or disputes. Ready for registration.',
  },
  MutationInProgress: {
    bg: 'bg-[#fffbeb]',
    border: 'border-[#fde68a]',
    titleColor: 'text-[#78350f]',
    bodyColor: 'text-[#92400e]',
    iconBoxBg: 'bg-[#92400e]',
    iconColor: 'text-white',
    icon: AlertTriangle,
    titleBn: 'নামজারি চলমান',
    titleEn: 'Mutation in Progress',
    descBn:
      'এই দাগের ওপর বর্তমানে একটি নামজারি আবেদন প্রক্রিয়াকরণাধীন রয়েছে। নামজারি নিষ্পত্তি না হওয়া পর্যন্ত নতুন কোনো নিবন্ধন কার্যক্রম সাময়িকভাবে স্থগিত থাকবে।',
    descEn:
      'A mutation case is actively in progress. New registration is temporarily restricted until the current process is resolved.',
    actionDefaultBn: 'নামজারি মামলার অবস্থা দেখুন',
    actionDefaultEn: 'View Mutation Case Status',
  },
  TransferredUpdated: {
    bg: 'bg-brand-50',
    border: 'border-brand-200',
    titleColor: 'text-brand-900',
    bodyColor: 'text-brand-800',
    iconBoxBg: 'bg-brand-600',
    iconColor: 'text-white',
    icon: ShieldCheck,
    titleBn: 'হস্তান্তরিত ও হালনাগাদকৃত',
    titleEn: 'Transferred & Updated',
    descBn:
      'দলিল নিবন্ধন ও নামজারি সম্পন্ন হয়েছে এবং আরএস/বিএস রেকর্ডে নতুন মালিকানা অন্তর্ভুক্ত হয়েছে।',
    descEn:
      'Deed registration and mutation completed; records successfully updated in RS/BS registry.',
  },
  Restricted: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    titleColor: 'text-red-900',
    bodyColor: 'text-red-700',
    iconBoxBg: 'bg-accent-500',
    iconColor: 'text-white',
    icon: XCircle,
    titleBn: 'লেনদেন সীমাবদ্ধ',
    titleEn: 'Transaction Restricted',
    descBn:
      'আদালতের নিষেধাজ্ঞা, সরকারি অধিগ্রহণ বা বিরোধের কারণে এই জমিতে যেকোনো ধরনের দলিল নিবন্ধন সাময়িকভাবে স্থগিত রাখা হয়েছে।',
    descEn:
      'Transaction restricted due to active court injunction, government acquisition, or dispute. Registration strictly blocked.',
    actionDefaultBn: 'নিষেধাজ্ঞার বিবরণ দেখুন',
    actionDefaultEn: 'View Injunction Details',
  },
};

export function TransactionStatusPanel({
  status,
  compact = false,
  onActionClick,
  actionTextBn,
  actionTextEn,
  className = '',
}: TransactionStatusPanelProps) {
  const config = statusConfigs[status] || statusConfigs.Available;
  const Icon = config.icon;

  if (compact) {
    return (
      <div
        className={`p-3.5 rounded-xl border flex items-center gap-3 ${config.bg} ${config.border} ${className}`}
      >
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${config.iconBoxBg} ${config.iconColor}`}
        >
          <Icon size={20} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
            লেনদেনের অবস্থা · TRANSACTION STATUS
          </p>
          <p className={`text-[15px] font-bold ${config.titleColor}`}>
            {config.titleBn} <span className="font-normal opacity-75">· {config.titleEn}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Transaction Status"
      className={`p-5 md:p-6 rounded-xl border shadow-card ${config.bg} ${config.border} ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Large icon box */}
          <div
            className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${config.iconBoxBg} ${config.iconColor}`}
          >
            <Icon size={28} aria-hidden="true" />
          </div>

          <div className="space-y-1.5 flex-1">
            <span className="text-[12px] font-bold uppercase tracking-wider text-ink-muted block">
              লেনদেনের অবস্থা · TRANSACTION STATUS
            </span>
            <h1 className={`text-[22px] md:text-[26px] font-bold tracking-tight ${config.titleColor}`}>
              {config.titleBn}{' '}
              <span className="text-[18px] md:text-[20px] font-semibold opacity-85">
                · {config.titleEn}
              </span>
            </h1>
            <p className={`text-[14px] md:text-[15px] leading-relaxed ${config.bodyColor}`}>
              {config.descBn}
            </p>
            <p className="text-[13px] text-ink-muted leading-relaxed">
              {config.descEn}
            </p>
          </div>
        </div>

        {onActionClick && (
          <div className="mt-2 md:mt-0 shrink-0">
            <Button
              variant={status === 'Restricted' ? 'danger' : status === 'MutationInProgress' ? 'secondary' : 'primary'}
              onClick={onActionClick}
              rightIcon={<ArrowRight size={16} />}
            >
              {actionTextBn || config.actionDefaultBn || 'বিস্তারিত দেখুন'}
              {(actionTextEn || config.actionDefaultEn) && (
                <span className="text-[13px] opacity-80 ml-1">
                  ({actionTextEn || config.actionDefaultEn})
                </span>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
