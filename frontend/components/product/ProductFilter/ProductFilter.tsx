"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FilterContent from "./FilterContent";
import useLockBodyScroll from "@/store/hooks/useLockBodyScroll";

interface ProductFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductFilter({ isOpen, onClose }: ProductFilterProps) {
  useLockBodyScroll(isOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) {
    return (
      <aside className="hidden md:block bg-white dark:bg-dark-600/50 backdrop-blur-xl border min-w-56 border-gray-200 dark:border-white/5 p-5 shadow-sm sticky top-24 rounded-2xl">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-white/10 pb-4">
          <h2 className="font-extrabold text-lg text-gray-900/70 dark:text-white">
            فیلترها
          </h2>
          <button
            className="text-xs text-blue-500 hover:text-blue-600 font-bold cursor-pointer"
            type="button"
          >
            حذف همه
          </button>
        </div>
        <FilterContent />
      </aside>
    );
  }

  return (
    <>
      {/* desktop filter (sidebar) */}
      <aside className="hidden md:block bg-white dark:bg-dark-600/50 backdrop-blur-xl border min-w-56 border-gray-200 dark:border-white/5 p-5 shadow-sm sticky top-24 rounded-2xl">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-white/10 pb-4">
          <h2 className="font-extrabold text-lg text-gray-900 dark:text-white">
            فیلترها
          </h2>
          <button
            className="text-xs text-blue-500 hover:text-blue-600 font-bold cursor-pointer"
            type="button"
          >
            حذف همه
          </button>
        </div>
        <FilterContent />
      </aside>

      {/* mobile filter (modal) */}
      {createPortal(
        <div className="fixed inset-0 z-999999 md:hidden flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="relative w-full max-w-sm max-h-[82vh] bg-white dark:bg-dark-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/10 z-10">
            {/* modal header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/10 shrink-0 bg-white dark:bg-dark-700">
              <h2 className="font-extrabold text-base text-gray-900 dark:text-white">
                فیلترها
              </h2>
              <div className="flex items-center gap-4">
                <button
                  className="text-xs text-blue-500 hover:text-blue-600 font-bold cursor-pointer"
                  type="button"
                >
                  حذف همه
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 p-1 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="size-4!">
                    <path d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <FilterContent />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
