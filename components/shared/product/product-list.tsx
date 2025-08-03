import ProductCard from "./product-card";
import { Product } from "@/types/types";

export default function ProductList({
  data,
  title,
}: {
  data: Product[];
  title?: string;
}) {
  return (
    <div className="my-6 md:my-10">
      <h2 className="font-semibold text-2xl mb-5 md:text-3xl">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((product: Product) => (
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
