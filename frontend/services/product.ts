
export async function getProduct(identifier: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${identifier}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    

    return data.product; 
  } catch (error) {
    console.error("خطا در برقراری ارتباط با سرور:", error);
    return null;
  }
}