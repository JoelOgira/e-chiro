import { cn } from "@/lib/utils";

type MaxWidthWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

export default function MaxWidthWrapper({
  className,
  children,
}: MaxWidthWrapperProps) {
  return <div className={cn("max-w-7xl mx-auto px-2", className)}>{children}</div>;
}
