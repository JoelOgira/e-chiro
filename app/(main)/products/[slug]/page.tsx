import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { ShoppingCart } from "lucide-react";
import ProductImages from "@/components/shared/product/product-images";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Images Column */}
        <div className="col-span-2">
          <ProductImages images={product.images} />
        </div>
        {/* Details Column */}
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-4">
            <p>
              {product.brand} {product.category}
            </p>
            <h1 className="font-semibold text-xl">{product.name}</h1>
            <p>
              {product.rating} of {product.numReviews} reviews
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Badge className="bg-green-100 text-green-700 p-2 text-lg font-semibold">
                {formatCurrency(product.price)}
              </Badge>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <span className="font-bold">Description</span>
            <p className="text-muted-foreground text-sm">
              {product.description}
            </p>
          </div>
        </div>
        {/* Actions Column */}
        <div className="pt-5">
          <Card>
            <CardContent className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <span>Price</span>
                <p>{formatCurrency(product.price)}</p>
              </div>
              <div className="flex justify-between items-center">
                <span>Status</span>
                {product.stock > 0 ? (
                  <Badge className="bg-green-100 text-green-700">
                    In Stock
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="w-full">
              <Button className="w-full" disabled={product.stock < 1}>
                <ShoppingCart /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
