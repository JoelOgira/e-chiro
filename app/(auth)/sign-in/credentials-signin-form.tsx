"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useActionState } from "react";
import { signInSchema } from "@/lib/validators";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";

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

  // callbackUrl
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-4 md:space-y-6 text-start">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <p aria-live="polite" className="text-destructive text-center">
          {state?.message}
        </p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <span>Email</span>
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  disabled={formState.isSubmitting}
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage>
                {formState.errors.email?.message ||
                  state?.fieldErrors?.email?.[0]}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <span>Password</span>
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormMessage>
                {formState.errors.password?.message ||
                  state?.fieldErrors?.password?.[0]}
              </FormMessage>
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
      </form>
    </Form>
  );
}
