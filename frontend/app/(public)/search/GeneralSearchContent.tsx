"use client";

import { useState } from "react";
import ProductResults from "@/components/product/ProductResults/ProductResults";
import ProductFilter from "@/components/product/ProductFilter/ProductFilter";
import ProductSorting from "@/components/product/ProductSorting/ProductSorting";

interface GeneralSearchContentProps {
  initialProducts: any;
}

export default function GeneralSearchContent({
  initialProducts,
}: GeneralSearchContentProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="mt-6 w-full bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-8 rounded-3xl transition-all">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <ProductSorting />

        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl text-sm font-semibold cursor-pointer"
        >
            <svg viewBox="0 0 24 24" className="size-4!">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span>فیلترها</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8">
        <aside className="md:col-span-4 lg:col-span-3">
          <ProductFilter
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
          />
        </aside>
        <main className="md:col-span-8 lg:col-span-9">
          <ProductResults initialProducts={initialProducts} />
        </main>
      </div>
    </section>
  );
}
