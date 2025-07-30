"use client";

import { useActionState } from "react";
import { signUpSchema, SignUpSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpWithCredentials } from "@/lib/actions/user.actions";
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

export default function CredentialsSignUpForm() {
  const [state, formAction, pending] = useActionState(signUpWithCredentials, {
    success: false,
    message: "",
    fieldErrors: {},
  });

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { formState } = form;
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <span>Name</span>
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  {...field}
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormMessage>
                {formState.errors.name?.message ||
                  state?.fieldErrors?.name?.[0]}
              </FormMessage>
            </FormItem>
          )}
        />

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
                  autoComplete="email"
                  disabled={formState.isSubmitting}
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <span>Confirm Password</span>
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  {...field}
                  disabled={formState.isSubmitting}
                />
              </FormControl>
              <FormMessage>
                {formState.errors.confirmPassword?.message ||
                  state?.fieldErrors?.confirmPassword?.[0]}
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
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
