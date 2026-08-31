"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

import BasicInfoTab from "./product-form-parts/BasicInfoTab";
import WarrantiesTab from "./product-form-parts/WarrantiesTab";
import OptionsTab from "./product-form-parts/OptionsTab";
import SpecificationsTab from "./product-form-parts/SpecificationsTab";

export default function ProductForm({ product, categories, onSave }: any) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    discount: "",
    category_id: "",
  });

  const [colors, setColors] = useState<{ name: string; hex: string }[]>([]);
  const [specs, setSpecs] = useState<{ feature_id: string; value: string }[]>(
    [],
  );
  const [editingSpecIndex, setEditingSpecIndex] = useState<number | null>(null);
  const [allFeatures, setAllFeatures] = useState<
    { id: number; title: string }[]
  >([]);
  const [introBlocks, setIntroBlocks] = useState<
    { type: string; title: string; content: string; sort_order: number }[]
  >([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Options state
  const [options, setOptions] = useState<{ title: string; items: string[] }[]>(
    [],
  );
  const [newItemText, setNewItemText] = useState<{ [key: number]: string }>({});

  // Warranty states
  const [allWarranties, setAllWarranties] = useState<
    { id: number; title: string; duration_months: number }[]
  >([]);
  const [selectedWarranties, setSelectedWarranties] = useState<
    { warranty_id: string; price: string; is_default: boolean }[]
  >([]);
  const [editingWarrantyIndex, setEditingWarrantyIndex] = useState<
    number | null
  >(null);

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

  // remove warranty from system
  const handleDeleteWarranty = async (warrantyId: number) => {
    if (!confirm("آیا از حذف این گارانتی از سیستم مطمئن هستید؟")) return;
    try {
      await axiosInstance.delete(`/warranties/${warrantyId}`);
      await fetchWarranties();

      setSelectedWarranties(
        selectedWarranties.filter((w: any) => w.warranty_id !== warrantyId.toString())
      );
    } catch (error) {
      console.error("خطا در حذف گارانتی:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const fetchWarranties = async () => {
    try {
      const { data } = await axiosInstance.get("/warranties");
      setAllWarranties(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("خطا در دریافت لیست گارانتی‌ها:", error);
    }
  };

  useEffect(() => {
    fetchWarranties();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        price: product.price ? product.price.toString() : "",
        discount: product.discount ? product.discount.toString() : "",
        category_id: product.category_id ? product.category_id.toString() : "",
      });
      setColors(product.colors || []);
      setSpecs(
        product.specifications?.map((s: any) => ({
          feature_id: s.feature_id.toString(),
          value: s.value,
        })) || [],
      );
      setIntroBlocks(product.introductions || []);

      if (product.options) {
        const parsedOptions =
          typeof product.options === "string"
            ? JSON.parse(product.options)
            : product.options;
        setOptions(parsedOptions || []);
      }

      if (product.warranties) {
        setSelectedWarranties(
          product.warranties.map((w: any) => ({
            warranty_id: w.id.toString(),
            price: w.pivot?.price ? w.pivot.price.toString() : "",
            is_default: Boolean(w.pivot?.is_default),
          })),
        );
      }

      if (product.img) {
        setPreviewUrl(
          `${process.env.NEXT_PUBLIC_ASSET_URL}/storage/${product.img}`,
        );
      }
    }
  }, [product]);

  useEffect(() => {
    if (formData.category_id) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/categories/${formData.category_id}/features`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => setAllFeatures(data.features || []))
        .catch((err) => console.error("Error details:", err));
    }
  }, [formData.category_id]);

  const handleSaveNewWarranty = async (index: number, title: string) => {
    if (!title.trim()) {
      setEditingWarrantyIndex(null);
      return;
    }
    try {
      const { data } = await axiosInstance.post("/warranties", {
        title,
        duration_months: 0,
      });
      const newWarranty = data.warranty || data;

      await fetchWarranties();

      const nw = [...selectedWarranties];
      nw[index].warranty_id = newWarranty.id.toString();
      setSelectedWarranties(nw);
    } catch (error) {
      console.error("خطا در ایجاد گارانتی جدید:", error);
    } finally {
      setEditingWarrantyIndex(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("price", formData.price);
    data.append("discount", formData.discount);
    data.append("category_id", formData.category_id);
    data.append("description", formData.description);
    data.append("introduction_blocks", JSON.stringify(introBlocks));
    data.append("colors", JSON.stringify(colors));
    data.append("options", JSON.stringify(options));
    data.append("warranties", JSON.stringify(selectedWarranties));

    const processedSpecs = specs.map((s) => ({
      ...s,
      feature_id:
        !isNaN(Number(s.feature_id)) && s.feature_id.trim() !== ""
          ? Number(s.feature_id)
          : s.feature_id,
    }));

    data.append("specifications", JSON.stringify(processedSpecs));

    if (file) data.append("img", file);
    if (product) data.append("_method", "PATCH");

    onSave(data);
  };

  return (
    <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoTab
        formData={formData}
        setFormData={setFormData}
        categories={categories}
        colors={colors}
        setColors={setColors}
        introBlocks={introBlocks}
        setIntroBlocks={setIntroBlocks}
        previewUrl={previewUrl}
        handleImageChange={handleImageChange}
        handleNameChange={handleNameChange}
      />

      <WarrantiesTab
        selectedWarranties={selectedWarranties}
        setSelectedWarranties={setSelectedWarranties}
        allWarranties={allWarranties}
        editingWarrantyIndex={editingWarrantyIndex}
        setEditingWarrantyIndex={setEditingWarrantyIndex}
        handleSaveNewWarranty={handleSaveNewWarranty}
        handleDeleteWarranty={handleDeleteWarranty}
      />

      <OptionsTab
        options={options}
        setOptions={setOptions}
        newItemText={newItemText}
        setNewItemText={setNewItemText}
      />

      <SpecificationsTab
        specs={specs}
        setSpecs={setSpecs}
        allFeatures={allFeatures}
        editingSpecIndex={editingSpecIndex}
        setEditingSpecIndex={setEditingSpecIndex}
      />
    </form>
  );
}
