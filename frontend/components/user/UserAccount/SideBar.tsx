"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { useAppDispatch } from "@/store/hooks/storeHooks";
import { useAuth } from "@/store/hooks/useAuth";
import { logoutUser } from "@/store/slices/authSlice";
import axiosInstance from "@/lib/axiosInstance";

import useDate from "@/store/hooks/useDate";

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // Destructure user and token from auth hook
  const { user, token } = useAuth();
const userRole = (user as any)?.user?.role || user?.role;

  const sideBarItems = [
    // --- Admin Section Start ---
    {
      link: "/my-account/user-management",
      label: "مدیریت کاربران",
      isAdmin: true, // Only visible to admin
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"
          />
        </svg>
      ),
    },
    {
      link: "/my-account/product-management",
      label: "مدیریت محصولات",
      isAdmin: true, // Only visible to admin
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5">
          <path
            fill="currentColor"
            d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6h-4v-4h4v4z"
          />
        </svg>
      ),
    },
    {
      link: "/my-account/site-management",
      label: "تنظیمات عمومی سایت",
      isAdmin: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    // --- Admin Section End ---

    {
      link: "/my-account",
      label: "پنل کاربری",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
    },
    {
      link: "/my-account/purchases",
      label: "خریدهای من",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      link: "/my-account/support",
      label: "پشتیبانی",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
      ),
    },
    {
      link: "/my-account/settings",
      label: "تنظیمات حساب", // 👈 برای همه کاربران (تغییر نام، رمز عبور و...)
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      ),
    },
  ];

  const currentDate = useDate(new Date(), "long");

  // Determine if a link is currently active
  const isActive = (link: string) => {
    if (link === "/my-account") return pathname === link;
    return pathname.startsWith(link);
  };

  // Logic to hide admin links from regular users
const filteredItems = sideBarItems.filter((item) => {
  if (item.isAdmin && userRole?.toLowerCase() !== "admin") return false;
  return true;
});

  const handleLogout = async () => {
    try {
      await axiosInstance.post(
        "/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      dispatch(logoutUser());
      router.push("/");
    }
  };

  return (
    <aside className="fixed right-0 bottom-0 top-0 w-67 flex flex-col shrink-0 bg-white dark:bg-ui-blue-900 py-4 z-50 transition-all shadow-lg border-l border-gray-100 dark:border-white/5">
      {/* Profile Summary Card */}
      <div className="mx-6 bg-violet-600 text-white rounded-2xl px-4 py-5 shadow-xl shadow-violet-500/20 mb-8 text-center">
        <span className="flex items-center justify-center font-bold truncate">
          {(user as any)?.user?.username || user?.username || "کاربر مهمان"}
        </span>
        <span className="text-xs mt-2 block opacity-80">{currentDate}</span>
      </div>

      {/* Dynamic Navigation Menu */}
      <nav className="account-nav flex-1 overflow-y-auto px-4 space-y-1">
        {filteredItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
              isActive(item.link)
                ? "bg-violet-500/10 text-violet-500 font-bold"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-x-3">
              <span
                className={
                  isActive(item.link)
                    ? "text-violet-500"
                    : "text-gray-400 group-hover:text-violet-500"
                }
              >
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </div>
            {isActive(item.link) && (
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
            )}
          </Link>
        ))}
      </nav>

      {/* Logout Action */}
      <div className="px-4 mt-auto pt-4 border-t border-gray-200 dark:border-white/5">
        <button
          className="w-full flex items-center gap-x-3 px-4 py-4 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-bold text-sm cursor-pointer"
          onClick={handleLogout}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="currentColor"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
          خروج از حساب
        </button>
      </div>
    </aside>
  );
}