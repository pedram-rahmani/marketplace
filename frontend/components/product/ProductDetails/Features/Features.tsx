
import { useProduct } from "@/store/hooks/useProduct";

// ---------------- Feature Type ----------------
export interface Feature {
  id: string | number; // می‌تونه string یا number باشه
  title: string;
  value: string;
}

// ---------------- Product Type (حداقل ویژگی های مورد نیاز) ----------------
export interface Product {
  features?: Feature[];
}

// ---------------- Component ----------------
export default function Features() {
 const product = useProduct() as Product;

 if (!product) return null;

  return (
    <section className="tab-section">
      <h3 className="tab-section-title mb-6">مشخصات</h3>

      {product.features && product.features.length > 0 ? (
        <table className="w-full border-collapse border border-my-gray3 dark:border-my-dark3">
          <tbody>
            {product.features.map((feature) => (
              <tr key={feature.id} className="text-xs sm:text-sm">
                <td className="py-3 px-3 bg-my-gray1/80 dark:bg-my-dark3/70 border-b border-my-gray3 dark:border-my-gray4">
                  {feature.title}
                </td>
                <td className="py-3 px-3 bg-my-gray1/40 dark:bg-my-blue5/70 border-b border-my-gray3 dark:border-my-gray4">
                  {feature.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center text-my-Txt2/60 dark:text-my-Txt2">
          <p className="text-lg font-medium">مشخصاتی برای نمایش وجود ندارد.</p>
        </div>
      )}
    </section>
  );
}
