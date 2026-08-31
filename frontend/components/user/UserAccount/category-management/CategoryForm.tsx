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
    if (defaultParentId) {
      setFormData(prev => ({ ...prev, parent_id: String(defaultParentId) }));
    }
  }, [defaultParentId]);

  const handleNameChange = (val: string) => {
    const newSlug = val
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, "")
      .replace(/\s+/g, "-");

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
        <Select
          className="max-w-[384px]"
          placeholder="انتخاب دسته‌ی والد"
          options={categoryOptions}
          value={formData.parent_id}
          onChange={(val) => setFormData({ ...formData, parent_id: val })}
          variant="advanced"
        />

        <input
          className="input-info"
          placeholder="نام دسته‌بندی"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <input
          className="input-info"
          placeholder="اسلاگ"
          value={formData.slug}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, slug: e.target.value }))
          }
        />
      </div>
    </form>
  );
}