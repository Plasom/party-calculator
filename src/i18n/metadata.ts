import { Metadata } from "next";
import { Locale } from "./config";
import { getTranslation } from "./translations";

export function generateMetadata(locale: Locale): Metadata {
  const t = getTranslation(locale);
  const baseUrl = "https://sushiro-calculator.vercel.app";
  const localeCode = locale === "th" ? "th_TH" : "en_US";

  return {
    title: {
      default: t.metadata.title,
      template: t.metadata.titleTemplate,
    },
    description: t.metadata.description,
    keywords: [...t.metadata.keywords],
    authors: [{ name: "Sushiro Calculator Team" }],
    creator: "Sushiro Calculator",
    publisher: "Sushiro Calculator",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: localeCode,
      alternateLocale: locale === "th" ? "en_US" : "th_TH",
      url: `${baseUrl}/${locale}`,
      siteName: "Sushiro Calculator",
      title: t.metadata.og.title,
      description: t.metadata.og.description,
      images: [
        {
          url: "/images/sushiro_asset/dishes/red/default.svg",
          width: 1200,
          height: 630,
          alt: "Sushiro Calculator Logo",
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        th: `${baseUrl}/th`,
      },
    },
    icons: {
      icon: "/images/sushiro_asset/dishes/red/default.svg",
      shortcut: "/images/sushiro_asset/dishes/red/default.svg",
      apple: "/images/sushiro_asset/dishes/red/default.svg",
    },
    manifest: "/manifest.json",
  };
}

export function generateSushiroMetadata(locale: Locale): Metadata {
  const t = getTranslation(locale);
  const baseUrl = "https://sushiro-calculator.vercel.app";

  return {
    title: t.metadata.sushiro.title,
    description: t.metadata.sushiro.description,
    keywords: [...t.metadata.sushiro.keywords],
    openGraph: {
      title: t.metadata.sushiro.og.title,
      description: t.metadata.sushiro.og.description,
      images: [
        {
          url: "/images/restaurant/sushiro.png",
          width: 1200,
          height: 630,
          alt: "Sushiro Restaurant",
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/sushiro`,
      languages: {
        en: `${baseUrl}/en/sushiro`,
        th: `${baseUrl}/th/sushiro`,
      },
    },
  };
}

export function generateCheckoutMetadata(locale: Locale): Metadata {
  const t = getTranslation(locale);
  const baseUrl = "https://sushiro-calculator.vercel.app";

  return {
    title: t.metadata.checkout.title,
    description: t.metadata.checkout.description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/sushiro/checkout`,
      languages: {
        en: `${baseUrl}/en/sushiro/checkout`,
        th: `${baseUrl}/th/sushiro/checkout`,
      },
    },
  };
}

export function generatePaymentMetadata(locale: Locale): Metadata {
  const t = getTranslation(locale);
  const baseUrl = "https://sushiro-calculator.vercel.app";

  return {
    title: t.metadata.payment.title,
    description: t.metadata.payment.description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/sushiro/payment`,
      languages: {
        en: `${baseUrl}/en/sushiro/payment`,
        th: `${baseUrl}/th/sushiro/payment`,
      },
    },
  };
}

export function generateNotFoundMetadata(locale: Locale): Metadata {
  const t = getTranslation(locale);

  return {
    title: t.metadata.notFound.title,
    description: t.metadata.notFound.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}
