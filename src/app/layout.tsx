import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/templates/app-provider";

const promptFont = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Party Calculator - Smart Restaurant Bill Splitting",
    template: "%s | Party Calculator"
  },
  description: "Smart restaurant bill splitting app for groups. Calculate individual portions, split bills fairly, and generate QR codes for easy payment. Perfect for dining out with friends!",
  keywords: ["bill splitting", "restaurant", "group dining", "payment calculator", "QR code", "PromptPay", "dining", "friends"],
  authors: [{ name: "Party Calculator Team" }],
  creator: "Party Calculator",
  publisher: "Party Calculator",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://party-calculator.vercel.app",
    siteName: "Party Calculator",
    title: "Party Calculator - Smart Restaurant Bill Splitting",
    description: "Smart restaurant bill splitting app for groups. Calculate individual portions, split bills fairly, and generate QR codes for easy payment.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Party Calculator Logo",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.svg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
          {children}
        </AppProviders>
      </body>
    </html>
  );
}