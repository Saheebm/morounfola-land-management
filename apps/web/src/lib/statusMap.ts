import React from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Clock,
  Send,
  Inbox,
  AlertTriangle,
  XCircle,
  AlertCircle,
  Loader,
  Eye,
  ClipboardCheck,
  FileText,
} from 'lucide-react';

export type StatusKey =
  | 'Approved'
  | 'Completed'
  | 'Resolved'
  | 'Verified'
  | 'Paid'
  | 'Match'
  | 'Submitted'
  | 'Received'
  | 'Pending'
  | 'PaymentPending'
  | 'DueSoon'
  | 'Mismatch'
  | 'MutationInProgress'
  | 'Rejected'
  | 'Failed'
  | 'Restricted'
  | 'InReview'
  | 'InProgress'
  | 'Assigned'
  | 'UnderVerification'
  | 'Draft'
  | 'Cancelled'
  | 'Available'
  | 'TransferredUpdated';

export interface StatusConfig {
  bg: string;
  text: string;
  border: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  labelBn: string;
  labelEn: string;
}

export const statusMap: Record<StatusKey, StatusConfig> = {
  // Success Category (brand-50, brand-800, brand-200)
  Approved: {
    bg: 'bg-brand-50',
    text: 'text-brand-800',
    border: 'border-brand-200',
    icon: CheckCircle2,
    labelBn: 'অনুমোদিত',
    labelEn: 'Approved',
  },
  Completed: {
    bg: 'bg-brand-50',
    text: 'text-brand-800',
    border: 'border-brand-200',
    icon: CheckCircle2,
    labelBn: 'সম্পন্ন',
    labelEn: 'Completed',
  },
  Resolved: {
    bg: 'bg-brand-50',
    text: 'text-brand-800',
    border: 'border-brand-200',
    icon: CheckCircle2,
    labelBn: 'নিষ্পত্তিকৃত',
    labelEn: 'Resolved',
  },
  Verified: {
    bg: 'bg-brand-50',
    text: 'text-brand-800',
    border: 'border-brand-200',
    icon: ShieldCheck,
    labelBn: 'যাচাইকৃত',
    labelEn: 'Verified',
  },
  Paid: {
    bg: 'bg-brand-50',
    text: 'text-brand-800',
    border: 'border-brand-200',
    icon: CheckCircle2,
    labelBn: 'পরিশোধিত',
    labelEn: 'Paid',
  },
  Match: {
    bg: 'bg-brand-50',
    text: 'text-brand-800',
    border: 'border-brand-200',
    icon: CheckCircle2,
    labelBn: 'মিলেছে',
    labelEn: 'Match',
  },
  Available: {
    bg: 'bg-brand-50',
    text: 'text-brand-800',
    border: 'border-brand-200',
    icon: CheckCircle2,
    labelBn: 'নিবন্ধনের জন্য প্রস্তুত',
    labelEn: 'Available',
  },
  TransferredUpdated: {
    bg: 'bg-brand-50',
    text: 'text-brand-800',
    border: 'border-brand-200',
    icon: ShieldCheck,
    labelBn: 'হস্তান্তরিত ও হালনাগাদকৃত',
    labelEn: 'Transferred & Updated',
  },

  // Submitted / Pending Category (sky-50, sky-800, sky-200)
  Submitted: {
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200',
    icon: Send,
    labelBn: 'দাখিলকৃত',
    labelEn: 'Submitted',
  },
  Received: {
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200',
    icon: Inbox,
    labelBn: 'গৃহীত',
    labelEn: 'Received',
  },
  Pending: {
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200',
    icon: Clock,
    labelBn: 'অপেক্ষমাণ',
    labelEn: 'Pending',
  },

  // Warning / Action Category (amber-50, amber-800, amber-200)
  PaymentPending: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: AlertTriangle,
    labelBn: 'পেমেন্ট বকেয়া',
    labelEn: 'Payment Pending',
  },
  DueSoon: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: AlertTriangle,
    labelBn: 'মেয়াদ শীঘ্রই শেষ',
    labelEn: 'Due Soon',
  },
  Mismatch: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: AlertTriangle,
    labelBn: 'অমিল',
    labelEn: 'Mismatch',
  },
  MutationInProgress: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    icon: AlertTriangle,
    labelBn: 'নামজারি চলমান',
    labelEn: 'Mutation in Progress',
  },

  // Rejected / Critical Category (red-50, red-700, red-200)
  Rejected: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: XCircle,
    labelBn: 'প্রত্যাখ্যাত',
    labelEn: 'Rejected',
  },
  Failed: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: AlertCircle,
    labelBn: 'ব্যর্থ',
    labelEn: 'Failed',
  },
  Restricted: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: XCircle,
    labelBn: 'লেনদেন সীমাবদ্ধ',
    labelEn: 'Restricted',
  },

  // Processing Category (violet-50, violet-800, violet-200)
  Assigned: {
    bg: 'bg-violet-50',
    text: 'text-violet-800',
    border: 'border-violet-200',
    icon: Eye,
    labelBn: 'অর্পিত',
    labelEn: 'Assigned',
  },
  InReview: {
    bg: 'bg-violet-50',
    text: 'text-violet-800',
    border: 'border-violet-200',
    icon: ClipboardCheck,
    labelBn: 'পর্যালোচনাধীন',
    labelEn: 'In Review',
  },
  InProgress: {
    bg: 'bg-violet-50',
    text: 'text-violet-800',
    border: 'border-violet-200',
    icon: Loader,
    labelBn: 'চলমান',
    labelEn: 'In Progress',
  },
  UnderVerification: {
    bg: 'bg-violet-50',
    text: 'text-violet-800',
    border: 'border-violet-200',
    icon: ClipboardCheck,
    labelBn: 'যাচাই প্রক্রিয়াধীন',
    labelEn: 'Under Verification',
  },

  // Inactive Category (gray-100, gray-700, gray-200)
  Draft: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: FileText,
    labelBn: 'খসড়া',
    labelEn: 'Draft',
  },
  Cancelled: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    icon: FileText,
    labelBn: 'বাতিলকৃত',
    labelEn: 'Cancelled',
  },
};
