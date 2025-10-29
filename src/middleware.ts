import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, Locale } from "./i18n/config";

function getLocale(request: NextRequest): Locale {
  // Try to get locale from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  
  if (acceptLanguage) {
    // Parse the Accept-Language header
    const languages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [locale, q = "1"] = lang.trim().split(";q=");
        return { locale: locale.split("-")[0], quality: parseFloat(q) };
      })
      .sort((a, b) => b.quality - a.quality);

    // Find first matching locale
    for (const { locale } of languages) {
      if (locales.includes(locale as Locale)) {
        return locale as Locale;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Detect locale from browser or use default
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, images, etc.)
    "/((?!_next|api|favicon.ico|logo.svg|manifest.json|images|.*\\..*).*)",
  ],
};
