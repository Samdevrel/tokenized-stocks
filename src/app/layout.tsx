import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tokenized Stocks Explorer | @samdevrel",
  description: "Explore tokenized stocks, ETFs, and commodities on-chain. Trade 24/7, settle instantly, access global markets.",
  keywords: ["tokenized stocks", "RWA", "DeFi", "securities", "Ondo", "Backed", "blockchain"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
  openGraph: {
    title: "Tokenized Stocks Explorer",
    description: "Traditional assets on-chain — trade 24/7, settle instantly",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@samdevrel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
