import { ReactNode } from "react";

export interface NavItemType {
  label: string;
  href?: string;
  icon: {
    default: ReactNode;
    active: ReactNode;
  };
}

export const mobileNavItems: NavItemType[] = [
  {
    label: "خانه",
    href: "/",
    icon: {
      default: (
        <svg viewBox="0 0 24 24" className="size-5">
          <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      active: (
        <svg viewBox="0 0 24 24" className="size-5 fill-current!">
          <path d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" />
        </svg>
      ),
    },
  },
  {
    label: "دسته‌بندی",
    href: "/categories",
    icon: {
      default: (
        <svg viewBox="0 0 24 24" className="size-5">
          <rect x="3" y="2" width="6" height="6" />
          <rect x="13" y="2" width="6" height="6" />
          <rect x="3" y="13" width="6" height="6" />
          <rect x="13" y="13" width="6" height="6" />
        </svg>
      ),
      active: (
        <svg viewBox="0 0 24 24" className="size-5 fill-current!">
          <rect x="3" y="2" width="6" height="6" />
          <rect x="13" y="2" width="6" height="6" />
          <rect x="3" y="13" width="6" height="6" />
          <rect x="13" y="13" width="6" height="6" />
        </svg>
      ),
    },
  },
  {
    label: "پیام‌ها",
    href: "/messages",
    icon: {
      default: (
        <svg viewBox="0 0 24 24" className="size-5">
          <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      ),
      active: (
        <svg viewBox="0 0 24 24" className="size-5 fill-current!">
          <path d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" />
        </svg>
      ),
    },
  },
  {
    label: "پروفایل",
    href: "/profile",
    icon: {
      default: (
        <svg viewBox="0 0 24 24" className="size-5">
          <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      active: (
        <svg viewBox="0 0 24 24" className="size-5 fill-current!">
          <path d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
        </svg>
      ),
    },
  },
];