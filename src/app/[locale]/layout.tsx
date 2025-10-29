import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { AppProviders } from "@/components/templates/app-provider";
import ClarityAnalytics from "@/components/analytics/clarity";
import { locales, Locale } from "@/i18n/config";
import { generateMetadata as genMetadata } from "@/i18n/metadata";
import "../globals.css";

const promptFont = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return genMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head>
        <meta name="application-name" content="Party Calculator" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Party Calculator" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${promptFont.className} scrollbar-hide select-none antialiased`}
      >
        <AppProviders>
          <ClarityAnalytics />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
