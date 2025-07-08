"use server";

import prisma from "@/lib/prisma";
// import { convertToPlainObject } from "../utils";
import { Product } from "@/types/types";

export async function getLatestProducts(limit?: number): Promise<Product[]> {
  const products = await prisma.product.findMany({
    take: limit || 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
    updatedAt: product.updatedAt || product.createdAt,
  }));

  // return convertToPlainObject(data);
}
