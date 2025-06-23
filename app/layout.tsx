import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/app-constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | e-chiro`,
    default: APP_NAME,
  },
  description: `${APP_DESCRIPTION}`,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
