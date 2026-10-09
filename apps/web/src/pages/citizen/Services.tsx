import { Link } from 'react-router';
import {
  FileText,
  CreditCard,
  Search,
  MapPin,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent } from '../../components/Card';
import { TransactionStatusPanel } from '../../components/TransactionStatusPanel';
import { useTranslation } from 'react-i18next';

export function Services() {
  const { t } = useTranslation();

  const citizenServices = [
    {
      to: '/citizen/land-records',
      icon: Search,
      titleBn: 'জমির রেকর্ড ও খতিয়ান অনুসন্ধান',
      titleEn: 'Land Record & Khatian Search',
      descBn: 'অনলাইনে মৌজা, দাগ ও খতিয়ান নম্বর দিয়ে জমির সর্বশেষ মালিকানা রেকর্ড অনুসন্ধান করুন।',
      descEn: 'Search verified land ownership records by Mouza, Dag, and Khatian.',
      badge: 'তাত্ক্ষণিক যাচাই',
    },
    {
      to: '/citizen/land-records',
      icon: CreditCard,
      titleBn: 'ভূমি উন্নয়ন কর ও ই-দাখিলা',
      titleEn: 'Land Tax Payment & E-Dakhila',
      descBn: 'বকেয়া ও চলতি বছরের ভূমি উন্নয়ন কর হিসাব করুন, পরিশোধ করুন এবং ডিজিটাল দাখিলা সংগ্রহ করুন।',
      descEn: 'Calculate and pay land development taxes, and download official digital Dakhila.',
      badge: 'অনলাইন পেমেন্ট',
    },
    {
      to: '/citizen/map',
      icon: MapPin,
      titleBn: 'স্মার্ট জিআইএস ভূমি ম্যাপ',
      titleEn: 'Smart GIS Parcel Map',
      descBn: 'ইন্টারেক্টিভ ডিজিটাল ম্যাপে দাগ চিহ্নিতকরণ ও ভূমির অবস্থান ও ব্যবহারের ধরন পর্যবেক্ষণ করুন।',
      descEn: 'Interactive map displaying verified plot boundaries and public infrastructure.',
      badge: 'স্মার্ট ম্যাপ',
    },
    {
      to: '/citizen/notices',
      icon: FileText,
      titleBn: 'গণবিজ্ঞপ্তি ও সরকারি আদেশ',
      titleEn: 'Public Notices & Circulars',
      descBn: 'ভূমি মন্ত্রণালয় ও স্থানীয় সহকারী কমিশনার (ভূমি) কার্যালয়ের সর্বশেষ আদেশ ও নোটিশসমূহ।',
      descEn: 'Official circulars, notifications, and public orders regarding land records.',
      badge: 'হালনাগাদ তথ্য',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Prominent Transaction Status Banner */}
      <TransactionStatusPanel
        status="Available"
        actionTextBn="নমুনা রেকর্ড যাচাই করুন"
        actionTextEn="Verify Sample Record"
        onActionClick={() => {}}
      />

      {/* Services Grid */}
      <div>
        <div className="mb-6">
          <h2 className="text-[22px] md:text-[24px] font-bold text-ink">
            {t('nav.services')} <span className="text-[14px] text-ink-muted font-normal">· Citizen Services</span>
          </h2>
          <p className="text-[14px] text-ink-soft mt-1">
            ডিজিটাল সেবা সমূহের তালিকা থেকে আপনার কাঙ্ক্ষিত সেবাটি নির্বাচন করুন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {citizenServices.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <Link key={idx} to={svc.to} className="group block text-decoration-none">
                <Card className="h-full hover:border-brand-400 hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        <Icon size={24} aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
                        {svc.badge}
                      </span>
                    </div>

                    <div className="mt-4 space-y-1">
                      <h3 className="text-[18px] font-bold text-ink group-hover:text-brand-700 transition-colors">
                        {svc.titleBn}
                      </h3>
                      <p className="text-[13px] text-ink-muted">
                        {svc.titleEn}
                      </p>
                      <p className="text-[14px] text-ink-soft leading-relaxed pt-2">
                        {svc.descBn}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#eaf0ec] flex items-center text-[13px] font-semibold text-brand-700 group-hover:text-brand-800">
                      <span>সেবা গ্রহণ করুন</span>
                      <ArrowRight size={15} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Fraud Prevention & Security Trust Notice */}
      <div className="p-5 rounded-xl border border-brand-200 bg-brand-50/50 flex items-start gap-4">
        <ShieldCheck size={28} className="text-brand-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1 text-[14px]">
          <h4 className="font-semibold text-brand-900">
            নিরাপদ লেনদেন ও জালিয়াতি প্রতিরোধ ব্যবস্থা
          </h4>
          <p className="text-brand-800 leading-relaxed text-[13px]">
            ভূমিলিংক পোর্টালে প্রতিটি জমির দাগের সাথে নামজারি ও মামলা সংক্রান্ত তথ্য তাৎক্ষণিকভাবে সমন্বয় করা হয়। নামজারি চলমান অথবা আইনি বিধিনিষেধ থাকা জমিতে যেকোনো প্রকার নতুন নিবন্ধন স্বয়ংক্রিয়ভাবে স্থগিত থাকে।
          </p>
        </div>
      </div>
    </div>
  );
}
