"use client";

import { useState } from "react";
import ProductSorting from "@/components/product/ProductSorting/ProductSorting";
import ProductFilter from "@/components/product/ProductFilter/ProductFilter";

export default function ProductSearchContent({ children }: { children: React.ReactNode }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="relative">
      <div className="mb-4 md:hidden flex justify-end">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl text-sm font-semibold cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="size-4!">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          فیلترها
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8">
        <aside className="md:col-span-4 lg:col-span-3">
          <ProductFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
        </aside>

        <main className="md:col-span-8 lg:col-span-9">
          {children}
        </main>
      </div>
    </div>
  );
}