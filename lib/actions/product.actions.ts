"use server";

import prisma from "@/lib/prisma";
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
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  if (!product) {
    return null;
  }

  return {
    ...product,
    price: Number(product.price),
    rating: Number(product.rating),
    updatedAt: product.updatedAt || product.createdAt,
  };
}

// export async function getProductBySlug(slug: string): Promise<Product | null> {
//   const product = await prisma.product.findUnique({
//     where: { slug },
//   });

//   if (!product) return null;

//   return {
//     ...product,
//     price: Number(product.price), // Convert Decimal to number
//     rating: Number(product.rating), // Convert Decimal to number
//   };
// }

// export async function getAllProducts(): Promise<Product[]> {
//   const products = await prisma.product.findMany({
//     orderBy: { createdAt: "desc" },
//   });

//   return products.map((product) => ({
//     ...product,
//     price: Number(product.price), // Convert Decimal to number
//     rating: Number(product.rating), // Convert Decimal to number
//   }));
// }

// export async function getFeaturedProducts(): Promise<Product[]> {
//   const products = await prisma.product.findMany({
//     where: { isFeatured: true },
//     orderBy: { createdAt: "desc" },
//   });

//   return products.map((product) => ({
//     ...product,
//     price: Number(product.price), // Convert Decimal to number
//     rating: Number(product.rating), // Convert Decimal to number
//   }));
// }
