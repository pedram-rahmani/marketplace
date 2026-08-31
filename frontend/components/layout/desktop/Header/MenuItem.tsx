"use client";

import { Category } from "@/types/category";
import Link from "next/link";
import { useRef, useEffect, memo } from "react";

interface MenuItemProps {
  item: Category;
  onHover?: () => void;
  isActive: boolean;
  isLastLevel: boolean;
  menuItems: Category[];
  maxLevel: number;
}

const MenuItem = ({
  item,
  onHover,
  isActive,
  isLastLevel,
  menuItems,
  maxLevel,
}: MenuItemProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const hasChildren = menuItems.some(
    (menuItem) => menuItem.parent_id === item.id,
  );

  const childCount = menuItems.filter(
    (menuItem) => menuItem.parent_id === item.id,
  ).length;

  let href = "#";
  if (item.parent_id === null) {
    href =
      maxLevel === 2
        ? `/search/category-${item.name}`
        : `/search/${item.name}`;
  } else if (childCount > 0) {
    href = `/search/category-${item.id}`;
  } else {
    href = `/product-info/${item.id}/${item.name}`;
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (onHover) onHover();
    }, 100);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <li
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={href}
        className={`
          flex items-center justify-between w-full px-4 py-3 text-sm transition-all duration-200
          ${
            isActive
              ? "text-sky-500 bg-sky-500/10 border-r-4 shadow-sm border-sky-500 font-medium"
              : "text-text-on-light/90 dark:text-text-on-dark/90 border-r-4 border-transparent hover:text-sky-500 "
          }
        `}
      >
        {item.name}
        {hasChildren && !isLastLevel && <ArrowIcon isActive={isActive} />}
      </Link>
    </li>
  );
};

export default memo(MenuItem);

const ArrowIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`size-4! transition-transform duration-200 ${isActive ? "rotate-90" : "rotate-0"}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);