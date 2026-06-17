"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProduct } from "@/store/hooks/useProduct";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";

export default function Introduction() {
  const product = useProduct();

  interface Section {
    id: string | number;
    type: "heading" | "list" | "paragraph";
    title?: string;
    content?: string;
    sort_order: number;
  }

  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product?.id) return;

    axios
      .get(`/product-info/${product.id}/${product.name}/introduction`)
      .then((response) => {
        setSections(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load introduction:", err);
        setLoading(false);
      });
  }, [product?.id]);

  console.log(sections)

  const renderSection = (section: Section) => {
    switch (section.type) {
      case "heading":
        return (
          <h3 key={section.id} className="tab-section-title mb-4">
            {section.title}
          </h3>
        );
      case "list":
        return (
          <ul
            key={section.id}
            className="list-disc list-inside text-my-Txt2 dark:text-my-Txt1/70"
          >
            {section.content
              ?.split("\n")
              .filter(Boolean)
              .map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
          </ul>
        );
      case "paragraph":
      default:
        return (
          <p key={section.id} className="leading-relaxed text-my-Txt2 dark:text-my-Txt1/80">
            {section.content}
          </p>
        );
    }
  };

  return (
    <section className="tab-section space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-my-Txt3 dark:text-my-Txt1 mb-6">
        معرفی {product?.name}
      </h2>

      {loading ? (
        <div className="flex justify-center py-10">
          <SpinnerLoader />
        </div>
      ) : sections.length > 0 ? (
        sections
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((section) => (
            <div key={section.id}>
              {section.title && section.type !== "heading" && (
                <h3 className="tab-section-title mb-4">{section.title}</h3>
              )}
              {renderSection(section)}
            </div>
          ))
      ) : (
        <p className="text-gray-500 text-center py-10">
          معرفی‌ای برای این محصول ثبت نشده است.
        </p>
      )}
    </section>
  );
}
