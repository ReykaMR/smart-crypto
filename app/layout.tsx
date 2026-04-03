import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Crypto - Belajar Crypto dari Nol",
  description:
    "Belajar crypto dari nol, tanpa jargon rumit. Kursus interaktif untuk pemula.",
  keywords: [
    "crypto",
    "bitcoin",
    "blockchain",
    "education",
    "learning",
    "cryptocurrency",
  ],
  authors: [{ name: "Smart Crypto" }],
  openGraph: {
    title: "Smart Crypto - Learn Crypto from Zero",
    description: "Belajar crypto dari nol, tanpa jargon rumit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
