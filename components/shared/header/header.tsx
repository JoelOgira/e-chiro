import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/app-constants";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Menu from "./menu";

export default function Header() {
  return (
    <header className="top-0 w-full border-b py-2 lg:py-4">
      <MaxWidthWrapper className="flex items-center justify-between">
        <div className="flex justify-start">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={40}
              width={40}
              priority={true}
            />
            <span className="hidden font-bold text-2xl lg:block">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <Menu />
      </MaxWidthWrapper>
    </header>
  );
}
