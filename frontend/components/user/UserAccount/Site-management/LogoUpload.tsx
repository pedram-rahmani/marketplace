"use client";

import React, { useRef } from "react";

interface LogoUploadProps {
  preview: string | null;
  onChange: (file: File) => void;
}

export default function LogoUpload({ preview, onChange }: LogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      alert("فرمت فایل نامعتبر است!");
      return;
    }
    onChange(file); 
  };

  // منطق نمایش: اگر blob باشد و فایلی در حال آپلود نباشد، نباید نمایش داده شود
  // این کد آدرس را صحیح مدیریت می‌کند
  const getImageUrl = () => {
    if (!preview) return null;
    if (preview.startsWith('blob:')) return preview;
    if (preview.startsWith('http')) return preview;
    return `http://127.0.0.1:8000/storage/${preview}`;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
      <div className="w-24 h-24 bg-custom-gray-100/40 dark:bg-dark-800/30 rounded-xl overflow-hidden flex items-center justify-center border border-custom-gray-400 dark:border-custom-gray-400/40 shadow-sm shadow-ui-blue-300 relative shrink-0">
        {preview ? (
          <img 
            src={getImageUrl() || ""} 
            alt="Logo" 
            className="w-full h-full object-cover"
            onError={(e) => {
               (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <span className="text-xs text-gray-400">بدون لوگو</span>
        )}
      </div>

      <div className="flex-1 w-full">
        <input ref={inputRef} type="file" id="logo-upload" accept="image/*" onChange={handleFileChange} className="hidden" />
        <label htmlFor="logo-upload" className="inline-block cursor-pointer py-2 px-4 rounded-xl text-sm font-semibold bg-violet-100 shadow-sm shadow-dark-600/20 text-violet-700 hover:bg-violet-100">
          انتخاب فایل
        </label>
      </div>
    </div>
  );
}