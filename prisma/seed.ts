import prisma from "@/lib/prisma";
import sampleData from "@/db/sample-data";

async function main() {
  await prisma.product.deleteMany();

  const productsWithCorrectTypes = sampleData.products.map((product) => ({
    ...product,
    price:
      typeof product.price === "string"
        ? parseFloat(product.price)
        : product.price,
    rating:
      typeof product.rating === "string"
        ? parseFloat(product.rating)
        : product.rating,
  }));

  await prisma.product.createMany({
    data: productsWithCorrectTypes,
  });

  console.log("Seeding completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    console.log("Seeding failed");
    await prisma.$disconnect();
    process.exit(1);
  });
