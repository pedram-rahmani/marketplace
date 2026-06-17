"use client";

import { useState, useCallback } from "react";
import Checkbox from "@/components/ui/Form/Checkbox";

const FilterSection = ({ title, children, isOpenDefault = true }: any) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="border-b border-gray-100 dark:border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-right"
      >
        <span className="font-bold text-sm text-dark-900 dark:text-white/90">
          {title}
        </span>
        <svg
          viewBox="0 0 24 24"
          className={`size-4! text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="space-y-3 pr-1">{children}</div>
      </div>
    </div>
  );
};

export default function ProductFilter() {
  const inputHandler = useCallback((id: string, checked: boolean) => {
    //...
  }, []);

  return (
    <aside className="bg-white dark:bg-ui-blue-800 border border-gray-200 dark:border-white/5 p-5 rounded-2xl shadow-sm sticky top-24">
      {/* sidebar header */}
      <div className="flex items-center justify-between mb-2 border-b border-gray-100 dark:border-white/10 pb-4">
        <h2 className="font-extrabold text-lg">فیلترها</h2>
        <button className="text-xs text-blue-500 hover:text-blue-600 font-bold">
          حذف همه
        </button>
      </div>

      {/* بخش برندها */}
      <FilterSection title="برند">
        <Checkbox
          id="apple"
          label="اپل"
          onInputHandler={inputHandler}
          activeColor="bg-teal-500 border-teal-500"
        />
        <Checkbox
          id="samsung"
          label="سامسونگ"
          onInputHandler={inputHandler}
          activeColor="bg-teal-500 border-teal-500"
        />
        <Checkbox
          id="xiaomi"
          label="شیائومی"
          onInputHandler={inputHandler}
          activeColor="bg-teal-500 border-teal-500"
        />
      </FilterSection>

      {/* بخش محدوده قیمت */}
      <FilterSection title="محدوده قیمت">
        <div className="space-y-4 px-2">
          <div className="flex justify-between items-center text-xs opacity-70">
            <span>از ۱,۰۰۰,۰۰۰</span>
            <span>تومان</span>
          </div>
          <input
            type="range"
            className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
          <div className="flex justify-between items-center text-xs opacity-70">
            <span>تا ۵۰,۰۰۰,۰۰۰</span>
            <span>تومان</span>
          </div>
        </div>
      </FilterSection>

      {/* بخش وضعیت موجودی */}
      <FilterSection title="وضعیت کالا">
        <Checkbox
          id="available"
          label="فقط کالاهای موجود"
          onInputHandler={inputHandler}
          activeColor="bg-teal-500 border-teal-500"
        />
        <Checkbox
          id="has_off"
          label="فقط کالاهای دارای تخفیف"
          onInputHandler={inputHandler}
          activeColor="bg-teal-500 border-teal-500"
        />
      </FilterSection>
    </aside>
  );
}
