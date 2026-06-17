// app/(public)/products/[slug]/page.tsx
import { ProductProvider } from "@/context/ProductInfoContext";
import ProductShowcase from "@/components/product/ProductInfo/ProductShowcase";
import ProductDetails from "@/components/product/ProductDetails/ProductDetails";
import { getProductById } from "@/services/product"; // مسیر سرویس خودت را چک کن

interface PageProps {
  params: Promise<{ slug: string }>; // تعریف پارامتر به صورت پرومیس برای نکست ۱۵
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.slug; 

  const product = await getProductById(productId); 

  if (!product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <p className="text-xl text-red-500 font-bold">محصولی با آی‌دی {productId} یافت نشد.</p>
      </div>
    );
  }

  return (
    <ProductProvider value={product}>
      <div className="container mx-auto grid grid-cols-12 gap-6 p-4">
        <div className="col-span-12 lg:col-span-7">
          <ProductShowcase />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <ProductDetails />
        </div>
      </div>
    </ProductProvider>
  );
}