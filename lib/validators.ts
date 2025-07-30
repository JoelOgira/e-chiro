import { z } from "zod";

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  slug: z.string().min(3, "Slug must be at least 3 characters long"),
  brand: z.string().min(3, "Brand must be at least 3 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  stock: z.coerce.number(),
  isFeatured: z.boolean().default(false),
  images: z.array(z.string()).min(1, "At least one image is required"),
  banner: z.string().nullable(),
});

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name is required")
      .max(500, "Name should not exceed 500 characters"),
    email: z
      .string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Email required and must be a valid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(6, "Password must be more than 6 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: z
      .string({ required_error: "Confirm password is required" })
      .min(1, "Must confirm password")
      .min(6, "Password must be more than 6 characters")
      .max(32, "Password must be less than 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignUpSchema = z.infer<typeof signUpSchema>;
