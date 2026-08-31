"use client";

import React, { useState } from "react";

interface ReviewReplyFormProps {
  onSubmitReply: (comment: string) => Promise<void>;
  onCancel: () => void;
}

export default function ReviewReplyForm({ onSubmitReply, onCancel }: ReviewReplyFormProps) {
  const [replyComment, setReplyComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyComment.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmitReply(replyComment);
      setReplyComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mr-6 sm:mr-10 p-4 bg-gray-900/20 border border-white/5 rounded-2xl space-y-3 overflow-hidden transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2"
    >
      <textarea
        placeholder="پاسخ خود را بنویسید..."
        value={replyComment}
        onChange={(e) => setReplyComment(e.target.value)}
        className="w-full bg-gray-950/60 border border-white/10 p-3 rounded-xl text-white text-xs min-h-[70px] focus:outline-none focus:border-cyan-500/50"
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs transition-all cursor-pointer"
        >
          انصراف
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-xs transition-all disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال پاسخ"}
        </button>
      </div>
    </form>
  );
}