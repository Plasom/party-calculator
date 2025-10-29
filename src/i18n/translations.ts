import { Locale } from "./config";
import { metadataEN, metadataTH } from "./locales/metadata";
import { commonEN, commonTH } from "./locales/common";
import { homeEN, homeTH } from "./locales/home";
import { sushiroEN, sushiroTH } from "./locales/sushiro";
import { checkoutEN, checkoutTH } from "./locales/checkout";
import { paymentEN, paymentTH } from "./locales/payment";
import { modalEN, modalTH } from "./locales/modal";

export const translations = {
  en: {
    metadata: metadataEN,
    common: commonEN,
    home: homeEN,
    sushiro: sushiroEN,
    checkout: checkoutEN,
    payment: paymentEN,
    modal: modalEN,
  },
  th: {
    metadata: metadataTH,
    common: commonTH,
    home: homeTH,
    sushiro: sushiroTH,
    checkout: checkoutTH,
    payment: paymentTH,
    modal: modalTH,
  },
} as const;

export function getTranslation(locale: Locale) {
  return translations[locale] || translations.en;
}
