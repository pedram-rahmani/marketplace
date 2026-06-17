"use client";

import { useState } from "react";
import NavItem from "./NavItem";
import { menus } from "@/Data/menu";
import { MenuItem } from "@/types/menu";

export default function Footer() {
  const [activeLabel, setActiveLabel] = useState("خانه");

  const items: MenuItem[] = menus.mobile;

  return (
    <div className="md:hidden fixed w-full bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
      <div className="absolute bottom-0 left-0 w-full h-6 bg-linear-to-t from-black/70 to-transparent pointer-events-none z-0" />

      <nav className="relative flex mb-1 justify-between items-center bg-white/90 dark:bg-dark-700 border border-light dark:border-dark-600 rounded-full px-1 py-1 shadow-lg backdrop-blur-sm w-90 sm:w-110! [&_svg]:size-5! z-10">
        {items.map((item) => (
          <NavItem
            key={item.label} // TS-safe و React key
            label={item.label}
            icon={item.icon}
            active={activeLabel === item.label}
            onClick={() => setActiveLabel(item.label)}
          />
        ))}
      </nav>
    </div>
  );
}
