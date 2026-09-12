"use client";

import { useState } from "react";
import SearchInput from "@/components/ui/SearchInput/SearchInput";
import { getProducts } from "@/services/product";

const ASSET_URL = process.env.NEXT_PUBLIC_ASSET_URL || "http://127.0.0.1:8000";

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 w-full lg:hidden bg-white/80 dark:bg-dark-700 backdrop-blur-md border-b border-gray-100 dark:border-white/5 z-50">
      <div className="flex items-center justify-between h-14 px-4 w-full text-gray-800 dark:text-white">
        {/* Menu */}
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <svg className="size-6" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <span className="font-extrabold text-sm tracking-wider text-violet-600 dark:text-cyan-400">
          MARKETPLACE
        </span>

        {/* Search Toggle */}
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Search Bar Drawer */}
      {showSearch && (
        <div className="p-3 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-dark-700">
          <SearchInput
            placeholder="به دنبال چه میگردی؟"
            showImage={true}
            filterKey="name"
            redirectUrl="/search"
            searchParamName="search"
            getItemLink={(item: any) => `/products/${item.slug || item.id}`}
            onSearchSuccess={() => setShowSearch(false)}
            fetcher={async (query) => {
              const products = await getProducts({ search: query });
              return products.map((product) => {
                let imageUrl = product.img;
                if (imageUrl && !imageUrl.startsWith("http")) {
                  imageUrl = `${ASSET_URL}/storage/${imageUrl.replace(/^\/?storage\//, "")}`;
                }
                return { ...product, img: imageUrl };
              });
            }}
          />
        </div>
      )}
    </header>
  );
}