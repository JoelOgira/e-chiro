import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Product } from "@/types/types";
import { formatCurrency } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
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
    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg p-0">
      <Link href={`/products/${product.slug}`}>
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden bg-gray-50">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={256}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
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

        <CardContent className="p-2 space-y-2 md:p-4 md:space-y-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-medium hidden md:block">
              {product.brand}
            </p>
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors hover:underline md:text-base">
              {product.name}
            </h3>
          </div>
          <p className="text-xs hidden md:block text-muted-foreground line-clamp-2">
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between md:flex-col md:space-y-1">
              <p className="text-lg font-bold text-primary">
                {formatCurrency(product.price)}
              </p>
              {product.stock > 0 && product.stock <= 5 && (
                <p className="text-[10px] text-orange-600 font-medium">
                  Only {product.stock} left!
                </p>
              )}
            </div>
            <Badge variant="outline" className="hidden md:block text-xs">
              {product.category}
            </Badge>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
