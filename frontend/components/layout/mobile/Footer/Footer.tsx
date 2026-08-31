"use client";

import { useState } from "react";
import NavItem from "./NavItem";
import { mobileNavItems } from "./nav.config";

export default function Footer() {
  const [activeLabel, setActiveLabel] = useState("خانه");

  return (
    <div className="lg:hidden fixed w-full bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-50">
      <div className="absolute bottom-0 left-0 w-full h-9 bg-linear-to-t from-dark-700/40 to-transparent dark:from-dark-700 dark:to-transparent pointer-events-none z-0" />

      <nav className="relative flex mb-1 justify-between items-center bg-light dark:bg-dark-700 border border-white/26 dark:border-dark-600 rounded-full px-2 py-1.5 shadow-2xl backdrop-blur-md w-90 sm:w-110 [&_svg]:size-5 z-10">
        {mobileNavItems.map((item) => (
          <NavItem
            key={item.label}
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