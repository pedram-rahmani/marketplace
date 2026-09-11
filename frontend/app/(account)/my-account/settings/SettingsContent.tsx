"use client";

import { useState } from "react";
import SecuritySettings from "@/components/user/UserAccount/settings/SecuritySettings";
import NotificationSettings from "@/components/user/UserAccount/settings/NotificationSettings";
import ActiveSessions from "@/components/user/UserAccount/settings/ActiveSessions";

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState("security");

  return (
    <div className="p-6 text-white max-w-4xl mx-auto" dir="rtl">
      {/* tabs */}
      <div className="flex border-b border-custom-gray-200 dark:border-custom-gray-400/30 mb-6 gap-6">
        <button
          onClick={() => setActiveTab("security")}
          className={`pb-3 border-b-2 font-medium transition cursor-pointer ${
            activeTab === "security"
              ? "border-purple-500 text-purple-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          امنیت و رمز عبور
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`pb-3 border-b-2 font-medium transition cursor-pointer ${
            activeTab === "notifications"
              ? "border-purple-500 text-purple-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          تنظیمات اعلان‌ها
        </button>
        <button
          onClick={() => setActiveTab("sessions")}
          className={`pb-3 border-b-2 font-medium transition cursor-pointer ${
            activeTab === "sessions"
              ? "border-purple-500 text-purple-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          نشست‌های فعال
        </button>
      </div>

      <div className="bg-light/50 dark:bg-dark-700/30 p-6 mb-6 rounded-2xl border border-custom-gray-200 dark:border-custom-gray-400/20">
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "sessions" && <ActiveSessions />}
      </div>
    </div>
  );
}
