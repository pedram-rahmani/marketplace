"use client";

import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import useTheme from "@/store/hooks/useTheme";
import useClickOutside from "@/store/hooks/useClickOutside";
import BasketModal from "@/components/cart/BasketModal/BasketModal";
import Link from "next/link";

export default function Header() {
  const [theme, toggleTheme] = useTheme();
  const [showBasket, setShowBasket] = useState(false);
  const pathname = usePathname();

  const basketRef = useRef<HTMLDivElement>(null!);

 
  useClickOutside(() => setShowBasket(false), [basketRef]);

  const getPageTitle = () => {
    if (pathname.includes("purchases")) return "خریدهای من";
    if (pathname.includes("settings")) return "تنظیمات حساب";
    if (pathname.includes("support")) return "پشتیبانی";
    return "پنل کاربری";
  };

  return (
    <div className="header flex items-center justify-between py-5 px-4 sm:px-8 mb-5 md:mb-8 border-b border-gray-100 dark:border-white/5">
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          {getPageTitle()}
        </h1>
        <p className="text-xs text-gray-400 mt-1">مدیریت حساب کاربری شخصی</p>
      </div>

      <div className="flex gap-x-4">
        {/* Toggle Theme */}
        <div className="h-btn cursor-pointer" onClick={toggleTheme}>
          <svg className={`w-6 h-6 ${theme === "dark" ? "hidden" : "inline"}`}>
            <path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
          <svg className={`w-6 h-6 ${theme === "dark" ? "inline" : "hidden"}`}>
            <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        </div>

        {/* Basket Container */}
        <div className="relative h-btn" ref={basketRef}>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setShowBasket((prev) => !prev)}
          >
            <svg className="w-6 h-6">
              <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </button>
          
          <BasketModal showBasket={showBasket} />
        </div>

        <Link href="/" className="h-btn">
          <svg viewBox="0 0 24 24">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}