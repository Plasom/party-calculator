'use client';

import { usePathname } from 'next/navigation';
import { Locale, defaultLocale } from './config';
import { getTranslation } from './translations';

/**
 * Hook to get translations for the current locale
 * @returns Translation object for the current locale
 * 
 * @example
 * ```tsx
 * const t = useTranslations();
 * return <button>{t.common.buttons.save}</button>
 * ```
 */
export function useTranslations() {
  const pathname = usePathname();
  
  // Extract locale from pathname
  const locale = (pathname?.split('/')[1] as Locale) || defaultLocale;
  
  return getTranslation(locale);
}

/**
 * Hook to get the current locale
 * @returns Current locale
 * 
 * @example
 * ```tsx
 * const locale = useLocale();
 * return <div lang={locale}>Content</div>
 * ```
 */
export function useLocale(): Locale {
  const pathname = usePathname();
  return (pathname?.split('/')[1] as Locale) || defaultLocale;
}
