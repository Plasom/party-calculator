import type { Metadata } from "next";
import { Locale } from "@/i18n/config";
import { generateSushiroMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateSushiroMetadata(locale);
}

export default function SushiroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
