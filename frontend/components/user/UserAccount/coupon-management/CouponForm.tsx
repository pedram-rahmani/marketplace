"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Select from "@/components/ui/Form/Select";
import Checkbox from "@/components/ui/Form/Checkbox";
import axiosInstance from "@/lib/axiosInstance";
import useLockBodyScroll from "@/store/hooks/useLockBodyScroll";
import { toGregorian, toJalaali } from "jalaali-js";

interface CouponFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingCoupon: any | null;
  setPopup: (popup: {
    isOpen: boolean;
    message: string;
    type: "success" | "error";
  }) => void;
}

export default function CouponForm({
  isOpen,
  onClose,
  onSuccess,
  editingCoupon,
  setPopup,
}: CouponFormProps) {
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [displayDate, setDisplayDate] = useState("");

  const [form, setForm] = useState({
    code: "",
    type: "percent",
    value: "",
    min_order_price: "",
    max_discount: "",
    usage_limit: "",
    expires_at: "",
    user_id: "",
    is_active: false,
  });

  useLockBodyScroll(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (editingCoupon) {
      const assignedUserId =
        editingCoupon.users && editingCoupon.users.length > 0
          ? editingCoupon.users[0].id
          : editingCoupon.user_id || "";

      setForm({
        code: editingCoupon.code || "",
        type: editingCoupon.type || "percent",
        value: editingCoupon.value || "",
        min_order_price: editingCoupon.min_order_price || "",
        max_discount: editingCoupon.max_discount || "",
        usage_limit: editingCoupon.usage_limit || "",
        expires_at: editingCoupon.expires_at
          ? editingCoupon.expires_at.split("T")[0]
          : "",
        user_id: assignedUserId,
        is_active: Boolean(editingCoupon.is_active),
      });

      if (editingCoupon.expires_at) {
        const parts = editingCoupon.expires_at.split("T")[0].split("-");
        if (parts.length === 3) {
          const gy = parseInt(parts[0], 10);
          const gm = parseInt(parts[1], 10);
          const gd = parseInt(parts[2], 10);
          const jDate = toJalaali(gy, gm, gd);
          setDisplayDate(
            `${jDate.jy}/${String(jDate.jm).padStart(2, "0")}/${String(jDate.jd).padStart(2, "0")}`,
          );
        }
      } else {
        setDisplayDate("");
      }
    } else {
      setForm({
        code: "",
        type: "percent",
        value: "",
        min_order_price: "",
        max_discount: "",
        usage_limit: "",
        expires_at: "",
        user_id: "",
        is_active: false,
      });
      setDisplayDate("");
    }
  }, [editingCoupon, isOpen]);

  useEffect(() => {
    axiosInstance
      .get("/users")
      .then((res) => {
        const responseData = res.data;
        let userList = [];
        if (Array.isArray(responseData.users)) {
          userList = responseData.users;
        } else if (Array.isArray(responseData)) {
          userList = responseData;
        } else if (Array.isArray(responseData.data)) {
          userList = responseData.data;
        }

        setUsers(
          userList.map((u: any) => ({
            value: u.id,
            label: `${u.name || "بدون نام"} (${u.phone || u.email || "بدون اطلاعات تماس"})`,
          })),
        );
      })
      .catch((err) => console.error("خطا در دریافت کاربران", err));
  }, []);

  const discountTypeOptions = [
    { value: "percent", label: "درصدی (%)" },
    { value: "fixed", label: "مبلغ ثابت (تومان)" },
  ];

  const userOptions = [
    { value: "", label: "عمومی (قابل استفاده برای همه)" },
    ...users,
  ];

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setForm((prev: any) => ({
      ...prev,
      [id]: Boolean(checked),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let gregorianFormatted = form.expires_at || null;

    if (displayDate && displayDate.trim() !== "") {
      if (displayDate.includes("-")) {
        gregorianFormatted = displayDate;
      } else if (displayDate.includes("/")) {
        const parts = displayDate.split("/");
        if (parts.length === 3) {
          const jd = parseInt(parts[0], 10);
          const jm = parseInt(parts[1], 10);
          const jy = parseInt(parts[2], 10);

          try {
            if (jy > 1000) {
              const gDate = toGregorian(jy, jm, jd);
              gregorianFormatted = `${gDate.gy}-${String(gDate.gm).padStart(2, "0")}-${String(gDate.gd).padStart(2, "0")}`;
            }
          } catch (error) {
            console.error("خطا در تبدیل تاریخ شمسی به میلادی:", error);
          }
        }
      }
    } else {
      gregorianFormatted = null;
    }

    const payload = {
      ...form,
      user_id: form.user_id === "" ? null : form.user_id,
      expires_at: gregorianFormatted,
    };

    const request = editingCoupon
      ? axiosInstance.put(`/admin/coupons/${editingCoupon.id}`, payload)
      : axiosInstance.post("/admin/coupons", payload);

    request
      .then(() => {
        onSuccess();
        setPopup({
          isOpen: true,
          message: editingCoupon ? "با موفقیت ویرایش شد" : "با موفقیت ایجاد شد",
          type: "success",
        });
        onClose();
      })
      .catch((err) => {
        console.error("API Error:", err.response?.data);
        setPopup({
          isOpen: true,
          message: err.response?.data?.message || "خطا در انجام عملیات",
          type: "error",
        });
      });
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div
        className="absolute inset-0 bg-dark-800/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-light dark:bg-dark-900 rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col text-right">
        <div className="flex justify-between items-center p-6 pb-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {editingCoupon ? "ویرایش کد تخفیف" : "افزودن کد تخفیف جدید"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto scrollbar p-6 pt-2">
          <form
            id="coupon-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="text-[11px] text-gray-400">
                کد تخفیف (مثال: YALDA1405)
              </label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="input-info"
                required
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-400 mb-1 block">
                نوع تخفیف
              </label>
              <Select
                options={discountTypeOptions}
                value={form.type}
                onChange={(val) => setForm({ ...form, type: val })}
                variant="simple"
                className="h-10.5"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-[11px] text-gray-400 mb-1 block">
                مختص کاربر خاص (اختیاری)
              </label>
              <Select
                options={userOptions}
                value={form.user_id}
                onChange={(val) => setForm({ ...form, user_id: val })}
                variant="simple"
                className="h-10.5"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">
                اگر کاربری انتخاب نکنید، کد تخفیف برای همه کاربران عمومی خواهد بود.
              </span>
            </div>

            <div>
              <label className="text-[11px] text-gray-400">
                مقدار ({form.type === "percent" ? "درصد" : "تومان"})
              </label>
              <input
                type="number"
                min="0"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                onKeyDown={(e) => {
                  if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
                }}
                className="input-info"
                required
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-400">
                حداقل مبلغ سفارش (تومان)
              </label>
              <input
                type="number"
                min="0"
                value={form.min_order_price}
                onChange={(e) =>
                  setForm({ ...form, min_order_price: e.target.value })
                }
                onKeyDown={(e) => {
                  if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
                }}
                className="input-info"
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-400">
                سقف تخفیف (مخصوص درصدی)
              </label>
              <input
                type="number"
                min="0"
                value={form.max_discount}
                onChange={(e) =>
                  setForm({ ...form, max_discount: e.target.value })
                }
                onKeyDown={(e) => {
                  if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
                }}
                className="input-info"
              />
            </div>

            <div>
              <label className="text-[11px] text-gray-400">
                محدودیت تعداد کل استفاده
              </label>
              <input
                type="number"
                min="0"
                value={form.usage_limit}
                onChange={(e) =>
                  setForm({ ...form, usage_limit: e.target.value })
                }
                onKeyDown={(e) => {
                  if (["-", "+", "e", "E"].includes(e.key)) e.preventDefault();
                }}
                className="input-info"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-[11px] text-gray-400 block mb-1">
                تاریخ انقضا (فرمت: سال/ماه/روز)
              </label>
              <input
                type="text"
                placeholder="1406/11/28"
                value={displayDate}
                onChange={(e) => setDisplayDate(e.target.value)}
                className="input-info min-w-full"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">
                تاریخ را به صورت شمسی و به شکل 1406/11/28 وارد کنید. اگر خالی بگذارید انقضا نخواهد داشت.
              </span>
            </div>

            <div className="md:col-span-2 pt-2">
              <Checkbox
                id="is_active"
                label="کوپن فعال باشد"
                checked={Boolean(form.is_active)}
                required={false}
                activeColor="bg-violet-600 border-violet-600"
                onInputHandler={handleCheckboxChange}
              />
            </div>
          </form>
        </div>

        <div className="p-6 pt-2 border-t border-gray-100 dark:border-dark-800 bg-light dark:bg-dark-900 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
          >
            انصراف
          </button>
          <button
            type="submit"
            form="coupon-form"
            className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition shadow-lg shadow-violet-600/20 cursor-pointer"
          >
            {editingCoupon ? "ذخیره تغییرات" : "ایجاد کد تخفیف"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}