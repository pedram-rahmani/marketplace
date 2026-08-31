"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeItem } from "@/store/slices/cartSlice";
import QuantityController from "@/components/cart/QuantityController";

export default function CartSection() {
  const router = useRouter();
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.cart.items);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.totalPrice * item.quantity,
    0,
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>سبد خرید شما خالی است.</p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-all shadow-lg shadow-violet-600/25"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 space-y-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          سبد خرید ({totalQuantity} کالا)
        </p>
        {items.map((item) => (
          <div
            key={item.cartId}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-xl flex items-center justify-between gap-4 shadow-sm dark:shadow-none transition-colors"
          >
            <div>
              {/* Link to product-page */}
              <Link
                href={`/products/${item.product.slug}`}
                className="text-gray-800 dark:text-white font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors block"
              >
                {item.product.name}
              </Link>
              {item.color && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  رنگ: {item.color.name}
                </p>
              )}
              {item.warranty && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  گارانتی: {item.warranty.title}
                </p>
              )}
              <p className="text-violet-600 dark:text-violet-400 text-sm font-semibold mt-2">
                {item.totalPrice.toLocaleString()} تومان
              </p>
            </div>

            <div className="flex items-center gap-4">
              <QuantityController
                cartId={item.cartId}
                quantity={item.quantity}
              />

              <button
                onClick={() => dispatch(removeItem(item.cartId))}
                className="text-red-500 hover:text-red-600 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                type="button"
                title="حذف کالا"
              >
                <svg viewBox="0 0 24 24" className="size-4.5! fill-current!">
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.562 1.215-2.91 2.77-3.049a52.936 52.936 0 013.26 0c1.555.139 2.77 1.486 2.77 3.049zm-6.26-1.86a55.634 55.634 0 013.018 0c1.01.09 1.791.917 1.791 1.99v2.16a49.376 49.376 0 00-6.6 0v-2.16c0-1.073.78-1.9 1.79-1.9z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl space-y-4 shadow-sm dark:shadow-none">
        <h3 className="text-gray-800 dark:text-white font-bold text-lg border-b border-gray-100 dark:border-gray-800 pb-3">
          خلاصه سفارش
        </h3>
        <div className="flex justify-between items-center text-gray-800 dark:text-white font-bold">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            مبلغ قابل پرداخت
          </span>
          <span className="text-violet-600 dark:text-violet-400">
            {totalPrice.toLocaleString()} تومان
          </span>
        </div>
        <button
          onClick={() => router.push("/checkout")}
          className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition shadow-lg shadow-violet-600/25 cursor-pointer"
          type="button"
        >
          ادامه فرایند خرید
        </button>
      </div>
    </div>
  );
}
