"use client";

import { useAuth } from "@/store/hooks/useAuth";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { SkeletonCard } from "@/components/ui/Skeletons/Skeletons";

export default function Page() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    order_count: 0,
    ticket_count: 0,
    wallet_balance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/dashboard-stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("خطا در دریافت آمار:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* greeting */}
      <div className="bg-white/70 dark:bg-custom-gray-400/10 p-6 rounded-2xl border border-custom-gray-400 dark:border-custom-gray-400/20">
        <h1 className="text-2xl font-bold ">
          سلام {(user as any)?.user?.name || user?.name || "کاربر عزیز"} 👋
        </h1>
        <p className="text-text-on-light/60 dark:text-text-on-dark/50 mt-2">
          به پنل کاربری خود خوش آمدید.
        </p>
      </div>

      {/* summary cards */}
      {loading ? (
        // sceleton cards
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        // show the real cards when data is loaded
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardCard
            title="سفارشات من"
            value={`${stats.order_count} مورد`}
          />
          <DashboardCard
            title="تیکت‌های فعال"
            value={`${stats.ticket_count} مورد`}
          />
          <DashboardCard
            title="کیف پول"
            value={`${stats.wallet_balance.toLocaleString()} تومان`}
          />
        </div>
      )}
    </div>
  );
}

// cards component
function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white/70 dark:bg-custom-gray-400/10 p-4 rounded-xl border border-custom-gray-400 dark:border-custom-gray-400/20 text-center">
      <p className="text-text-on-light/60 dark:text-text-on-dark/50 text-sm">
        {title}
      </p>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}
