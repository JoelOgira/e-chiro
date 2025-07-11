import ProductCard from "./product-card";
import { Product } from "@/types/types";

export default function ProductList({
  data,
  title,
  limit,
}: {
  data: Product[];
  title?: string;
  limit?: number;
}) {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      <h2 className="font-semibold text-3xl mb-5">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {limitedData.map((product: Product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  );
}
