"use client";

import React, { useRef, useState, useEffect } from "react";

interface QuestionSliderProps {
  questions: any[];
  onQuestionClick?: (question: any) => void;
}

export default function QuestionSlider({
  questions,
  onQuestionClick,
}: QuestionSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  // mouse drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // arrow lock states
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // check if the slider can scroll left or right
  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScrollLeft = scrollWidth - clientWidth;
      const currentScroll = Math.abs(scrollLeft);

      setCanScrollRight(currentScroll > 5);
      setCanScrollLeft(currentScroll < maxScrollLeft - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [questions]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.clientWidth;
      const scrollAmount = containerWidth * 0.85;

      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      setTimeout(checkScroll, 300);
    }
  };

  // mouse drag scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasMoved(false);
    if (sliderRef.current) {
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeftState(sliderRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;

    if (Math.abs(walk) > 5) {
      setHasMoved(true);
    }

    sliderRef.current.scrollLeft = scrollLeftState - walk;
    checkScroll();
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 dark:bg-dark-700/50 rounded-xl border border-dashed border-gray-200 dark:border-white/10">
        <p className="text-xs text-text-on-light/80 dark:text-text-on-dark/90">
          هنوز سوالی برای این محصول ثبت نشده است. اولین نفر باشید!
        </p>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="scroll right"
        className={`absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white dark:bg-dark-700 border border-gray-200 dark:border-white/10 rounded-full shadow-md hidden md:flex items-center justify-center text-gray-700 dark:text-white transition ${
          !canScrollRight
            ? "opacity-30 cursor-not-allowed pointer-events-none"
            : "opacity-0 group-hover:opacity-100 hover:bg-gray-50 dark:hover:bg-dark-600"
        }`}
      >
        <svg viewBox="0 0 24 24" strokeWidth={1.5} className="size-4!">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="scroll left"
        className={`absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white dark:bg-dark-700 border border-gray-200 dark:border-white/10 rounded-full shadow-md hidden md:flex items-center justify-center text-gray-700 dark:text-white transition ${
          !canScrollLeft
            ? "opacity-30 cursor-not-allowed pointer-events-none"
            : "opacity-0 group-hover:opacity-100 hover:bg-gray-50 dark:hover:bg-dark-600"
        }`}
      >
        <svg viewBox="0 0 24 24" strokeWidth={1.5} className="size-4!">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div
        ref={sliderRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-4 overflow-x-auto question-slider-scroll pb-4 pt-1 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {questions.map((q, index) => {
          const latestReply =
            q.replies && q.replies.length > 0 ? q.replies[0] : null;
          const isAdminAnswer =
            latestReply?.is_admin_answer || latestReply?.user?.role === "admin";

          return (
            <div
              key={q.id || index}
              onClick={() => {
                if (!hasMoved && onQuestionClick) {
                  onQuestionClick(q);
                }
              }}
              className="min-w-75 max-w-87.5 shrink-0 bg-gray-50/80 dark:bg-dark-700/60 p-4 rounded-2xl border border-custom-gray-200/80 dark:border-custom-gray-200/5 flex flex-col justify-between hover:border-violet-500/50 transition cursor-pointer"
            >
              <div className="space-y-3 pointer-events-none">
                {/* Question Content */}
                <div className="flex items-start gap-2.5">
                  <span className="w-7 h-7 bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    <svg viewBox="0 0 24 24" className="size-4!">
                      <path
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75m0 3h.007v.008H12v-.008Z"
                      />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2">
                      {q.body || "بدون متن"}
                    </h4>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">
                      {q.created_at
                        ? new Date(q.created_at).toLocaleDateString("fa-IR")
                        : ""}
                    </span>
                  </div>
                </div>

                {/* Latest Reply */}
                {latestReply && (
                  <div className="bg-white dark:bg-dark-800 p-3 rounded-xl border border-gray-100 dark:border-white/5 text-[11px] space-y-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-medium ${
                          isAdminAnswer
                            ? "text-cyan-500 dark:text-cyan-400"
                            : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {isAdminAnswer
                          ? "پاسخ فروشگاه (ادمین)"
                          : `پاسخ خریدار (${latestReply.user?.name || "کاربر"})`}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                      {latestReply.body || ""}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <span>{q.replies?.length || 0} پاسخ</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuestionClick && onQuestionClick(q);
                  }}
                  className="text-violet-600 dark:text-violet-400 font-medium cursor-pointer hover:underline"
                >
                  مشاهده جزئیات
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}