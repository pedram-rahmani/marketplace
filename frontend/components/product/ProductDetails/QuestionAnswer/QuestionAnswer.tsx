"use client";

import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useProduct } from "@/store/hooks/useProduct";
import QuestionAnswerItem from "./QuestionAnswerItem";
import SpinnerLoader from "@/components/ui/SpinnerLoader/SpinnerLoader";

export default function QuestionAnswer() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleAnswers, setVisibleAnswers] = useState<number[]>([]);
  const product = useProduct();

  useEffect(() => {
    if (!product?.id) return;

    setLoading(true);
    axios
      .get(`/product-info/${product.id}/${product.name}/questions`)
      .then((response) => {
        const fetchedQuestions = response.data.data || [];
        setQuestions(fetchedQuestions); // questions with answers
        setVisibleAnswers(new Array(fetchedQuestions.length).fill(3));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, [product?.id]);

  const handleShowMore = (index) => {
    setVisibleAnswers((prev) => {
      const updated = [...prev];
      updated[index] += 3;
      return updated;
    });
  };

  return (
    <section className="tab-section">
      <h3 className="tab-section-title mb-6">
        پرسش و پاسخ کاربران
        <span className="text-xs"> (&nbsp;{questions.length} پرسش&nbsp;)</span>
      </h3>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <SpinnerLoader />
        </div>
      ) : questions.length > 0 ? (
        questions.map((question, index) => (
          <QuestionAnswerItem
            key={question.id}
            question={question}
            visibleAnswers={visibleAnswers[index]}
            onShowMore={() => handleShowMore(index)}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center text-my-Txt2/60 dark:text-my-Txt2">
          <p className="text-lg font-medium">پرسشی برای نمایش وجود ندارد.</p>
        </div>
      )}
    </section>
  );
}
