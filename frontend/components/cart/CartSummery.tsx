"use client";

import { CartSummaryProps } from "@/types/cart";

export default function CartSummary({ totalPrice, totalDiscount = 0, onCheckout }: CartSummaryProps) {
  const finalPrice = totalPrice - totalDiscount;

  return (
    <div className="bg-white dark:bg-ui-blue-900 p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm space-y-4">
      <h3 className="font-bold text-base text-text-on-light dark:text-white border-b border-gray-100 dark:border-white/5 pb-3">
        خلاصه سفارش
      </h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-500 dark:text-gray-400">
          <span>مبلغ کل محصولات</span>
          <span>{totalPrice.toLocaleString()} تومان</span>
        </div>
        {totalDiscount > 0 && (
          <div className="flex justify-between text-rose-500">
            <span>مبلغ تخفیف</span>
            <span>{totalDiscount.toLocaleString()} تومان</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-base text-text-on-light dark:text-white pt-3 border-t border-gray-100 dark:border-white/5">
          <span>مبلغ قابل پرداخت</span>
          <span>{finalPrice.toLocaleString()} تومان</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-violet-500/20 cursor-pointer"
      >
        ادامه فرایند خرید
      </button>
    </div>
  );
}