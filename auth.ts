import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compareSync } from "bcrypt-ts-edge";
import { signInSchema } from "@/lib/validators";
import { ZodError } from "zod";

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

          if (!user) {
            throw new Error("User not found with this email");
          }
          if (!user.password) {
            throw new Error("User has no password set");
          }

          const isPasswordValid = compareSync(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Password does not match");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }

          console.log(error);
          throw new Error("Invalid email or password");
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
