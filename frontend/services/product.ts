// services/product.ts
export async function getProductById(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      cache: "no-store", 
    });

    if (!res.ok) return null;

    const data = await res.json();
    
    // نکته مهم: چون لاراول خروجی رو { product: ... } میده، ما data.product رو برمی‌گردونیم
    return data.product; 
  } catch (error) {
    console.error("خطا در برقراری ارتباط با سرور لاراول:", error);
    return null;
  }
}