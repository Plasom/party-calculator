import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sushiro",
  description: "Order sushiro dishes for your group and split the bill easily. Add members, select dishes, and calculate individual portions automatically.",
  keywords: ["Sushiro", "sushi", "Japanese restaurant", "bill splitting", "group order", "menu", "food calculator"],
  openGraph: {
    title: "Sushiro",
    description: "Order sushiro dishes for your group and split the bill easily. Add members, select dishes, and calculate individual portions automatically.",
    images: [
      {
        url: "/images/restaurant/sushiro.png",
        width: 1200,
        height: 630,
        alt: "Sushiro Restaurant",
      },
    ],
  },
};

export default function SushiroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
