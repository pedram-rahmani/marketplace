"use client";

import ContactAndSocial from "./ContactAndSocial";
import FooterLinks from "./FooterLinks";
import { useSettings } from "@/store/hooks/useSettings";

export default function Footer() {
  const { footerText } = useSettings();

  return (
    <footer className="hidden md:flex mt-5 bg-white dark:bg-[#0f0f12] border-t border-gray-100 dark:border-white/5 py-16">
      <div className="container px-6">
        <ContactAndSocial />
        <FooterLinks />

        <div className="flex flex-col items-center justify-center pt-10 mt-10 border-t border-gray-100 dark:border-white/5">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide">
            {footerText} &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
