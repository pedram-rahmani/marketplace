import React, { forwardRef } from "react";

interface BasketModalProps {
  showBasket: boolean;
}

const BasketModal = forwardRef<HTMLDivElement, BasketModalProps>(
  ({ showBasket }, ref) => {
    return (
      <>
        {/* Cart Icon Badge (Keep this in your Navbar) */}
        <div className="absolute -top-1 -right-1 text-[10px] flex items-center justify-center size-5 border-2 border-white dark:border-[#16161a] rounded-full bg-violet-600 text-white font-bold">
          0
        </div>

        {/* Basket Modal Container */}
        <div
          ref={ref}
          className={`absolute left-0 top-full pt-4 z-50 transition-all duration-300 origin-top ${
            showBasket
              ? "opacity-100 visible translate-y-0 scale-100"
              : "opacity-0 invisible -translate-y-2 scale-95"
          }`}
        >
          {/* triangle */}
          <div className="absolute top-2.5 left-5 w-3 h-3 bg-white/95 dark:bg-[#202327] border-t border-l border-gray-200 dark:border-white/5 rotate-45 z-10"></div>

          {/* Modal Body */}
          <div className="relative w-80 bg-white/95 dark:bg-[#16161a]/95 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
              <span className="font-bold text-gray-800 dark:text-white">
                سبد خرید من
              </span>
              <span className="text-xs bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 px-2 py-1 rounded-md font-medium">
                0 مورد
              </span>
            </div>

            {/* Empty Basket State */}
            <div className="py-10 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
              <svg
                className="w-12 h-12 mb-3 opacity-20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="text-sm">سبد خرید شما خالیست</span>
            </div>
          </div>
        </div>
      </>
    );
  },
);

BasketModal.displayName = "BasketModal";

export default BasketModal;
