import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  FileText,
  CreditCard,
  Search,
  MapPin,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Activity,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';
import { StatusBadge } from '../../components/StatusBadge';
import { useTranslation } from 'react-i18next';
import { api } from '../../lib/api';

interface NoticeItem {
  _id: string;
  title_bn: string;
  title_en: string;
  body_bn: string;
  category?: string;
  published_at?: string;
}

interface ParcelItem {
  _id: string;
  mouza: string;
  dag: string;
  khatian: string;
  area_decimal: number;
  transaction_status: 'Available' | 'MutationInProgress' | 'TransferredUpdated' | 'Restricted';
  current_owner_name_bn: string;
}

interface ApiHealthResponse {
  status: string;
  database: string;
  service: string;
}

export function Services() {
  const { t } = useTranslation();

  // Live state from API
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [parcels, setParcels] = useState<ParcelItem[]>([]);
  const [health, setHealth] = useState<ApiHealthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Fetch health
      const healthRes = await api.get<ApiHealthResponse>('/health').catch(() => null);
      if (healthRes) setHealth(healthRes);

      // 2. Fetch notices & parcels in parallel
      const [noticesRes, parcelsRes] = await Promise.all([
        api.get<{ success: boolean; data: NoticeItem[] }>('/notices').catch(() => null),
        api.get<{ success: boolean; data: ParcelItem[] }>('/parcels').catch(() => null),
      ]);

      if (noticesRes?.data) {
        setNotices(noticesRes.data);
      }
      if (parcelsRes?.data) {
        setParcels(parcelsRes.data);
      }
    } catch (err: any) {
      console.error('[Services] Failed to fetch data from API:', err);
      setError('সার্ভার থেকে তথ্য লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const citizenServices = [
    {
      to: '/citizen/land-records',
      icon: Search,
      titleBn: 'জমির রেকর্ড ও খতিয়ান অনুসন্ধান',
      titleEn: 'Land Record & Khatian Search',
      descBn: 'ডেমো ডেটায় মৌজা, দাগ ও খতিয়ান নম্বর দিয়ে নমুনা রেকর্ড অনুসন্ধান করুন।',
      descEn: 'Search sample records by Mouza, Dag, and Khatian in demo data.',
      badge: 'নমুনা রেকর্ড',
    },
    {
      to: '/citizen/land-tax',
      icon: CreditCard,
      titleBn: 'ভূমি উন্নয়ন কর ও ই-দাখিলা',
      titleEn: 'Land Tax Payment & E-Dakhila',
      descBn: 'কর হিসাব, পেমেন্ট ও দাখিলা এই প্রোটোটাইপে এখনো চালু করা হয়নি।',
      descEn: 'Tax calculation, payment, and Dakhila generation are not available in this prototype.',
      badge: 'পরিকল্পনাধীন',
    },
    {
      to: '/citizen/map',
      icon: MapPin,
      titleBn: 'স্মার্ট জিআইএস ভূমি ম্যাপ',
      titleEn: 'Smart GIS Parcel Map',
      descBn: 'ইন্টারেক্টিভ ম্যাপ ও পার্সেল সীমানা এই প্রোটোটাইপে এখনো চালু করা হয়নি।',
      descEn: 'Interactive maps and parcel boundaries are not available in this prototype.',
      badge: 'পরিকল্পনাধীন',
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

      {/* API Health & Live Connectivity Indicator */}
      <div className="flex items-center justify-between p-3.5 rounded-xl border border-brand-200 bg-white shadow-card flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <Activity size={18} className="text-brand-600 shrink-0" aria-hidden="true" />
          <span className="text-[13px] font-semibold text-ink">
            সিস্টেম স্ট্যাটাস ও ডাটাবেস সংযোগ · API Health:
          </span>
          {health ? (
            <span
              className={`inline-flex items-center text-[12px] font-semibold px-2.5 py-0.5 rounded-full border ${
                health.database === 'connected'
                  ? 'bg-brand-50 text-brand-800 border-brand-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              {health.database === 'connected'
                ? 'অনলাইন ও সংযুক্ত (Atlas Connected)'
                : 'ডাটাবেস বিচ্ছিন্ন (Degraded)'}
            </span>
          ) : (
            <span className="text-[12px] text-ink-muted">পরীক্ষা করা হচ্ছে...</span>
          )}
        </div>
        <button
          type="button"
          onClick={fetchData}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-700 hover:text-brand-800 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
          <span>রিফ্রেশ করুন</span>
        </button>
      </div>

      {/* Services Grid */}
      <div>
        <div className="mb-6">
          <h2 className="text-[22px] md:text-[24px] font-bold text-ink">
            {t('nav.services')}{' '}
            <span className="text-[14px] text-ink-muted font-normal">· Citizen Services</span>
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
                      <p className="text-[13px] text-ink-muted">{svc.titleEn}</p>
                      <p className="text-[14px] text-ink-soft leading-relaxed pt-2">{svc.descBn}</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#eaf0ec] flex items-center text-[13px] font-semibold text-brand-700 group-hover:text-brand-800">
                      <span>সেবা গ্রহণ করুন</span>
                      <ArrowRight
                        size={15}
                        className="ml-1.5 transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Live Data Section 1: Recent Public Notices */}
      <Card>
        <CardHeader
          action={
            <Link
              to="/citizen/notices"
              className="text-[13px] font-semibold text-brand-700 hover:text-brand-800 inline-flex items-center gap-1"
            >
              <span>সকল বিজ্ঞপ্তি দেখুন</span>
              <ArrowRight size={14} />
            </Link>
          }
        >
          <CardTitle
            titleBn="সর্বশেষ সরকারি নোটিশ ও আদেশ"
            titleEn="Recent Public Notices"
            badge={
              notices.length > 0 ? (
                <span className="text-[12px] font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
                  {notices.length}টি বিজ্ঞপ্তি
                </span>
              ) : undefined
            }
          />
        </CardHeader>
        <CardContent>
          {isLoading && notices.length === 0 ? (
            <div className="py-6 flex items-center justify-center gap-2 text-ink-muted text-[14px]">
              <RefreshCw size={16} className="animate-spin text-brand-600" />
              <span>ডাটাবেস থেকে নোটিশ লোড হচ্ছে...</span>
            </div>
          ) : error && notices.length === 0 ? (
            <div
              role="alert"
              className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 flex items-center justify-between gap-3 text-[14px]"
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={18} className="shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
              <button
                type="button"
                onClick={fetchData}
                className="px-3 py-1 bg-white rounded-lg border border-red-200 text-[13px] font-semibold text-red-800 hover:bg-surface-sunken"
              >
                পুনরায় চেষ্টা করুন
              </button>
            </div>
          ) : notices.length === 0 ? (
            <p className="text-[14px] text-ink-muted text-center py-6">
              বর্তমানে কোনো নতুন গণবিজ্ঞপ্তি নেই।
            </p>
          ) : (
            <div className="divide-y divide-[#eaf0ec]">
              {notices.map((notice) => (
                <div key={notice._id} className="py-3.5 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h4 className="text-[15px] font-semibold text-ink hover:text-brand-700 transition-colors">
                      {notice.title_bn}
                    </h4>
                    {notice.category && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-surface-subtle text-ink-muted border border-border">
                        {notice.category}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-ink-soft leading-relaxed line-clamp-2">
                    {notice.body_bn}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Data Section 2: Verified Land Parcels Sample */}
      <Card>
        <CardHeader>
          <CardTitle
            titleBn="নিবন্ধিত নমুনা খতিয়ান ও দাগসমূহ"
            titleEn="Verified Land Registry Records"
            badge={<StatusBadge status="Verified" size="sm" />}
          />
        </CardHeader>
        <CardContent>
          {isLoading && parcels.length === 0 ? (
            <div className="py-6 flex items-center justify-center gap-2 text-ink-muted text-[14px]">
              <RefreshCw size={16} className="animate-spin text-brand-600" />
              <span>রেকর্ড লোড হচ্ছে...</span>
            </div>
          ) : parcels.length === 0 ? (
            <p className="text-[14px] text-ink-muted text-center py-6">
              কোনো খতিয়ান রেকর্ড পাওয়া যায়নি।
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {parcels.slice(0, 4).map((parcel) => (
                <div
                  key={parcel._id}
                  className="p-3.5 rounded-xl border border-border bg-surface-subtle space-y-2 hover:border-brand-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold text-ink-muted">
                      মৌজা: {parcel.mouza}
                    </span>
                    <StatusBadge status={parcel.transaction_status} size="sm" />
                  </div>
                  <div className="text-[14px] font-bold text-ink">
                    দাগ: {parcel.dag} · খতিয়ান: {parcel.khatian}
                  </div>
                  <div className="text-[12px] text-ink-soft">
                    মালিক: {parcel.current_owner_name_bn} ({parcel.area_decimal} শতাংশ)
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fraud Prevention & Security Trust Notice */}
      <div className="p-5 rounded-xl border border-brand-200 bg-brand-50/50 flex items-start gap-4">
        <ShieldCheck size={28} className="text-brand-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1 text-[14px]">
          <h4 className="font-semibold text-brand-900">
            নিরাপদ লেনদেন ও জালিয়াতি প্রতিরোধ ব্যবস্থা
          </h4>
          <p className="text-brand-800 leading-relaxed text-[13px]">
            ভূমিলিংক পোর্টালে প্রতিটি জমির দাগের সাথে নামজারি ও মামলা সংক্রান্ত তথ্য তাৎক্ষণিকভাবে
            সমন্বয় করা হয়। নামজারি চলমান অথবা আইনি বিধিনিষেধ থাকা জমিতে যেকোনো প্রকার নতুন
            নিবন্ধন স্বয়ংক্রিয়ভাবে স্থগিত থাকে।
          </p>
        </div>
      </div>
    </div>
  );
}
