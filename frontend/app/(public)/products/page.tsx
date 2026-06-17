import Breadcrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import FilterBox from "@/components/product/ProductFilter/ProductFilter";
import ProductBox from "@/components/product/ProductBox/ProductBox";
import ProductsSorting from "@/components/product/ProductSorting/ProductSorting";
import Pagination from "@/components/ui/Pagination/Pagination";
import SectionHeader from "@/components/product/SectionHeader/SectionHeader";

import { searchProducts } from "@/lib/db/product.queries";
import { ProductSummary } from "@/types/product";

interface ProductsPageProps {
  searchParams?: {
    q?: string;
    page?: string;
  };
}

export default async function page({ searchParams }: ProductsPageProps) {
  const page = Number(searchParams?.page ?? 1);
  const query = searchParams?.q ?? "";


  const products: ProductSummary[] = await searchProducts(query, {
    page,
    limit: 12,
  });
  
  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "/" },
          { id: 2, title: "همه محصولات", to: "/products" },
        ]}
      />

      <SectionHeader
        txt="محصولات"
        styles="text-my-Txt2 dark:text-my-Txt1"
        svg={`<svg viewBox="0 0 100 100"><rect x="10" y="10" width="75" height="75" rx="17" ry="17" fill="#dcbd3f" stroke="#dcbd3f" /></svg>`}
      />

      <section className="grid grid-cols-12 gap-y-5 md:gap-x-7 rtl">
        <FilterBox />

        <section className="col-span-full lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
          <ProductsSorting />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7">
            {products.map((product) => (
              <ProductBox key={product.id} productInfos={product} />
            ))}
          </div>

          <Pagination products={products} itemsPerPage={3} />
        </section>
      </section>
    </>
  );
}
