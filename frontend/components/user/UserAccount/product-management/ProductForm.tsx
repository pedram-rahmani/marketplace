"use client";
import { useState, useEffect } from "react";
import Select from "@/components/ui/Form/Select";

export default function ProductForm({ product, categories, onSave }: any) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    category_id: "",
  });
  const [colors, setColors] = useState<{ name: string; hex: string }[]>([]);
  const [specs, setSpecs] = useState<{ feature_id: string; value: string }[]>(
    [],
  );
  const [allFeatures, setAllFeatures] = useState<
    { id: number; title: string }[]
  >([]);
  const [introBlocks, setIntroBlocks] = useState<
    { type: string; title: string; content: string; sort_order: number }[]
  >([]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
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
      if (product.img)
        setPreviewUrl(
          `${process.env.NEXT_PUBLIC_ASSET_URL}/storage/${product.img}`,
        );
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

  useEffect(() => {
    console.log("All Features loaded:", allFeatures);
  }, [allFeatures]);

  const updateBlock = (i: number, f: string, v: string) => {
    const n = [...introBlocks];
    (n[i] as any)[f] = v;
    setIntroBlocks(n);
  };

  const addBlock = (type: string) =>
    setIntroBlocks([
      ...introBlocks,
      { type, title: "", content: "", sort_order: introBlocks.length + 1 },
    ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("discount", formData.discount);
    data.append("category_id", formData.category_id);
    data.append("introduction_blocks", JSON.stringify(introBlocks));
    data.append("colors", JSON.stringify(colors));

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
      {/* Image */}
      <div className="flex items-center gap-4">
        {previewUrl && (
          <img
            src={previewUrl}
            className="w-16 h-16 bg-custom-gray-100/40 dark:bg-dark-800/30 rounded-xl overflow-hidden flex items-center justify-center border border-custom-gray-400 dark:border-custom-gray-400/40 shadow-sm shadow-ui-blue-300 relative shrink-0"
          />
        )}
        <input
          type="file"
          id="img-upload"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
              setPreviewUrl(URL.createObjectURL(e.target.files[0]));
            }
          }}
          className="hidden"
        />
        <label
          htmlFor="img-upload"
          className="cursor-pointer py-2 px-4 rounded-xl text-sm font-semibold bg-violet-100 shadow-sm shadow-dark-600/20 text-violet-700 hover:bg-violet-100"
        >
          انتخاب تصویر
        </label>
      </div>
      {/* product_name */}
      <div className="">
        <input
          placeholder="نام محصول"
          className="input-info min-w-full"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      {/* product_price/discount */}
      <div className="grid grid-cols-2">
        <Select
          options={(categories || []).map((c: any) => ({
            value: c.id.toString(),
            label: c.name,
          }))}
          value={formData.category_id}
          onChange={(v: string) => setFormData({ ...formData, category_id: v })}
        />
        <input
          placeholder="قیمت"
          className="input-info"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
      </div>

      {/* Colors - Compact */}
      <div className="border-t border-t-custom-gray-400/40  pt-4">
        <label className="text-sm font-bold block mb-2">رنگ‌ها</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-1 py-1 pr-2 rounded-xl border! border-custom-gray-200! dark:border-white/10! bg-light dark:bg-dark-600 text-gray-800 dark:text-white"
            >
              <div className="relative flex items-center justify-center w-6 h-6 rounded-full overflow-hidden shadow-sm border border-dark-800">
                <input
                  type="color"
                  className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer opacity-0"
                  value={c.hex}
                  onChange={(e) => {
                    const nc = [...colors];
                    nc[i].hex = e.target.value;
                    setColors(nc);
                  }}
                />
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: c.hex }}
                />
              </div>
              <input
                className="bg-transparent w-16 text-xs outline-none "
                value={c.name}
                onChange={(e) => {
                  const nc = [...colors];
                  nc[i].name = e.target.value;
                  setColors(nc);
                }}
              />
              <button
                type="button"
                onClick={() => setColors(colors.filter((_, idx) => idx !== i))}
                className="text-red-400 flex"
              >
                <svg viewBox="0 0 24 24" className="p-1.5">
                  <path d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-xs text-blue-600 px-2"
            onClick={() => setColors([...colors, { name: "", hex: "#000000" }])}
          >
            + جدید
          </button>
        </div>
      </div>

      {/* product_introductions */}
      <div className="border-t border-gray-400/40 pt-4">
        <label className="text-sm font-bold block mb-2">معرفی محصول</label>
        {introBlocks.map((block, i) => (
          <div
            key={i}
            className="p-3 bg-gray-50 dark:bg-dark-800 rounded-xl mb-3 border border-gray-400/40 space-y-1"
          >
            <div className="flex gap-2 mb-2 items-center justify-between">
              <div>
                <Select
                  options={[
                    { value: "paragraph", label: "پاراگراف" },
                    { value: "heading", label: "عنوان" },
                    { value: "list", label: "لیست" },
                  ]}
                  value={block.type}
                  onChange={(v: string) => updateBlock(i, "type", v)}
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setIntroBlocks(introBlocks.filter((_, idx) => idx !== i))
                }
                className="text-red-500 text-xs p-1 rounded-lg"
              >
                <svg viewBox="0 0 24 24" className="size-5!">
                  <path d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {block.type === "heading" && (
              <div>
                <input
                  className="input-info w-full mb-1"
                  placeholder="عنوان..."
                  value={block.title}
                  onChange={(e) => updateBlock(i, "title", e.target.value)}
                />
              </div>
            )}
            <div>
              <textarea
                className="input-info w-full text-xs"
                placeholder="محتوا..."
                value={block.content}
                onChange={(e) => updateBlock(i, "content", e.target.value)}
              />
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <button
            type="button"
            className="text-xs bg-light dark:bg-dark-600/40 p-2 rounded-lg"
            onClick={() => addBlock("paragraph")}
          >
            + افزودن توضیحات
          </button>
        </div>
      </div>

      {/* product_specifications */}
      <div className="border-t border-t-custom-gray-400/40 pt-4">
        <label className="text-sm font-bold block mb-2">مشخصات فنی</label>

        {specs.map((s: any, i) => (
          <div key={i} className="flex gap-2 mb-2">
            {/* استفاده از Select به جای Input برای انتخاب ویژگی */}
            <Select
              options={allFeatures.map((f: any) => ({
                value: f.id.toString(),
                label: f.title,
              }))}
              value={s.feature_id}
              onChange={(v: string) => {
                const ns = [...specs];
                ns[i].feature_id = v;
                setSpecs(ns);
              }}
              placeholder="انتخاب ویژگی"
            />

            <input
              className="input-info w-1/2"
              placeholder="مقدار"
              value={s.value}
              onChange={(e) => {
                const ns = [...specs];
                ns[i].value = e.target.value;
                setSpecs(ns);
              }}
            />

            <button
              type="button"
              onClick={() => setSpecs(specs.filter((_, idx) => idx !== i))}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-xs text-blue-600"
          onClick={() => setSpecs([...specs, { feature_id: "", value: "" }])}
        >
          + افزودن ویژگی
        </button>
      </div>
    </form>
  );
}
