import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/app-constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CredentialsSignUpForm from "./credentials-signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to e-chiro and start shopping.",
};

export default async function SignUpPage(props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.svg"
              width={100}
              height={100}
              alt={`${APP_NAME}`}
              priority={true}
            />
          </Link>
          <CardTitle className="text-center font-semibold text-lg">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Sign up to e-chiro and start shopping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CredentialsSignUpForm />
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground mx-auto">
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
