import { ProductSummary } from "@/types/product";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.x.x:8000";
const ASSET_URL = process.env.NEXT_PUBLIC_ASSET_URL || "http://127.0.0.1:8000";

export async function getProducts(params?: { 
  sort?: string; 
  category?: string; 
  featured?: boolean;
  search?: string;
}): Promise<ProductSummary[]> {
  try {
    const queryString = params 
      ? "?" + new URLSearchParams(params as any).toString() 
      : "";

    const url = `${API_BASE_URL}/products${queryString}`;
    
    const res = await fetch(url, { 
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) return [];

    const json = await res.json();
  
    const products = json.data || json.products || [];

    return products.map((p: any) => ({
      ...p,

      img: p.img ? (p.img.startsWith('http') ? p.img : `${ASSET_URL}/storage/${p.img}`) : null
    }));
  } catch (error) {
    console.error("Fetch Products Error:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    // بسته به اینکه API شما برای دسته‌بندی‌ها چه ساختاری دارد، این را تنظیم کنید
    return data.categories || data.data || [];
  } catch (error) {
    console.error("Fetch Categories Error:", error);
    return [];
  }
}