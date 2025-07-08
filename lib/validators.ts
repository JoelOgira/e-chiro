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
