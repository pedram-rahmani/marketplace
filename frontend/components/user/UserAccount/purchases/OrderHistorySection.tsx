"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import OrderTabs from "./OrderTabs";
import CurrentOrders from "./current/CurrentOrders";
import DeliveredOrders from "./delivered/DeliveredOrders";
import ReturnedOrders from "./returned/ReturnedOrders";
import CancelledOrders from "./cancelled/CancelledOrders";

const tabs = [
  { id: "current", label: "جاری", count: 0 },
  { id: "delivered", label: "تحویل شده", count: 9 },
  { id: "returned", label: "مرجوع شده", count: 3 },
  { id: "cancelled", label: "لغو شده", count: 3 },
];

export default function OrderHistorySection() {
  const [activeTab, setActiveTab] = useState("current");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/user/orders`, {
          params: { status: activeTab },
        });

        if (response.data.status === "success") {
          setOrders(response.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "current":
        return <CurrentOrders orders={orders} />;
      case "delivered":
        return (
          <DeliveredOrders
            orders={orders}
            onViewInvoice={(code) => alert(`مشاهده فاکتور سفارش ${code}`)}
          />
        );
      case "returned":
        return <ReturnedOrders orders={orders} />;
      case "cancelled":
        return <CancelledOrders orders={orders} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">

      <div className="bg-white dark:bg-ui-blue-900 rounded-2xl border border-gray-100 dark:border-white/5 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <h2 className="font-bold text-lg text-text-on-light dark:text-white">
          تاریخچه سفارشات
        </h2>
        <OrderTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
}