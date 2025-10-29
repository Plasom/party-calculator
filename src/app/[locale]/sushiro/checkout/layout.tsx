import type { Metadata } from "next";
import { Locale } from "@/i18n/config";
import { generateCheckoutMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateCheckoutMetadata(locale);
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
