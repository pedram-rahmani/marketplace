"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Category } from "@/types/category";
import Select from "@/components/ui/Form/Select";

export default function CategoryForm({
  category,
  onSave,
  allCategories,
  defaultParentId,
}: {
  category: Category | null;
  onSave: () => void;
  allCategories: Category[];
  defaultParentId?: number | null;
}) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    parent_id: category?.parent_id ? String(category.parent_id) : (defaultParentId ? String(defaultParentId) : ""),
  });

  useEffect(() => {
    setFormData({
      name: category?.name || "",
      slug: category?.slug || "",
      parent_id: category?.parent_id
        ? String(category.parent_id)
        : (defaultParentId ? String(defaultParentId) : ""),
    });
  }, [category, defaultParentId]);

  const handleNameChange = (val: string) => {
    const newSlug = val
      .trim()
      .toLowerCase()
      .replace(/[\s]+/g, "-")
      .replace(/[^a-z0-9\u0600-\u06FF\-]/g, "");

    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: newSlug,
    }));
  };

  const categoryOptions = [
    { value: "", label: "دسته اصلی (بدون والد)" },
    ...allCategories
      .filter((c) => c.id !== category?.id)
      .map((c) => ({
        value: String(c.id),
        label: c.name,
        searchKeys: `${c.name} ${c.level}`,
      })),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      parent_id: formData.parent_id ? Number(formData.parent_id) : null,
    };

    try {
      if (category) {
        await axiosInstance.put(`/categories/${category.id}`, payload);
      } else {
        await axiosInstance.post("/categories", payload);
      }
      onSave();
    } catch (error) {
      console.error("خطا در ارسال:", error);
    }
  };

  return (
    <form id="category-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        {/* فیلد والد همراه با لیبل */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">دسته‌ی والد</span>
          <Select
            className="max-w-[384px]"
            placeholder="انتخاب دسته‌ی والد"
            options={categoryOptions}
            value={formData.parent_id}
            onChange={(val) => setFormData({ ...formData, parent_id: val })}
            variant="advanced"
          />
        </div>

        {/* فیلد نام دسته‌بندی همراه با لیبل */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">نام دسته‌بندی</span>
          <input
            className="input-info"
            placeholder="مثال: کالای دیجیتال"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>

        {/* فیلد اسلاگ همراه با لیبل */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">اسلاگ (شناسه یکتا)</span>
          <input
            className="input-info bg-gray-50/50 dark:bg-dark-900/40 border-dashed cursor-default select-none opacity-80 focus:ring-0! focus:border-dashed! focus:border-custom-gray-200! dark:focus:border-white/10!"
            placeholder="اسلاگ به صورت خودکار ساخته می‌شود"
            value={formData.slug}
            readOnly
          />
        </div>
      </div>
    </form>
  );
}