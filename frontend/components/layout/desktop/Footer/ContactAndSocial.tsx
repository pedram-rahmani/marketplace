"use client";

import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/store/hooks/useSettings";
import { ICONS } from "./SocialIcons";

export default function ContactAndSocial() {
  const { logoUrl, siteName, socialLinks, contactInfo } = useSettings();

  return (
    <div className="pb-5 mb-5 sm:pb-8 sm:mb-8 border-b border-gray-200 dark:border-b-white/10">
      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="relative flex items-center h-10 w-32 md:w-24">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={siteName}
              fill
              unoptimized
              priority
              className="object-contain object-right"
            />
          ) : (
            <span className="text-lg tracking-wider text-my-Txt2 dark:text-my-Txt1">
              {siteName}
            </span>
          )}
        </Link>

        {/* Social Media Links */}
        <div className="flex gap-x-3 [&>a]:flex [&>a]:items-center [&>a]:justify-center [&>a]:w-6 [&>a]:h-6 [&>a_svg]:w-full [&>a_svg]:h-full [&>a_svg]:block">
          {socialLinks.map((social, index) => {
            const icon = ICONS[social.name.toLowerCase()] || ICONS.default;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ui-blue-300 duration-200"
              >
                {icon}
              </a>
            );
          })}
        </div>
      </div>

      {/* Contact Info Links */}
      <div className="flex items-center flex-wrap gap-y-4 gap-x-12 mt-8">
        {contactInfo.map((contact, index) => {
          const icon = ICONS[contact.type.toLowerCase()] || ICONS.default;
          return (
            <a
              key={index}
              href={contact.href}
              className="flex items-center gap-x-2 text-sm dark:text-neutral-300 hover:text-ui-red-400 duration-200"
            >
              <div className="flex items-center w-5! h-5! shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:block">
                {icon}
              </div>
              <span>{contact.value}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}