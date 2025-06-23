import { cn } from "@/lib/utils";

type MaxWidthWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

export default function MaxWidthWrapper({
  className,
  children,
}: MaxWidthWrapperProps) {
  return (
    <div className={cn("min-h-[100svh] w-7xl mx-auto px-2.5", className)}>
      {children}
    </div>
  );
}
