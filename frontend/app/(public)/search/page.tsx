import ProductResults from "@/components/product/ProductResults/ProductResults";
import ProductFilter from "@/components/product/ProductFilter/ProductFilter";
import ProductSorting from "@/components/product/ProductSorting/ProductSorting";
import Breadcrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import { getProducts } from "@/server/product";

export default async function GeneralSearchPage() {
  const initialProducts = await getProducts({});

  return (
    <>
      <Breadcrumb links={[{ id: "search-root", title: "جستجو", to: "/search" }]} />
      <section className="mt-6 w-full bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl transition-all">
        <div className="mb-8"><ProductSorting /></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 order-2 lg:order-1"><ProductFilter /></aside>
          <main className="lg:col-span-9 order-1 lg:order-2">
            <ProductResults initialProducts={initialProducts} />
          </main>
        </div>
      </section>
    </>
  );
}