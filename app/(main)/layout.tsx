import Footer from "@/components/footer";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Header from "@/components/shared/header/header";
import { SessionProvider } from "next-auth/react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <SessionProvider>
        <Header />
      </SessionProvider>
      <main className="flex-1">
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </main>
      <Footer />
    </div>
  );
}
