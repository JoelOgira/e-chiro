"use server";

import { signInSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}

export async function signUserOut() {
  await signOut();
}

// export type FormState = {
//   type: "error" | "success";
//   message?: string;
//   error?: string | {
//       email?: string[] | undefined;
//       password?: string[] | undefined;
//   };
// } | null;

// export async function signInAction(
//   prevState: FormState,
//   formData: FormData
// ): Promise<FormState> {
//   const validatedFields = signInSchema.safeParse(
//     Object.fromEntries(formData.entries())
//   );

//   if (!validatedFields.success) {
//     return {
//       type: "error",
//       error: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   try {
//     await signIn("credentials", {
//       ...validatedFields.data,
//       redirectTo: "/",
//     });
//     return {
//       type: "success",
//       message: "Signed in successfully",
//     };
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return {
//             type: "error",
//             error: "Invalid credentials.",
//           };
//         default:
//           return {
//             type: "error",
//             error: "Something went wrong.",
//           };
//       }
//     }
//     throw error;
//   }
// }
