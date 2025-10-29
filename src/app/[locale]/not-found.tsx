'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, defaultLocale } from "@/i18n/config";
import { getTranslation } from "@/i18n/translations";

export default function NotFound() {
  const pathname = usePathname();
  
  // Extract locale from pathname
  const locale = (pathname?.split('/')[1] as Locale) || defaultLocale;
  const t = getTranslation(locale);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          {t.metadata.notFound.title}
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {t.metadata.notFound.description}
        </p>
        <Link
          href={`/${locale}`}
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {locale === "th" ? "กลับหน้าหลัก" : "Go Back Home"}
        </Link>
      </div>
    </div>
  );
}
