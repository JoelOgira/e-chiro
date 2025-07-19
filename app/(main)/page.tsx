import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

export default async function Home() {
  const latestProducts = await getLatestProducts(4);

  return <ProductList data={latestProducts} title="Newest Arrivals" />;
}
