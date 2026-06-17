"use client";

import Link from "next/link";
import { useSettings } from "@/store/hooks/useSettings";

export default function FooterLinks() {
  const { footerLinks, trustBadges } = useSettings();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 rtl">
      {/* Footer Link Groups */}
      {footerLinks?.map((group, index) => (
        <div key={index} className="flex flex-col gap-y-4">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {group.title}
          </span>
          <div className="flex flex-col gap-y-3 text-sm text-gray-500 dark:text-gray-400">
            {group.items?.map((link, linkIndex) => (
              <Link
                key={linkIndex}
                href={link.url || "#"}
                className="hover:text-violet-500 hover:-translate-x-1 transition-all duration-300 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Trust Badges Container (Enamad / Samandehi) */}
      <div className="col-span-2 lg:col-span-2 flex justify-center lg:justify-end">
        <div 
          className="size-32 rounded-2xl border border-custom-gray-200 dark:border-custom-gray-400/30 bg-light dark:bg-dark-800/60 backdrop-blur-sm p-4 flex items-center justify-center hover:scale-105 transition-transform duration-300 [&>a]:w-full [&>a]:h-full [&>a]:flex [&>a]:items-center [&>a]:justify-center [&_img]:object-contain [&_img]:max-h-full"
          dangerouslySetInnerHTML={{ __html: trustBadges || "" }}
        />
      </div>
    </div>
  );
}