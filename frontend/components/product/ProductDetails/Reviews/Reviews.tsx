"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useProduct } from "@/store/hooks/useProduct";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";
import CommentItem from "./CommentItem";

export default function Reviews() {
  const product = useProduct();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  useEffect(() => {
    if (product && product.id) {
      axios
        .get(`/product-info/${product.id}/${product.name}/comments`)
        .then((response) => {
          setComments(response.data.comments || []);
          setNextPageUrl(response.data.pagination?.next_page_url || null);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          setLoading(false);
        });
    }
  }, [product.id]);

  const loadMore = () => {
    if (nextPageUrl) {
      axios.get(nextPageUrl).then((response) => {
        setComments((prev) => [...prev, ...(response.data.comments || [])]);
        setNextPageUrl(response.data.pagination?.next_page_url || null);
      });
    }
  };

  return (
    <section className="tab-section">
      <h3 className="tab-section-title mb-6">
        امتیاز و دیدگاه کاربران
        <span className="text-xs"> (&nbsp;{comments.length} دیدگاه&nbsp;)</span>
      </h3>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <SpinnerLoader />
        </div>
      ) : Array.isArray(comments) && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center text-my-Txt2/60 dark:text-my-Txt2">
          <p className="text-lg font-medium">دیدگاهی برای نمایش وجود ندارد.</p>
        </div>
      )}
      {!loading && nextPageUrl && (
        <button onClick={loadMore} className="mt-4 text-sm text-blue-500">
          مشاهده همه دیدگاه‌ها
        </button>
      )}
    </section>
  );
}
