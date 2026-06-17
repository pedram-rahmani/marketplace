"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useAuth } from "@/store/hooks/useAuth";

import PageHeader from "@/components/user/UserAccount/PageHeader";
import ProductRow from "@/components/user/UserAccount/product-management/ProductRow";
import ProductModal from "@/components/user/UserModal/ProductModal";
import ProductForm from "@/components/user/UserAccount/product-management/ProductForm";
import SimplePopup from "@/components/feedback/MessageModal/SimplePopup";
import DeleteConfirmModal from "@/components/feedback/MessageModal/DeleteConfirmModal";


type ProductItem = {
  id: number;
  name: string;
  price: string;
  discount: string | null;
  img: string | null;
  [key: string]: any;
};

export default function ProductManagement() {
  const { token } = useAuth();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const [detailProduct, setDetailProduct] = useState<any>(null);

  const [popup, setPopup] = useState<{ isOpen: boolean; message: string; type: "success" | "error" }>({
    isOpen: false, message: "", type: "success",
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        axiosInstance.get("/products"),
        axiosInstance.get("/categories")
      ]);
      setProducts(prodRes.data.products || []);
      const cats = Array.isArray(catRes.data) ? catRes.data : (catRes.data.data || []);
      setCategories(cats);
    } catch (error) {
      console.error("خطا در بارگذاری اولیه:", error);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/products");
      setProducts(data.products || []);
    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);
    }
  };

  const executeDelete = async () => {
    if (!deleteId) return;
    setLoadingAction("delete");
    try {
      await axiosInstance.delete(`/products/${deleteId}`);
      setPopup({ isOpen: true, message: "محصول با موفقیت حذف شد!", type: "success" });
      await fetchProducts();
    } catch (error) {
      setPopup({ isOpen: true, message: "خطا در حذف محصول رخ داد.", type: "error" });
    } finally {
      setLoadingAction(null);
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };
  

  const handleSave = async (data: FormData) => {
    setLoadingAction("save");
    try {
      const url = editingProduct ? `/products/${editingProduct.id}` : "/products";
      await axiosInstance.post(url, data);
      setPopup({
        isOpen: true,
        message: editingProduct ? "محصول با موفقیت ویرایش شد!" : "محصول با موفقیت ثبت شد!",
        type: "success",
      });
      setIsModalOpen(false);
      setEditingProduct(null);
      await fetchProducts();
    } catch (error: any) {
      setPopup({
        isOpen: true,
        message: error.response?.data?.message || "خطایی در عملیات رخ داد!",
        type: "error",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="مدیریت محصولات"
        buttonText="+ افزودن محصول"
        onButtonClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
      />
      
      {/* Edit/Add Modal */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingProduct ? "ویرایش محصول" : "افزودن محصول جدید"}
      >
        <ProductForm product={editingProduct} categories={categories} onSave={handleSave} />
      </ProductModal>

      <SimplePopup isOpen={popup.isOpen} onClose={() => setPopup({ ...popup, isOpen: false })} message={popup.message} type={popup.type} />
      
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={executeDelete} 
        title={products.find((p) => p.id === deleteId)?.name || "این محصول"} 
      />

      <div className="hidden md:block overflow-x-auto border border-custom-gray-200 dark:border-white/5 bg-light/50 dark:bg-dark-700/30 rounded-2xl shadow-sm">
        <table className="w-full text-right border-collapse">
          <thead>
             <tr className="border-b border-custom-gray-400/70 dark:border-custom-gray-400/40 text-sm">
               <th className="py-4 px-4">شناسه</th>
               <th className="py-4 px-4">تصویر</th>
               <th className="py-4 px-4">نام محصول</th>
               <th className="py-4 px-4">قیمت</th>
               <th className="py-4 px-4">تخفیف</th>
               <th className="py-4 px-4 text-center">عملیات</th>
             </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <ProductRow
                key={p.id}
                product={p}
                onDelete={() => { setDeleteId(p.id); setIsDeleteModalOpen(true); }}
                onEdit={() => { setEditingProduct(p); setIsModalOpen(true); }}
                type="desktop"
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}