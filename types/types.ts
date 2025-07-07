import {z} from "zod";
import { insertProductSchema } from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    numReviews: number;
    rating: number;
}