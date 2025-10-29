import type { Metadata } from "next";
import { Locale } from "@/i18n/config";
import { generatePaymentMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePaymentMetadata(locale);
}

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
