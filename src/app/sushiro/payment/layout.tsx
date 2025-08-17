import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment - Complete Your Transaction",
  description: "Complete your payment using PromptPay QR code. Scan and pay your portion of the bill quickly and securely.",
  keywords: ["payment", "PromptPay", "QR code", "mobile payment", "bill payment", "secure payment"],
  openGraph: {
    title: "Payment - Complete Your Transaction",
    description: "Complete your payment using PromptPay QR code. Scan and pay your portion of the bill quickly and securely.",
  },
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
