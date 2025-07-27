"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useActionState } from "react";
import { signInSchema } from "@/lib/validators";
import { signInWithCredentials } from "@/lib/actions/user.actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";

export default function CredentialsSignInForm() {
  const [state, formAction, pending] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState } = form;

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-4 md:space-y-6 text-start">
        <p aria-live="polite" className="text-destructive text-center">
          {state?.message}
        </p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  disabled={formState.isSubmitting}
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={pending}
        >
          {pending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary link" target="_self">
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
}
