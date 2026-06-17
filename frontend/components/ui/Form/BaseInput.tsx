"use client";

import { InputHTMLAttributes } from "react";

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  elem?: "input" | "textarea";
  label?: string;
}

export default function BaseInput({ elem = "input", label, className = "", ...props }: BaseInputProps) {
  const commonClasses = `w-full px-4! py-3! rounded-xl border! border-ui-green-400! dark:border-white/10! bg-light/50! dark:bg-dark-700/30! text-text-on-light dark:text-text-on-dark transition-all ${className}`;

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>}
      {elem === "textarea" ? (
        <textarea className={commonClasses} {...(props as any)} />
      ) : (
        <input className={commonClasses} {...props} />
      )}
    </div>
  );
}