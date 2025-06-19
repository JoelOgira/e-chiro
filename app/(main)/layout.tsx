import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "e-chiro",
  description: "Your one0stop e-commerce store",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
        {children}
    </div>
  );
}
