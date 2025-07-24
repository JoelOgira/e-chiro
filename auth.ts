import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compareSync } from "bcrypt-ts-edge";
import { signInSchema } from "@/lib/validators";
import { ZodError } from "zod";

const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password.",
  INVALID_INPUT: "Invalid input. Please check your email and password format.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            throw new Error(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);
          }

          const isPasswordValid = compareSync(password, user.password);

          if (!isPasswordValid) {
            throw new Error(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            console.error("Zod validation error during sign-in:", error.issues);
            throw new Error(AUTH_ERROR_MESSAGES.INVALID_INPUT);
          } else if (error instanceof Error) {
            if (Object.values(AUTH_ERROR_MESSAGES).includes(error.message)) {
              throw error;
            }
            console.error(
              "An unexpected error occurred during sign-in:",
              error
            );
            throw new Error(AUTH_ERROR_MESSAGES.UNKNOWN_ERROR);
          } else {
            console.error("A non-Error type was thrown during sign-in:", error);
            throw new Error(AUTH_ERROR_MESSAGES.UNKNOWN_ERROR);
          }
        }
      },
    }),
  ],
  callbacks: {
    // jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id as string;
    //     token.role = user.role;
    //   }
    //   return token;
    // },
    session({ session, token, trigger, user }) {
      if (token?.sub) {
        session.user.id = token.sub;
      }

      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
  },
});
