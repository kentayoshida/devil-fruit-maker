import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://devil-fruit-maker.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "悪魔の実メーカー | Devil Fruit Maker",
    template: "%s | 悪魔の実メーカー",
  },
  description:
    "あなたの名前から、あなただけの悪魔の実が判明する。ONE PIECE インスパイアのファンメイドジェネレーター。",
  applicationName: "Devil Fruit Maker",
  authors: [{ name: "devil-fruit-maker" }],
  keywords: [
    "悪魔の実",
    "ワンピース",
    "ONE PIECE",
    "悪魔の実メーカー",
    "脳内メーカー",
    "Devil Fruit",
    "name generator",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "悪魔の実メーカー",
    title: "悪魔の実メーカー | Devil Fruit Maker",
    description:
      "あなたの名前から、あなただけの悪魔の実が判明する。ONE PIECE インスパイアのファンメイド。",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "悪魔の実メーカー",
    description: "あなたの名前から、あなただけの悪魔の実が判明する。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 text-white">{children}</body>
    </html>
  );
}
