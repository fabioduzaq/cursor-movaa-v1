import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, locale: string = 'pt-BR'): string {
  return new Intl.NumberFormat(locale).format(num);
}

export function formatCurrency(
  amount: number,
  currency: string = 'BRL',
  locale: string = 'pt-BR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(
  date: string | Date,
  locale: string = 'pt-BR',
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

export function calculateProgress(current: number, goal?: number): number {
  if (!goal || goal === 0) return 0;
  return Math.min(Math.round((current / goal) * 100), 100);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve();
  } catch (err) {
    document.body.removeChild(textArea);
    return Promise.reject(err);
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function getShareUrl(path: string): string {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}${path}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
