"use client";

import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import MessageModal from "@/components/feedback/MessageModal/MessageModal";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  onSuccess: (updatedData: any) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  // استیت‌های مربوط به مدال پیام
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        postal_address: formData.address,
      };

      const res = await axiosInstance.put("/user/profile", payload);
      
      // تنظیم ریسپانس موفقیت (مثلا استاتوس 200 به همراه دیتای برگشتی)
      setApiResponse({
        status: res.status || 200,
        ...res.data
      });
      setMessageModalOpen(true);

      // ارسال دیتای جدید به والد
      onSuccess(payload);
    } catch (err: any) {
      console.error("خطا در ویرایش اطلاعات:", err);
      // ارسال استاتوس کد خطا (مثلا 422 یا 500) و جزئیات ارور
      setApiResponse({
        status: err.response?.status || 500,
        errors: err.response?.data?.errors,
        message: err.response?.data?.message
      });
      setMessageModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 w-full max-w-lg rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              ویرایش اطلاعات حساب کاربری
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              type="button"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="input-info min-w-full"
                placeholder="نام خود را وارد کنید"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                  شماره تماس
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="input-info"
                  placeholder="0912..."
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                  ایمیل
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="input-info"
                  placeholder="example@mail.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                آدرس پستی
              </label>
              <textarea
                rows={3}
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="input-info text-sm resize-none"
                placeholder="آدرس دقیق پستی خود را وارد کنید"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition cursor-pointer"
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white text-xs font-medium rounded-xl transition shadow-lg shadow-violet-600/20 cursor-pointer disabled:opacity-50"
              >
                {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* مدال پیام تایید یا ارور */}
      <MessageModal
        isOpen={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        response={apiResponse}
        onAfterClose={() => {
          // بعد از بسته شدن مدال در صورت موفقیت‌آمیز بودن، مودال اصلی ویرایش هم بسته می‌شود
          if (apiResponse?.status >= 200 && apiResponse?.status < 300) {
            onClose();
          }
        }}
      />
    </>
  );
}