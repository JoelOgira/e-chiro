import ThemeToggler from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, UserIcon, PanelRight } from "lucide-react";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex justify-end gap-2">
      <nav className="hidden md:flex w-full max-w-xs gap-3">
        <ThemeToggler />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCart className="size-5" /> Cart
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/sign-in">
            <UserIcon className="size-5" /> Sign In
          </Link>
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <PanelRight />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <ThemeToggler />
            <Button asChild variant="ghost">
              <Link href="/cart">
                <ShoppingCart className="size-5" /> Cart
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/sign-in">
                <UserIcon className="size-5" /> Sign In
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
