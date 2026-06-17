"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import HeaderActions from "./HeaderActions";
import { DBMenuItem } from "@/types/dbMenu";

interface HeaderProps {
  menuItems: DBMenuItem[];
}

export default function Header({ menuItems }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`header ${isScrolled ? "sticky-header" : ""}`}
    >
      <div className="hidden md:flex items-center justify-between mx-auto max-w-480 h-24 px-4 lg:px-12 transition-all">
        <Navbar menuItems={menuItems} />
        <HeaderActions />
      </div>
    </header>
  );
}