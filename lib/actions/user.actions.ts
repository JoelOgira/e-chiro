"use server";

import { signInSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { AuthError } from "next-auth";
import { ZodError } from "zod";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (!credentials.email) {
      return { success: false, message: "Email is required!" };
    }

    if (!credentials.password) {
      return { success: false, message: "Password is required!" };
    }

    const user = signInSchema.parse(credentials);
    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "Invalid email or password" };
    }

    if (error instanceof ZodError) {
      const errors = error.errors.map((e) => e.message);
      return { success: false, message: errors.join(". ") };
    }

    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function signUserOut() {
  await signOut();
}
