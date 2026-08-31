import ProductInfo from "@/components/product/ProductDetails/ProductOverview/ProductInfo/ProductInfo";
import ProductSpecs from "@/components/product/ProductDetails/ProductOverview/ProductSpecs/ProductSpecs";
import ProductContent from "@/components/product/ProductDetails/ProductContent/ProductContent";
import ReviewSection from "@/components/product/ProductDetails/ReviewSection/ReviewSection";
import QuestionSection from "@/components/product/ProductDetails/QuestionSection/QuestionSection";
import Breadcrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import ProductGallery, {
  GalleryMedia,
} from "@/components/product/ProductDetails/ProductGallery/ProductGallery";

import { getProduct } from "@/services/product";
import axiosInstance from "@/lib/axiosInstance";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProductQuestions(productId: number | string) {
  try {
    const res = await axiosInstance.get(`/products/${productId}/questions`);
    return res.data;
  } catch (error) {
    return [];
  }
}

// get product reviews and media
async function getProductReviews(productId: number | string) {
  try {
    const res = await axiosInstance.get(`/products/${productId}/reviews`);
    return res.data;
  } catch (error) {
    return [];
  }
}

export default async function page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-400">Product not found.</div>
    );
  }

  const productQuestions =
    product.questions || (await getProductQuestions(product.id));

  // get product reviews and media
  const productReviews =
    product.reviews || (await getProductReviews(product.id));

  // 1. Build official product images list
  const officialImages: GalleryMedia[] = [
    ...(product?.img
      ? [
          {
            id: "main-img",
            type: "image" as const,
            url: product.img,
            source: "official" as const,
          },
        ]
      : []),
    ...(Array.isArray(product?.gallery)
      ? product.gallery.map((imgUrl: string, idx: number) => ({
          id: `gallery-${idx}`,
          type: "image" as const,
          url: imgUrl,
          source: "official" as const,
        }))
      : []),
  ];

  // Build user-submitted media list (only approved ones)
  const userMediaItems: GalleryMedia[] = [];
  if (Array.isArray(productReviews)) {
    productReviews.forEach((review: any) => {
      if (Array.isArray(review.media)) {
        review.media.forEach((m: any) => {
          // check if the media is approved
          const isApproved = m.is_approved === 1 || m.is_approved === true;
          if (isApproved) {
            userMediaItems.push({
              id: `user-media-${m.id}`,
              type: m.file_type === "video" ? "video" : "image",
              url: m.file_path,
              thumbnail: m.file_type === "video" ? product?.img : undefined,
              source: "user",
              userName: review.user?.name || "کاربر مهمان",
              comment: review.comment,
              likes_count: review.likes_count || 0,
              dislikes_count: review.dislikes_count || 0,
              user_reaction: review.user_reaction || null,
            });
          }
        });
      }
    });
  }

  // Combine official and user media items for the gallery
  const allMediaItems: GalleryMedia[] = [...officialImages, ...userMediaItems];

  return (
    <main className="max-w-7xl p-4 md:p-8 relative text-white">
      <Breadcrumb
        links={[
          { id: "search", title: "Search", to: "/search" },
          { id: "product-title", title: product?.name || "Product Name" },
        ]}
      />

      <div className="absolute top-0 right-0 size-125 bg-cyan-500/10 rounded-full blur-[120px] -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6 items-start">
        <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-6">
          <ProductGallery mediaItems={allMediaItems} />

          <div className="grid grid-cols-3 gap-3 bg-white/80 dark:bg-dark-700/70 border border-white/5 rounded-2xl p-4 text-center text-xs text-text-on-light/80 dark:text-text-on-dark/90">
            <div className="flex flex-col items-center gap-1.5">
              <span className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                <svg className="size-5!" viewBox="0 0 24 24">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
              </span>
              <span className="font-medium">ارسال سریع</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <span className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                <svg className="size-5!" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <span className="font-medium">ضمانت اصالت کالا</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <span className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center">
                <svg className="size-5!" viewBox="0 0 24 24">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </span>
              <span className="font-medium">۷ روز ضمانت بازگشت</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-8">
          <ProductInfo product={product} />
          <ProductSpecs product={product} />
        </div>
      </div>

      <div className="mt-16 pt-10 border-t border-white/10 space-y-12">
        <ProductContent product={product} />
        <QuestionSection questions={productQuestions} productId={product.id} />
        <ReviewSection productId={product.id} />
      </div>
    </main>
  );
}