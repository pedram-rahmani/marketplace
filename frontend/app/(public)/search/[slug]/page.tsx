import { getProducts } from "@/services/product";
import { getCategoryBySlug } from "@/services/category";
import ProductResults from "@/components/product/ProductResults/ProductResults";
import Breadcrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import ProductSearchContent from "./ProductSearchContent";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);
  const categoryFromUrl = decodedSlug.replace("category-", "").trim();

  const categoryData = await getCategoryBySlug(categoryFromUrl);
  const categoryName = categoryData ? categoryData.name : decodedSlug.replace("category-", "").replace(/-/g, " ").trim();

  const initialProducts = await getProducts({ category: categoryFromUrl });

  const breadcrumbLinks = [
    { id: "search-root", title: "جستجو", to: "/search" },
    { id: "current-category", title: categoryName, to: `/search/${slug}` },
  ];

  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />

      <section className="mt-6 w-full bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/10 py-8 px-5 rounded-3xl shadow-sm transition-all">
        <ProductSearchContent>
          <ProductResults
            initialProducts={initialProducts}
            categorySlug={categoryFromUrl}
            cleanTitle={categoryName}
          />
        </ProductSearchContent>
      </section>
    </>
  );
}