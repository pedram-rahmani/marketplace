"use client";

import { useState, useRef } from "react";
import useClickOutside from "@/store/hooks/useClickOutside";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export default function Select({
  options,
  value,
  onChange,
  className = "",
  placeholder = "انتخاب کنید",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const triggerRef = useRef<HTMLDivElement>(null!);
  const dropdownRef = useRef<HTMLDivElement>(null!);

  useClickOutside(() => {
    setIsOpen(false);
    setSearch("");
  }, [triggerRef, dropdownRef]);

  const selectedOption = options.find((opt) => opt.value === value);

  // فیلتر کردن گزینه‌ها بر اساس تایپ کاربر
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      ref={triggerRef}
      className={`relative w-44 select-none cursor-pointer ${className}`}
    >
      <div
        onClick={() => setIsOpen(true)}
        className={`w-44 flex items-center justify-between pr-2 py-2 rounded-xl border transition-all text-sm 
        bg-light dark:bg-dark-600 text-gray-800 dark:text-gray-200
        ${isOpen ? "border-violet-500/50 ring-1 ring-violet-500/20" : "border-gray-200 dark:border-white/10"}`}
      >
        {isOpen ? (
          <input
            autoFocus
            className="w-full h-full bg-transparent outline-none px-2 text-sm text-gray-800 dark:text-gray-200"
            placeholder="جستجو..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        ) : (
          <span className="truncate px-2">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        )}
        <svg
          viewBox="0 0 24 24"
          className={`px-2 size-7! transition-all! duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 z-50 mt-1 w-full overflow-hidden rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-dark-800 shadow-2xl animate-fadeIn"
        >
          <div className="max-h-60 overflow-y-auto scrollbar ml-0.5 p-1.5 space-y-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;
                return (
                  <div
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer rounded-lg flex items-center justify-between transition-colors
                    ${
                      isSelected
                        ? "bg-violet-200/70 dark:bg-violet-400/20 text-violet-600 dark:text-violet-400"
                        : "hover:bg-violet-50/70 dark:hover:bg-violet-400/5"
                    }`}
                  >
                    <span>{option.label}</span>

                    {isSelected && (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-4 py-2 text-xs text-gray-400">
                موردی یافت نشد
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}