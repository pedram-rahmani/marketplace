"use client";

import { useState } from "react";
import { useProduct } from "@/store/hooks/useProduct";

export default function ProductInfoSection() {
  const product = useProduct();

  if (!product) {
    return (
      <div className="text-center text-gray-500">در حال بارگذاری محصول...</div>
    );
  }

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="col-span-full lg:col-span-5 pl-8 text-my-Txt2 dark:text-my-Txt1">
      {/* Product Header */}
      <div>
        <div className="flex items-center gap-x-3">
          <div className="flex items-center justify-center size-12 rounded-full p-1 bg-my-dark2 shadow-inner-dark">
            <img src="/images/logos/verena-logo.png" alt="" />
          </div>
          <div>verena</div>
        </div>
        <h1 className="text-lg mt-2 mb-3">{product.name}</h1>
      </div>

      {/* Rating */}
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            className={`size-5 ${
              product.rate >= index + 1
                ? `fill-my-yellow stroke-my-yellow`
                : `fill-my-gray2 stroke-my-gray3`
            }`}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
        <span className="text-sm ml-2 px-2.5 pt-0.5">54 نظر</span>
      </div>

      {/* Product Price */}
      <div className="flex items-center gap-x-2 text-3xl mt-4 mb-10">
        <svg viewBox="9 0 1 20">
          <text x="0" y="10" fontSize="8">
            تومان
          </text>
        </svg>
        {(product.price ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>

      {/* Product Colors */}
      <div className="[&>div]:inline-flex [&>div]:ml-4 [&>div]:mb-2">
        {product.colors.map((color) => (
          <div
            key={color.name}
            className="flex flex-col items-center gap-y-2 group"
          >
            <div
              className="relative border-2 rounded-full p-0.5"
              style={{ borderColor: color.hex }}
            >
              <div
                className={`w-8 h-8 border-my-light2 dark:border-my-dark3 rounded-full transition-all  cursor-pointer ${
                  selectedColor?.hex === color.hex
                    ? "border-4 dark:border-my-dark3"
                    : ""
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color)}
              ></div>
            </div>
            <span
              className={`text-xs ${
                selectedColor?.hex === color.hex
                  ? "text-my-Txt3 dark:text-my-Txt1 font-semibold underline underline-offset-8"
                  : "text-gray-400 dark:text-my-Txt2"
              }`}
            >
              {color.name}
            </span>
          </div>
        ))}
      </div>

      {/* Product Sizes */}
      <div className="[&>button]:ml-2 space-y-3 mt-8">
        {product.sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => setSelectedSize(size)}
            className={`w-16 h-16 rounded-lg text-lg font-semibold transition-all ${
              selectedSize === size
                ? "bg-my-blue1 text-my-Txt1 dark:shadow-inner-dark"
                : "bg-my-gray1 dark:bg-my-blue4 hover:bg-gray-300 shadow"
            }`}
          >
            {size.name}
          </button>
        ))}
      </div>

      {/* Add to Cart Button */}
      <div className="mt-12">
        <div className="btn-red">
          اضافه کردن به سبد خرید
          <svg viewBox="0 0 24 24">
            <path d="M7 4v2h10V4H7zM5 4H3c-1.1 0-1.99.9-1.99 2L1 20c0 1.1.89 2 1.99 2h18c1.1 0 1.99-.9 1.99-2l.01-14c0-1.1-.89-2-1.99-2h-2v-2H5zM12 15h-2v-2h2v2zm3-5H9V8h6v2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
