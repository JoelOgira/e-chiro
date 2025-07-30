"use server";

import { signInSchema, signUpSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { hashSync } from "bcrypt-ts-edge";
import prisma from "@/lib/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { AuthError } from "next-auth";

// Sign up user with credentials
export async function signUpWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signUpSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!user.success) {
      return {
        success: false,
        message: "Please fix the error(s) below.",
        fieldErrors: user.error.flatten().fieldErrors,
      };
    }

    const newUser = user.data;

    const existingUser = await prisma.user.findUnique({
      where: { email: newUser.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
        fieldErrors: { email: ["Email is already taken"] },
      };
    }

    const plainPassword = newUser.password;
    newUser.password = hashSync(newUser.password, 10);

    await prisma.user.create({
      data: {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      },
    });

    const callbackUrl = formData.get("callbackUrl")?.toString() || "/";

    await signIn("credentials", {
      email: newUser.email,
      password: plainPassword,
      redirectTo: callbackUrl,
    });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      console.error(
        "Auth error during sign-up:",
        error.cause?.message || error.message
      );
      return {
        success: false,
        message:
          "Authentication failed after registration. Please try logging in.",
      };
    }

    console.error("Unexpected server error during sign-up:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      fieldErrors: {},
    };
  }
}

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!user.success) {
      return {
        success: false,
        message: "Please fix the error(s) below.",
        fieldErrors: user.error.flatten().fieldErrors,
      };
    }

    const callbackUrl = formData.get("callbackUrl")?.toString() || "/";

    await signIn("credentials", {
      ...user.data,
      redirectTo: callbackUrl,
    });

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials." };
        default:
          console.error(
            "Auth error during sign-in:",
            error.cause?.message || error.message
          );
          return {
            success: false,
            message: "Something went wrong. Please try again.",
          };
      }
    }

    console.error("Unexpected server error during sign-in:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      fieldErrors: {},
    };
  }
}

// Sign Out
export async function signUserOut() {
  await signOut();
}
