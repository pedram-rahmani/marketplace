import ProductBox from "@/components/product/ProductBox/ProductBox";
import { getProducts } from "@/services/product";
import { ProductSummary } from "@/types/product";

interface ProductSectionProps {
  headerProps: {
    hot?: boolean;
    fav?: boolean;
  };
  products: ProductSummary[];
}

const ProductSection = ({ headerProps, products }: ProductSectionProps) => (
  <section className="px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 items-start justify-items-center">
      {products.map((product) => (
        <div key={product.id} className="w-full">
          <ProductBox productInfos={product} />
        </div>
      ))}
    </div>
  </section>
);

export default async function Page() {
  const products: ProductSummary[] = await getProducts();

  return (
    <div className="space-y-6 pb-8">
      <ProductSection headerProps={{ hot: true }} products={products} />
      <ProductSection headerProps={{ fav: true }} products={products} />
    </div>
  );
}