"use client";

import { useEffect, useState, use } from "react";
import ProductFilter from "@/components/product/ProductFilter/ProductFilter";
import Pagination from "@/components/ui/Pagination/Pagination";
import ProductBoxSearch from "@/components/product/ProductBox/ProductBoxSearch";
import ProductSorting from "@/components/product/ProductSorting/ProductSorting";
import { getProducts, getCategories } from "@/server/product";
import { ProductSummary } from "@/types/product";
import Breadcrumb from "@/components/ui/BreadCrumb/BreadCrumb";

interface Category {
  id: number;
  name: string;
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const decodedSlug = decodeURIComponent(slug);
  const cleanTitle = decodedSlug
    .replace("category-", "")
    .replace(/-/g, " ")
    .trim();

  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumbLinks = [
    { id: "search-root", title: "جستجو", to: "/search" },
    { id: "current-category", title: cleanTitle, to: `/search/${slug}` },
  ];

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        //  get category slug from URL and clean it
        const categoryFromUrl = decodedSlug.replace("category-", "").trim();

        // send category slug to Laravel
        const data = await getProducts({ category: categoryFromUrl });

        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [slug, cleanTitle]);

  return (
    <>
      <Breadcrumb links={breadcrumbLinks} />

      <section className="mt-6 w-full bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl transition-all">
        <div className="mb-8">
          <ProductSorting />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <ProductFilter />
          </aside>

          <main className="lg:col-span-9 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-80 bg-white/5 animate-pulse rounded-3xl"
                  />
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductBoxSearch key={product.id} productInfos={product} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-400">
                  محصولی در دسته‌بندی "{cleanTitle}" پیدا نشد.
                </div>
              )}
            </div>

            {products.length > 0 && (
              <div className="mt-12 flex justify-center">
                <Pagination />
              </div>
            )}
          </main>
        </div>
      </section>
    </>
  );
}
