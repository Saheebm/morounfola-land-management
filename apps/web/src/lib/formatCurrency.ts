/**
 * Utility functions for handling numerals, currency, and locale-based number formatting.
 * Adheres strictly to docs/Design.md §6.
 */

const BENGALI_DIGITS: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

/**
 * Converts Latin digits in any string or number to Bengali digits.
 */
export function toBengaliNumerals(val: number | string): string {
  return String(val).replace(/[0-9]/g, (digit) => BENGALI_DIGITS[digit] || digit);
}

/**
 * Formats a number with comma groupings according to locale.
 * @param val Number to format
 * @param lang 'bn' or 'en' (defaults to 'bn')
 */
export function formatNumber(val: number, lang: 'bn' | 'en' = 'bn'): string {
  if (isNaN(val)) return '০';
  const locale = lang === 'bn' ? 'bn-BD' : 'en-US';
  return new Intl.NumberFormat(locale).format(val);
}

/**
 * Formats currency with the Taka sign ৳ and locale-appropriate numerals and commas.
 * Examples:
 *   formatCurrency(120, 'bn')  => "৳১২০"
 *   formatCurrency(5450, 'bn') => "৳৫,৪৫০"
 *   formatCurrency(5450, 'en') => "৳5,450"
 */
export function formatCurrency(amount: number, lang: 'bn' | 'en' = 'bn'): string {
  const formatted = formatNumber(amount, lang);
  return `৳${formatted}`;
}
