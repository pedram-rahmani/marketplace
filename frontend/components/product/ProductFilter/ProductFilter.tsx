"use client";

import { useCallback } from "react";
import Checkbox from "@/components/ui/Form/Checkbox";
import FilterSection from "./FilterSection";

export default function ProductFilter() {
  const inputHandler = useCallback((id: string, checked: boolean) => {
    //...
  }, []);

  return (
    <aside className="bg-white dark:bg-dark-600/50 backdrop-blur-xl border min-w-56 border-gray-200 dark:border-white/5 p-5 rounded-2xl shadow-sm sticky top-24">
      {/* sidebar header */}
      <div className="flex items-center justify-between mb-2 border-b border-gray-100 dark:border-white/10 pb-4">
        <h2 className="font-extrabold text-lg text-gray-900 dark:text-white">فیلترها</h2>
        <button 
          className="text-xs text-blue-500 hover:text-blue-600 font-bold cursor-pointer"
          type="button"
        >
          حذف همه
        </button>
      </div>

      {/* brands */}
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

      {/* price */}
      <FilterSection title="محدوده قیمت">
        <div className="space-y-4 px-2">
          <div className="flex justify-between items-center text-xs opacity-70 text-gray-700 dark:text-gray-300">
            <span>از ۱,۰۰۰,۰۰۰</span>
            <span>تومان</span>
          </div>
          <input
            type="range"
            className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
          />
          <div className="flex justify-between items-center text-xs opacity-70 text-gray-700 dark:text-gray-300">
            <span>تا ۵۰,۰۰۰,۰۰۰</span>
            <span>تومان</span>
          </div>
        </div>
      </FilterSection>

      {/* stock */}
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