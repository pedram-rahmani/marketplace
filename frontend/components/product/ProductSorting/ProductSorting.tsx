"use client";

import { useState } from "react";

interface ProductSortingProps {
  onOpenFilter?: () => void;
}

export default function ProductSorting({ onOpenFilter }: ProductSortingProps) {
  const [sortedBy, setSortedBy] = useState(1);

  const sorting = [
    { id: 1, title: "همه محصولات", href: "" },
    { id: 2, title: "ارزان ترین", href: "" },
    { id: 3, title: "گران ترین", href: "" },
    { id: 4, title: "پرمخاطب ها", href: "" },
  ];

  return (
    <>
      {/* desktop version */}
      <div className="hidden md:flex items-center justify-between px-6 mb-8 h-16 backdrop-blur-xl border border-custom-gray-200 bg-light dark:bg-dark-600/50 dark:border-white/10 shadow rounded-2xl z-10">
        <div className="flex items-center gap-2 bg-custom-gray-400/30 dark:bg-dark-800/60 w-64 border border-white/10 rounded-xl px-4 py-2 focus-within:ring-1 focus-within:ring-ui-purple/30">
          <input
            type="text"
            placeholder="جستجو بین محصولات..."
            className="w-full text-sm tracking-wide! placeholder:text-secondary!"
          />
          <svg viewBox="0 0 24 24" className="shrink-0 text-secondary size-5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <div className="flex items-center gap-x-8 h-full">
          <div className="flex items-center gap-x-2 text-secondary">
            <svg viewBox="0 0 24 24" className="size-5">
              <path d="M12 4l-6 6h12l-6-6z" />
              <path d="M12 20l6-6H6l6 6z" />
            </svg>
            <span className="text-sm">مرتب سازی بر اساس :</span>
          </div>

          <div className="flex items-center gap-x-6 h-full text-sm">
            {sorting.map((sort) => (
              <button
                key={sort.id}
                className={`transition-colors cursor-pointer ${sortedBy === sort.id ? "text-primary font-bold" : "hover:text-primary"}`}
                onClick={() => setSortedBy(sort.id)}
              >
                {sort.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* mobile version */}
      <div className="flex md:hidden items-center gap-4 mb-8">
        <button 
          onClick={onOpenFilter}
          className="flex items-center justify-center gap-2 w-1/2 bg-white dark:bg-dark-800/80 backdrop-blur-xl border border-white/5 p-3 rounded-xl text-text-on-light dark:text-text-on-dark cursor-pointer"
        >
          <span>فیلتر</span>
        </button>
        <button className="flex items-center justify-center gap-2 w-1/2 bg-white dark:bg-dark-800/80 backdrop-blur-xl border border-white/5 p-3 rounded-xl text-text-on-light dark:text-text-on-dark cursor-pointer">
          <span>همه محصولات</span>
        </button>
      </div>
    </>
  );
}