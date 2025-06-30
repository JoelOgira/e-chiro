/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : i < rating
            ? "fill-yellow-400/50 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="relative w-[300px] h-[300px] overflow-hidden mx-auto">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm font-semibold">
                Out of Stock
              </Badge>
            </div>
          )}
          {product.isFeatured && product.stock > 0 && (
            <Badge className="absolute top-2 left-2 bg-green-600 hover:bg-green-700">
              Featured
            </Badge>
          )}
        </div>

        <CardContent className="p-4 space-y-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium">
              {product.brand}
            </p>

            <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors hover:underline">
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.numReviews})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
              {product.stock > 0 && product.stock <= 5 && (
                <p className="text-[10px] text-orange-600 font-medium">
                  Only {product.stock} left!
                </p>
              )}
            </div>

            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
