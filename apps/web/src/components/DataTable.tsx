import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { toBengaliNumerals } from '../lib/formatCurrency';
import { useAppStore } from '../store/useAppStore';

export interface Column<T> {
  key: string;
  headerBn: string;
  headerEn?: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholderBn?: string;
  searchPlaceholderEn?: string;
  searchKeys?: (keyof T)[];
  pageSize?: number;
  emptyMessageBn?: string;
  emptyMessageEn?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchPlaceholderBn = 'অনুসন্ধান করুন...',
  searchPlaceholderEn = 'Search...',
  searchKeys,
  pageSize = 10,
  emptyMessageBn = 'কোনো তথ্য পাওয়া যায়নি',
  emptyMessageEn = 'No data available',
  className = '',
}: DataTableProps<T>) {
  const language = useAppStore((state) => state.language);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();

    return data.filter((item) => {
      if (searchKeys && searchKeys.length > 0) {
        return searchKeys.some((k) => String(item[k] ?? '').toLowerCase().includes(term));
      }
      return Object.values(item).some((val) => String(val ?? '').toLowerCase().includes(term));
    });
  }, [data, searchTerm, searchKeys]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        if (current.direction === 'asc') return { key, direction: 'desc' };
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  const pageDisplay =
    language === 'bn'
      ? `পৃষ্ঠা ${toBengaliNumerals(currentPage)} এর ${toBengaliNumerals(totalPages)}`
      : `Page ${currentPage} of ${totalPages}`;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Search Header */}
      {searchKeys && searchKeys.length > 0 && (
        <div className="flex items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <label htmlFor="datatable-search" className="sr-only">
              {language === 'bn' ? searchPlaceholderBn : searchPlaceholderEn}
            </label>
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
              aria-hidden="true"
            />
            <input
              id="datatable-search"
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={language === 'bn' ? searchPlaceholderBn : searchPlaceholderEn}
              className="w-full pl-9 pr-4 py-2 text-[14px] bg-white border border-[#d1d5db] rounded-lg outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/30"
            />
          </div>
        </div>
      )}

      {/* Table Box */}
      <div className="overflow-x-auto rounded-xl border border-[#e5e7eb] bg-white">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-surface-subtle border-b border-[#eaf0ec]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-4 py-3 text-[13px] font-semibold text-ink-muted tracking-wider ${col.className || ''}`}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center gap-1.5 hover:text-ink cursor-pointer font-semibold"
                    >
                      <span>
                        {col.headerBn}
                        {col.headerEn && (
                          <span className="text-[12px] opacity-75 ml-1">· {col.headerEn}</span>
                        )}
                      </span>
                      <ArrowUpDown size={13} aria-hidden="true" />
                    </button>
                  ) : (
                    <span>
                      {col.headerBn}
                      {col.headerEn && (
                        <span className="text-[12px] opacity-75 ml-1">· {col.headerEn}</span>
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaf0ec] text-[14px] md:text-[15px]">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-ink-muted"
                >
                  {language === 'bn' ? emptyMessageBn : emptyMessageEn}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr key={row._id || row.id || idx} className="hover:bg-brand-50/40 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3.5 text-ink ${col.className || ''}`}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-[13px] text-ink-muted px-1">
          <span>{pageDisplay}</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-1.5 rounded-lg border border-[#d1d5db] bg-white hover:bg-surface-sunken disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Previous Page"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-1.5 rounded-lg border border-[#d1d5db] bg-white hover:bg-surface-sunken disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Next Page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
