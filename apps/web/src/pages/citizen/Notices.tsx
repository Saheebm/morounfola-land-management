import { useEffect, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '../../components/Card';
import { api } from '../../lib/api';
import { useAppStore } from '../../store/useAppStore';

interface Notice {
  _id: string;
  title_bn: string;
  title_en?: string;
  body_bn: string;
  body_en?: string;
  category?: string;
  published_at?: string;
}

interface NoticeResponse {
  success: boolean;
  data: Notice[];
}

function formatDate(value: string | undefined, language: 'bn' | 'en'): string {
  if (!value) return language === 'bn' ? 'তারিখ উল্লেখ নেই' : 'Date not provided';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return language === 'bn' ? 'তারিখ উল্লেখ নেই' : 'Date not provided';
  }

  return new Intl.DateTimeFormat(language === 'bn' ? 'bn-BD' : 'en-GB', {
    dateStyle: 'medium',
  }).format(date);
}

export function Notices() {
  const language = useAppStore((state) => state.language);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNotices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get<NoticeResponse>('/notices');
      setNotices(response.data);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : language === 'bn'
            ? 'বিজ্ঞপ্তি লোড করা যায়নি। আবার চেষ্টা করুন।'
            : 'Notices could not be loaded. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadNotices();
  }, []);

  const labels =
    language === 'bn'
      ? {
          title: 'সরকারি বিজ্ঞপ্তি',
          subtitle: 'সাম্প্রতিক প্রকাশিত গণবিজ্ঞপ্তি ও আদেশসমূহ।',
          loading: 'বিজ্ঞপ্তি লোড হচ্ছে...',
          empty: 'বর্তমানে কোনো প্রকাশিত বিজ্ঞপ্তি নেই।',
          retry: 'আবার চেষ্টা করুন',
          demo: 'ডেমো বিজ্ঞপ্তি',
        }
      : {
          title: 'Public Notices',
          subtitle: 'Recently published public notices and orders.',
          loading: 'Loading notices...',
          empty: 'There are no published notices at this time.',
          retry: 'Try again',
          demo: 'Demo notice',
        };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-[24px] md:text-[28px] font-bold text-brand-900">{labels.title}</h1>
        <p className="mt-1 text-[14px] text-ink-muted">{labels.subtitle}</p>
      </header>

      <p role="note" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-[14px] text-amber-900">
        {labels.demo}
      </p>

      {error && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-[14px] text-red-800"
        >
          <span className="inline-flex items-center gap-2">
            <AlertCircle size={18} aria-hidden="true" />
            {error}
          </span>
          <button
            type="button"
            onClick={() => void loadNotices()}
            disabled={isLoading}
            className="font-semibold underline disabled:opacity-60"
          >
            {labels.retry}
          </button>
        </div>
      )}

      {isLoading ? (
        <div
          role="status"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white p-8 text-[14px] text-ink-muted"
        >
          <RefreshCw size={17} className="animate-spin text-brand-600" aria-hidden="true" />
          {labels.loading}
        </div>
      ) : !error && notices.length === 0 ? (
        <p className="rounded-xl border border-border bg-white p-6 text-center text-[14px] text-ink-muted">
          {labels.empty}
        </p>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <Card key={notice._id}>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="text-[17px] font-bold text-ink">
                    {language === 'bn' ? notice.title_bn : notice.title_en || notice.title_bn}
                  </h2>
                  <time className="text-[12px] text-ink-muted">
                    {formatDate(notice.published_at, language)}
                  </time>
                </div>
                {notice.category && (
                  <span className="inline-flex rounded-md border border-brand-200 bg-brand-50 px-2 py-1 text-[12px] font-semibold text-brand-800">
                    {notice.category}
                  </span>
                )}
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-ink-soft">
                  {language === 'bn' ? notice.body_bn : notice.body_en || notice.body_bn}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
