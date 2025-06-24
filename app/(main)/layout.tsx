import Footer from "@/components/footer";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Header from "@/components/shared/header/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MaxWidthWrapper>{children}</MaxWidthWrapper>
      </main>
      <Footer />
    </div>
  );
}
