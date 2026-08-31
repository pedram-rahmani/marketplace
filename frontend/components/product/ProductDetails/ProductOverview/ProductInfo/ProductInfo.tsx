"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slices/cartSlice";
import ProductGuarantee from "../ProductGuarantee/ProductGuarantee";
import { Product, ProductOption } from "@/types/product";

export default function ProductInfo({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);

  // Dynamic state for options (e.g. { "اندازه صفحه": "42mm", "حافظه": "128GB" })
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initialOptions: Record<string, string> = {};
    product?.options?.forEach((opt: ProductOption) => {
      if (opt.items && opt.items.length > 0) {
        initialOptions[opt.title] = opt.items[0];
      }
    });
    return initialOptions;
  });

  // Default warranty
  const defaultWarranty =
    product?.warranties?.find((w: any) => w.pivot?.is_default) ||
    product?.warranties?.[0];

  const [selectedWarranty, setSelectedWarranty] = useState<any>(defaultWarranty);
  const [isAdding, setIsAdding] = useState(false);

  // Final price calculation
  const basePrice = Number(product?.price || 0);
  const warrantyPrice = Number(selectedWarranty?.pivot?.price || 0);
  const totalPrice = basePrice + warrantyPrice;

  const handleOptionSelect = (title: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    
    dispatch(
      addItem({
        product,
        color: selectedColor || null,
        options: selectedOptions,
        warranty: selectedWarranty || null,
        totalPrice,
      })
    );

    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="flex flex-col gap-6 p-8 bg-white/80 dark:bg-dark-700/70 rounded-3xl border border-white/10 shadow-2xl">
      {/* Product Title */}
      <h1 className="text-2xl font-bold text-text-on-light/80 dark:text-text-on-dark/90 tracking-tighter">
        {product?.name}
      </h1>

      {/* Total Price */}
      <div className="text-xl font-bold text-cyan-400">
        {totalPrice.toLocaleString()}
        <span className="text-sm text-gray-500 mr-2">تومان</span>
      </div>

      {/* Colors */}
      {product?.colors && product.colors.length > 0 && (
        <div className="py-4 border-y border-white/5">
          <p className="text-gray-400 mb-3 text-xs uppercase tracking-widest">
            رنگ: {selectedColor?.name}
          </p>
          <div className="flex gap-3">
            {product.colors.map((color: any) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`w-9 h-9 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  selectedColor?.id === color.id
                    ? "border-cyan-400 scale-110 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColor?.id === color.id && (
                  <svg viewBox="0 0 24 24" fill="none" className="size-4 text-white">
                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2"></polyline>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Guarantee */}
      <ProductGuarantee
        warranties={product?.warranties}
        onSelectWarranty={(warranty) => setSelectedWarranty(warranty)}
      />

      {/* Dynamic Options (Size, Storage, Screen Size, etc.) */}
      {product?.options && product.options.length > 0 && (
        <div className="space-y-4">
          {product.options.map((option: ProductOption) => (
            <div key={option.title}>
              <p className="text-gray-400 mb-3 text-xs uppercase tracking-widest">
                {option.title}
              </p>
              <div className="flex flex-wrap gap-3">
                {option.items?.map((item: string) => {
                  const isSelected = selectedOptions[option.title] === item;
                  return (
                    <button
                      key={item}
                      onClick={() => handleOptionSelect(option.title, item)}
                      className={`px-6 py-2 rounded-xl border transition-all text-sm font-semibold ${
                        isSelected
                          ? "bg-white/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                          : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Purchase Button */}
      <button
        onClick={handleAddToCart}
        className="w-full py-4 mt-2 bg-linear-to-r from-cyan-500 to-blue-600 rounded-2xl text-white font-bold text-lg shadow-[0_0_25px_-5px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_-5px_rgba(6,182,212,0.8)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {isAdding ? "در حال افزودن..." : "افزودن به سبد خرید"}
      </button>
    </div>
  );
}