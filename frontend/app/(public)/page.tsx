import ProductBox from "@/components/product/ProductBox/ProductBox";
import { getProducts } from "@/server/product";
import { ProductSummary } from "@/types/product";

interface ProductSectionProps {
  headerProps: {
    hot?: boolean;
    fav?: boolean;
  };
  products: ProductSummary[];
}

const ProductSection = ({ headerProps, products }: ProductSectionProps) => (
  <section>
    <div className="grid grid-rows-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
      {products.map((product) => (
        <ProductBox key={product.id} productInfos={product} />
      ))}
    </div>
  </section>
);

export default async function Page() {
  const products: ProductSummary[] = await getProducts();

  return (
    <div className="space-y-5">
      <ProductSection headerProps={{ hot: true }} products={products} />
      <ProductSection headerProps={{ fav: true }} products={products} />
    </div>
  );
}