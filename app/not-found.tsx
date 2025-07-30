import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex-center text-center p-4">
      <Card className="gap-y-2 lg:gap-y-4 ">
        <CardHeader className="flex flex-col text-center items-center space-y-4">
          <Image src="/images/logo.svg" alt="logo" width={100} height={100} />
          <h1 className="text-4xl font-bold lg:text-6xl">404</h1>
        </CardHeader>
        <CardContent>
          <span className="font-light leading-loose text-2xl">
            {"Oops, sorry we can't find that page!"}
          </span>
          <p>Either something went wrong of the page no longer exists</p>
        </CardContent>
        <CardFooter className="flex-center">
          <Button asChild className="my-3">
            <Link href="/" className="flex items-center">
              <ChevronLeftCircle /> Back to homepage
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
