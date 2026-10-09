import { Link, useLocation } from 'react-router';
import { ArrowLeft, Clock3 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const serviceInfo = {
  '/citizen/land-tax': {
    titleBn: 'ভূমি উন্নয়ন কর ও ই-দাখিলা',
    titleEn: 'Land Tax & E-Dakhila',
    descriptionBn: 'কর হিসাব, অনলাইন পেমেন্ট এবং দাখিলা তৈরি এই প্রোটোটাইপে এখনো চালু করা হয়নি।',
    descriptionEn:
      'Tax calculation, online payment, and Dakhila generation are not implemented in this prototype.',
  },
  '/citizen/map': {
    titleBn: 'স্মার্ট জিআইএস ভূমি ম্যাপ',
    titleEn: 'Smart GIS Parcel Map',
    descriptionBn: 'ভৌগোলিক মানচিত্র ও পার্সেল সীমানা প্রদর্শনের সুবিধা এখনো চালু করা হয়নি।',
    descriptionEn:
      'Geographic maps and parcel-boundary visualization are not implemented in this prototype.',
  },
  '/citizen/track': {
    titleBn: 'আবেদন ও লেনদেন ট্র্যাকিং',
    titleEn: 'Application & Transaction Tracking',
    descriptionBn: 'আবেদন নম্বর দিয়ে অগ্রগতি ও লেনদেনের ইতিহাস দেখার সুবিধা এখনো চালু করা হয়নি।',
    descriptionEn:
      'Tracking application progress and transaction history by reference number is not implemented yet.',
  },
} as const;

export function ServiceStatus() {
  const { pathname } = useLocation();
  const language = useAppStore((state) => state.language);
  const service = serviceInfo[pathname as keyof typeof serviceInfo];

  if (!service) return null;

  return (
    <section className="mx-auto max-w-2xl rounded-xl border border-border bg-white p-6 text-center shadow-card md:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
        <Clock3 size={26} aria-hidden="true" />
      </div>
      <p className="mt-5 text-[12px] font-bold uppercase tracking-wide text-amber-800">
        {language === 'bn' ? 'প্রোটোটাইপে সেবা চালু নেই' : 'Not available in this prototype'}
      </p>
      <h1 className="mt-2 text-[24px] font-bold text-brand-900">
        {language === 'bn' ? service.titleBn : service.titleEn}
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
        {language === 'bn' ? service.descriptionBn : service.descriptionEn}
      </p>
      <Link
        to="/citizen/services"
        className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-brand-300 px-4 py-2 text-[14px] font-semibold text-brand-800 hover:bg-brand-50"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        {language === 'bn' ? 'সেবাসমূহে ফিরে যান' : 'Back to services'}
      </Link>
    </section>
  );
}
