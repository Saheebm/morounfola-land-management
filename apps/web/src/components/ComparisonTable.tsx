import { AlertTriangle } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { toBengaliNumerals } from '../lib/formatCurrency';
import { useAppStore } from '../store/useAppStore';

export interface ComparisonItem {
  fieldBn: string;
  fieldEn?: string;
  deedValue: string | number;
  csrsValue: string | number;
  isMatch?: boolean; // if undefined, auto-computes deedValue === csrsValue
  notesBn?: string;
}

export interface ComparisonTableProps {
  items: ComparisonItem[];
  titleBn?: string;
  titleEn?: string;
  className?: string;
}

export function ComparisonTable({
  items,
  titleBn = 'দলিল ও CS/RS রেকর্ড যাচাই ও তুলনা',
  titleEn = 'Deed vs CS/RS Comparison',
  className = '',
}: ComparisonTableProps) {
  const language = useAppStore((state) => state.language);

  // Compute matches and mismatches
  const processedItems = items.map((item) => {
    const isMatch =
      item.isMatch !== undefined
        ? item.isMatch
        : String(item.deedValue).trim() === String(item.csrsValue).trim();
    return { ...item, isMatch };
  });

  const mismatchCount = processedItems.filter((i) => !i.isMatch).length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Discrepancy Summary Banner if any mismatch exists */}
      {mismatchCount > 0 ? (
        <div
          role="alert"
          className="p-4 rounded-xl border border-amber-200 bg-[#fffbeb] text-[#78350f] flex items-start gap-3"
        >
          <AlertTriangle size={20} className="shrink-0 text-amber-600 mt-0.5" aria-hidden="true" />
          <div className="text-[14px]">
            <p className="font-semibold">
              সতর্কতা: {toBengaliNumerals(mismatchCount)}টি তথ্যের অমিল পাওয়া গেছে!
              <span className="text-[13px] font-normal ml-1.5 opacity-85">
                (Warning: {mismatchCount} discrepancy found in comparison)
              </span>
            </p>
            <p className="mt-0.5 text-[13px] text-[#92400e]">
              অনুগ্রহ করে দলিল ও পূর্বতন খতিয়ানের অমিলযুক্ত ক্ষেত্রগুলো পুঙ্খানুপুঙ্খভাবে যাচাই করুন।
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl border border-brand-200 bg-brand-50 text-brand-900 flex items-center gap-2.5 text-[14px]">
          <span className="font-semibold text-brand-700">✓ সকল তথ্য মিলেছে</span>
          <span className="text-[13px] text-ink-muted">· All comparison fields match verified records</span>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-[#e5e7eb] bg-white shadow-card">
        <div className="px-5 py-3.5 bg-surface-subtle border-b border-[#eaf0ec] flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-ink">
            {titleBn} <span className="text-[13px] text-ink-muted font-normal">· {titleEn}</span>
          </h3>
          <span className="text-[13px] text-ink-muted font-medium">
            {language === 'bn'
              ? `মোট ক্ষেত্র: ${toBengaliNumerals(items.length)}`
              : `Total Fields: ${items.length}`}
          </span>
        </div>

        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="bg-surface-subtle/60 border-b border-[#eaf0ec] text-[13px] font-semibold text-ink-muted">
              <th scope="col" className="px-4 py-3">
                বিবরণ / ক্ষেত্র · Field
              </th>
              <th scope="col" className="px-4 py-3">
                নিবন্ধিত দলিল · Registered Deed
              </th>
              <th scope="col" className="px-4 py-3">
                CS/RS রেকর্ড · CS/RS Record
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                ফলাফল · Result
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaf0ec] text-[14px]">
            {processedItems.map((item, idx) => (
              <tr
                key={idx}
                className={
                  item.isMatch
                    ? 'hover:bg-brand-50/30 transition-colors'
                    : 'bg-[#fffbeb]/70 hover:bg-[#fffbeb] transition-colors'
                }
              >
                <td className="px-4 py-3.5 font-medium text-ink">
                  <div>{item.fieldBn}</div>
                  {item.fieldEn && (
                    <div className="text-[12px] text-ink-muted">{item.fieldEn}</div>
                  )}
                </td>
                <td className={`px-4 py-3.5 ${!item.isMatch ? 'font-bold text-amber-900' : 'text-ink'}`}>
                  {item.deedValue}
                </td>
                <td className={`px-4 py-3.5 ${!item.isMatch ? 'font-bold text-amber-900' : 'text-ink-soft'}`}>
                  {item.csrsValue}
                </td>
                <td className="px-4 py-3.5 text-right">
                  {item.isMatch ? (
                    <StatusBadge status="Match" size="sm" />
                  ) : (
                    <StatusBadge status="Mismatch" size="sm" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
