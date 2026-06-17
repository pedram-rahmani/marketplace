"use client";

import { DBMenuItem } from "@/types/dbMenu";
import Link from "next/link";
import { ReactNode, useRef, useEffect, memo } from "react";

interface MenuItemProps {
  item: DBMenuItem;
  onHover?: () => void;
  isActive: boolean;
  isLastLevel: boolean;
  menuItems: DBMenuItem[];
  children?: ReactNode;
  maxLevel: number;
}

const MenuItem = ({
  item,
  onHover,
  isActive,
  isLastLevel,
  menuItems,
  children,
  maxLevel,
}: MenuItemProps) => {
  // Ref to store the timeout ID for hover delay management
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const hasChildren = menuItems.some(
    (menuItem) => menuItem.parent_id === item.id
  );
  
  const childCount = menuItems.filter(
    (menuItem) => menuItem.parent_id === item.id
  ).length;

  // Calculate href based on category level and children count
  let href = "#";
  if (item.parent_id === null) {
    href = maxLevel === 2
        ? `/search/category-${item.name}`
        : `/landing/${item.name}`;
  } else if (childCount > 0) {
    href = `/search/category-${item.id}`;
  } else {
    href = `/product-info/${item.id}/${item.name}`;
  }

  // Handle mouse enter with a short 100ms debounce delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (onHover) onHover();
    }, 100);
  };

  // Cancel the pending hover action if the mouse leaves before delay ends
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Inside your MenuItem return statement:

return (
  <li 
    className="group h-10 relative" // Added relative for positioning safety
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <Link
      href={href}
      className={`nav-menu-it-a ${isActive ? "active-menu" : ""}`}
    >
      {item.name}
      {hasChildren && !isLastLevel &&  <ArrowIcon isActive={isActive} />}
    </Link>

    {/* Wrapper for the sub-menu with subtle animation */}
    {isActive && children && (
      <div className="absolute top-full left-0 animate-[menu-entry]">
        {children}
      </div>
    )}
  </li>
);
};

// Use memo to prevent unnecessary re-renders in large menu lists
export default memo(MenuItem);

interface ArrowIconProps {
  isActive: boolean;
}

const ArrowIcon = ({ isActive }: ArrowIconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={`size-3.5! ${isActive ? "rotate-90 transition-all duration-200" : ""}`}
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);