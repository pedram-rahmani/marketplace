"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import OrderTabs from "@/components/user/UserAccount/purchases/OrderTabs";
import CurrentOrders from "@/components/user/UserAccount/purchases/current/CurrentOrders";
import DeliveredOrders from "@/components/user/UserAccount/purchases/delivered/DeliveredOrders";
import ReturnedOrders from "@/components/user/UserAccount/purchases/returned/ReturnedOrders";
import CancelledOrders from "@/components/user/UserAccount/purchases/cancelled/CancelledOrders";

const tabs = [
  { id: "current", label: "جاری", count: 0 },
  { id: "delivered", label: "تحویل شده", count: 1 },
  { id: "returned", label: "مرجوع شده", count: 0 },
  { id: "cancelled", label: "لغو شده", count: 0 },
];

export default function PurchasesContent() {
  const [activeTab, setActiveTab] = useState("delivered");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        // استفاده از axiosInstance به جای fetch ساده
        const response = await axiosInstance.get(`/user/orders`, {
          params: { status: activeTab },
        });

        // در آکسیوس داده‌ها به صورت خودکار در response.data قرار دارند
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
      {/* هدر بخش و تب‌ها */}
      <div className="bg-white dark:bg-ui-blue-900 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-bold text-lg text-text-on-light dark:text-white">تاریخچه سفارشات</h2>
        <OrderTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* محتوا بر اساس تب انتخاب شده */}
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