"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MegaMenu from "./MegaMenu";
import { Category } from "@/types/category";
import { useAppDispatch } from "@/store/hooks/storeHooks";
import { fetchSettings } from "@/store/slices/settingSlice";
import useLockBodyScroll from "@/store/hooks/useLockBodyScroll";
import { useSettings } from "@/store/hooks/useSettings";
import { BaseSkeleton } from "@/components/ui/Skeletons/Skeletons";

interface NavbarProps {
  menuItems: Category[];
}

export default function Navbar({ menuItems }: NavbarProps) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useAppDispatch();

  const { logoUrl: cleanLogoUrl, siteName, loading, rawSettings } = useSettings();

  useLockBodyScroll(showMenu);

  const handleMouseEnter = useCallback(() => setShowMenu(true), []);
  const handleMouseLeave = useCallback(() => setShowMenu(false), []);

  useEffect(() => {
    if (!rawSettings || Object.keys(rawSettings).length === 0) {
      if (!loading) {
        dispatch(fetchSettings());
      }
    }
  }, [dispatch, rawSettings, loading]);

  const logoSrc = cleanLogoUrl ? (cleanLogoUrl.startsWith('http') ? cleanLogoUrl : `http://127.0.0.1:8000/storage/${cleanLogoUrl}`) : null;

  return (
    <nav className="flex items-center w-full relative md:px-4 grow gap-x-5">
      {/* Logo Section */}
      <Link
        href="/"
        className="relative flex items-center h-10 w-32 md:w-28 md:h-12 transition-transform active:scale-95"
      >
        {loading ? (
          <BaseSkeleton className="w-full h-8" />
        ) : logoSrc ? (
          <Image
            key={logoSrc}
            src={logoSrc}
            alt={siteName || "Logo"}
            fill
            priority
            unoptimized
            className="object-contain object-center"
          />
        ) : (
          <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
            {siteName}
          </span>
        )}
      </Link>

      {/* Overlay */}
      {showMenu && (
        <div className="fixed h-screen w-screen inset-0 top-full bg-dark-600/80 backdrop-blur-sm z-40 transition-all duration-300"></div>
      )}

      {/* Navigation Links */}
      <div className={`flex items-center relative text-text-on-light dark:text-text-on-dark gap-x-1 ${!showMenu ? "overflow-hidden" : ""}`}>
        <div onMouseLeave={handleMouseLeave} className="relative py-4">
          <div
            className="group flex items-center gap-x-2 font-bold cursor-pointer px-3"
            onMouseEnter={handleMouseEnter}
          >
            <svg
              className={`size-5 transition-colors ${showMenu ? "text-green-500" : "group-hover:text-green-500"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className={`text-sm transition-colors ${showMenu ? "text-green-500" : "group-hover:text-green-500"}`}>
              دسته‌بندی کالاها
            </span>
          </div>

          <div className="absolute right-0 top-full pt-5 z-50">
            <MegaMenu showMenu={showMenu} menuItems={menuItems} />
          </div>
        </div>

        <div className="w-px h-4 bg-gray-300 dark:bg-white/10 mx-2"></div>

        {/* Strategic Links */}
        <div className="flex items-center [&>a]:px-3 [&>a]:text-sm [&>a]:transition-all [&>a]:py-2">
          <Link href="/products" className="hover:text-green-500 flex items-center gap-1">
            همه محصولات
          </Link>
          <Link href="/offers" className="hover:text-red-500 flex items-center gap-1 group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            شگفت‌انگیزها
          </Link>
          <Link href="/seller-panel" className="hover:text-green-500">
            فروشنده شوید
          </Link>
          <Link href="/faq" className="text-gray-500 dark:text-gray-400 hover:text-white">
            سوالی دارید؟
          </Link>
        </div>
      </div>
    </nav>
  );
}