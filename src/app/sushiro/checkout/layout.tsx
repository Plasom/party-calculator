import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your group order summary, check individual bills, and proceed to payment. See detailed breakdown of dishes and costs per person.",
  keywords: ["checkout", "order summary", "bill review", "payment", "group billing"],
  openGraph: {
    title: "Checkout",
    description: "Review your group order summary, check individual bills, and proceed to payment. See detailed breakdown of dishes and costs per person.",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
