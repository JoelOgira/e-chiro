import MaxWidthWrapper from "@/components/max-width-wrapper"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MaxWidthWrapper className="flex flex-col">
      <main>{children}</main>
    </MaxWidthWrapper>
  );
}
