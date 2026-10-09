import { useState, type FormEvent } from 'react';
import { AlertCircle, RefreshCw, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/Card';
import { FormField, Input } from '../../components/FormField';
import { StatusBadge } from '../../components/StatusBadge';
import { api } from '../../lib/api';
import { useAppStore } from '../../store/useAppStore';

type TransactionStatus =
  | 'Available'
  | 'MutationInProgress'
  | 'TransferredUpdated'
  | 'Restricted';

interface Parcel {
  _id: string;
  mouza: string;
  dag: string;
  khatian: string;
  area_decimal: number;
  transaction_status: TransactionStatus;
  current_owner_name_bn: string;
  current_owner_name_en: string;
  district: string;
  upazila: string;
  land_class?: string;
}

interface ParcelResponse {
  success: boolean;
  data: Parcel[];
}

export function LandRecords() {
  const language = useAppStore((state) => state.language);
  const [mouza, setMouza] = useState('');
  const [dag, setDag] = useState('');
  const [khatian, setKhatian] = useState('');
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const searchParcels = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const query = {
      mouza: mouza.trim() || undefined,
      dag: dag.trim() || undefined,
      khatian: khatian.trim() || undefined,
    };

    if (!query.mouza && !query.dag && !query.khatian) {
      setValidationError(
        language === 'bn'
          ? 'অনুসন্ধানের জন্য অন্তত একটি মৌজা, দাগ বা খতিয়ান নম্বর লিখুন।'
          : 'Enter at least one Mouza, Dag, or Khatian value to search.'
      );
      return;
    }

    setValidationError(null);
    setError(null);
    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await api.get<ParcelResponse>('/parcels', { params: query });
      setParcels(response.data);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : language === 'bn'
            ? 'রেকর্ড লোড করা যায়নি। আবার চেষ্টা করুন।'
            : 'Records could not be loaded. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const labels =
    language === 'bn'
      ? {
          title: 'জমির রেকর্ড অনুসন্ধান',
          subtitle: 'মৌজা, দাগ অথবা খতিয়ান নম্বর দিয়ে নমুনা রেকর্ড খুঁজুন।',
          mouza: 'মৌজা',
          dag: 'দাগ নম্বর',
          khatian: 'খতিয়ান নম্বর',
          search: 'রেকর্ড খুঁজুন',
          searching: 'খোঁজা হচ্ছে...',
          records: 'অনুসন্ধানের ফলাফল',
          noResults: 'কোনো রেকর্ড পাওয়া যায়নি। তথ্য যাচাই করে আবার চেষ্টা করুন।',
          prompt: 'মৌজা, দাগ বা খতিয়ান নম্বর দিয়ে অনুসন্ধান করুন।',
          area: 'জমির পরিমাণ',
          owner: 'বর্তমান মালিক (নমুনা রেকর্ড)',
          location: 'অবস্থান',
          landClass: 'জমির শ্রেণি',
          disclaimer:
            'এটি ডেমো ডেটা; সরকারি বা আইনগত মালিকানা-প্রমাণ নয়। কোনো লেনদেনের আগে সংশ্লিষ্ট ভূমি অফিসে তথ্য যাচাই করুন।',
        }
      : {
          title: 'Land Record Search',
          subtitle: 'Find sample records by Mouza, Dag, or Khatian number.',
          mouza: 'Mouza',
          dag: 'Dag number',
          khatian: 'Khatian number',
          search: 'Search records',
          searching: 'Searching...',
          records: 'Search results',
          noResults: 'No records found. Check the details and try again.',
          prompt: 'Search by Mouza, Dag, or Khatian number.',
          area: 'Parcel area',
          owner: 'Current owner (sample record)',
          location: 'Location',
          landClass: 'Land class',
          disclaimer:
            'This is demo data, not proof of government or legal ownership. Verify records with the relevant land office before any transaction.',
        };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-[24px] md:text-[28px] font-bold text-brand-900">{labels.title}</h1>
        <p className="mt-1 text-[14px] text-ink-muted">{labels.subtitle}</p>
      </header>

      <div
        role="note"
        className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-[14px] leading-relaxed text-amber-900"
      >
        {labels.disclaimer}
      </div>

      <Card>
        <CardHeader>
          <CardTitle titleBn={labels.title} titleEn="Search land parcels" />
        </CardHeader>
        <CardContent>
          <form onSubmit={searchParcels} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField labelBn={labels.mouza}>
                {(props) => (
                  <Input
                    {...props}
                    value={mouza}
                    onChange={(event) => setMouza(event.target.value)}
                    autoComplete="off"
                  />
                )}
              </FormField>
              <FormField labelBn={labels.dag}>
                {(props) => (
                  <Input
                    {...props}
                    value={dag}
                    onChange={(event) => setDag(event.target.value)}
                    autoComplete="off"
                  />
                )}
              </FormField>
              <FormField labelBn={labels.khatian}>
                {(props) => (
                  <Input
                    {...props}
                    value={khatian}
                    onChange={(event) => setKhatian(event.target.value)}
                    autoComplete="off"
                  />
                )}
              </FormField>
            </div>

            {validationError && (
              <p role="alert" className="text-[13px] text-accent-600">
                {validationError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-brand-700 px-4 py-2 text-[14px] font-semibold text-white hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <RefreshCw size={17} className="animate-spin" aria-hidden="true" />
              ) : (
                <Search size={17} aria-hidden="true" />
              )}
              {isLoading ? labels.searching : labels.search}
            </button>
          </form>
        </CardContent>
      </Card>

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
            onClick={() => void searchParcels()}
            disabled={isLoading}
            className="font-semibold underline disabled:opacity-60"
          >
            {labels.search}
          </button>
        </div>
      )}

      <section aria-live="polite" aria-busy={isLoading} className="space-y-4">
        <h2 className="text-[20px] font-bold text-ink">{labels.records}</h2>
        {!hasSearched ? (
          <p className="rounded-xl border border-border bg-white p-5 text-[14px] text-ink-muted">
            {labels.prompt}
          </p>
        ) : !isLoading && !error && parcels.length === 0 ? (
          <p className="rounded-xl border border-border bg-white p-5 text-[14px] text-ink-muted">
            {labels.noResults}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {parcels.map((parcel) => (
              <Card key={parcel._id}>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[17px] font-bold text-ink">
                        {labels.mouza}: {parcel.mouza}
                      </h3>
                      <p className="mt-1 text-[13px] text-ink-muted">
                        {labels.dag}: {parcel.dag} · {labels.khatian}: {parcel.khatian}
                      </p>
                    </div>
                    <StatusBadge status={parcel.transaction_status} size="sm" />
                  </div>
                  <dl className="grid grid-cols-1 gap-3 border-t border-border pt-4 text-[14px] sm:grid-cols-2">
                    <div>
                      <dt className="text-[12px] text-ink-muted">{labels.owner}</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {language === 'bn'
                          ? parcel.current_owner_name_bn
                          : parcel.current_owner_name_en || parcel.current_owner_name_bn}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[12px] text-ink-muted">{labels.area}</dt>
                      <dd className="mt-0.5 font-semibold text-ink">
                        {parcel.area_decimal} {language === 'bn' ? 'শতাংশ' : 'decimal'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[12px] text-ink-muted">{labels.location}</dt>
                      <dd className="mt-0.5 text-ink">
                        {parcel.upazila}, {parcel.district}
                      </dd>
                    </div>
                    {parcel.land_class && (
                      <div>
                        <dt className="text-[12px] text-ink-muted">{labels.landClass}</dt>
                        <dd className="mt-0.5 text-ink">{parcel.land_class}</dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
