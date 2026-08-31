import { getProducts } from "@/server/product";
import ProductResults from "@/components/product/ProductResults/ProductResults";
import ProductFilter from "@/components/product/ProductFilter/ProductFilter";
import ProductSorting from "@/components/product/ProductSorting/ProductSorting";
import Breadcrumb from "@/components/ui/BreadCrumb/BreadCrumb";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);
  const cleanTitle = decodedSlug
    .replace("category-", "")
    .replace(/-/g, " ")
    .trim();
  const categoryFromUrl = decodedSlug.replace("category-", "").trim();

  const initialProducts = await getProducts({ category: categoryFromUrl });

  const breadcrumbLinks = [
    { id: "search-root", title: "جستجو", to: "/search" },
    { id: "current-category", title: cleanTitle, to: `/search/${slug}` },
  ];

  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />

      <section className="mt-6 w-full bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/10 py-8 px-5 rounded-3xl shadow-sm transition-all">
        <div className="mb-8">
          <ProductSorting />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <ProductFilter />
          </aside>

          <main className="lg:col-span-9 order-1 lg:order-2">
            <ProductResults
              initialProducts={initialProducts}
              categorySlug={categoryFromUrl}
              cleanTitle={cleanTitle}
            />
          </main>
        </div>
      </section>
    </>
  );
}