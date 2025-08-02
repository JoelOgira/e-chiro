"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOutIcon, User2Icon, UserCheck2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { usePathname, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function UserButton() {
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "";

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPath = `${pathname}${
    searchParams.toString() ? "?" + searchParams.toString() : ""
  }`;

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Button variant="outline" className="flex items-center gap-x-2">
              <UserCheck2 className="size-5" />
              <span>Hi, {firstName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex gap-x-3">
                <User2Icon className="size-5" />
                <div className="flex flex-col space-y-1">
                  <span className="text-sm font-medium leading-none">
                    {session.user?.name}
                  </span>
                  <span className="text-sm text-muted-foreground leading-none">
                    {session.user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-x-3 cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOutIcon className="size-5" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild variant="default">
          <Link
            href={`/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`}
          >
            <User2Icon className="size-5" />
            <span>Sign In</span>
          </Link>
        </Button>
      )}
    </>
  );
}
