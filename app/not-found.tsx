import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col text-center items-center justify-center gap-y-2 lg:gap-y-4 ">
      <h1 className="text-4xl font-bold lg:text-8xl">404</h1>
      <span className="font-light leading-loose text-2xl">
        {"Oops, sorry we can't find that page!"}
      </span>
      <p>Either something went wrong of the page no longer exists</p>
      <Button asChild className="rounded-full my-3">
        <Link href="/" className="flex items-center">
          <ChevronLeftCircle /> Back to homepage
        </Link>
      </Button>
    </div>
  );
}
