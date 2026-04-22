'use client';

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname() || '';

  useEffect(() => {
    // Extract locale (e.g. /th or /en) and redirect to sushiro route
    const localeMatch = pathname.match(/^\/(en|th)/);
    const locale = localeMatch ? localeMatch[1] : 'en';
    router.replace(`/${locale}/sushiro`);
  }, [pathname, router]);

  return null;
}
