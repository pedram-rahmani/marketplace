"use client";

import { useState } from "react";
import validator from "@/Validator/Validator";
import { Rules } from "@/Validator/Rules";

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string[] | null }>({});
  const [successMessage, setSuccessMessage] = useState("");

  // validation rules
  const currentRules = [{ value: Rules.requiredValue }];
  const passwordRules = [
    { value: Rules.requiredValue },
    { value: Rules.minValue, min: 8 },
    { value: Rules.passwordValue },
  ];
  const confirmRules = [
    { value: Rules.requiredValue },
    { value: Rules.passwordConfirmationValue },
  ];

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const allInputs = {
      password: { value: newPassword },
    };

    const currentErr = validator(currentPassword, currentRules);
    const newErr = validator(newPassword, passwordRules);
    const confirmErr = validator(confirmPassword, confirmRules, allInputs);

    setErrors({
      current: currentErr,
      new: newErr,
      confirm: confirmErr,
    });

    if (!currentErr && !newErr && !confirmErr) {
      setSuccessMessage("رمز عبور با موفقیت تغییر کرد.");
      // اینجا درخواست API برای ارسال اطلاعات قرار می‌گیرد
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-purple-300">
        تغییر رمز عبور
      </h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* current password */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            رمز عبور فعلی
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input-info min-w-full"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
            >
              {showCurrent ? (
                <svg className="size-5!" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg className="size-5!" viewBox="0 0 24 24">
                  <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          {errors.current && (
            <p className="text-red-400 text-xs mt-1">{errors.current[0]}</p>
          )}
        </div>

        {/* new password */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            رمز عبور جدید
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-info min-w-full"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
            >
              {showNew ? (
                <svg
                  className="size-5!"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg className="size-5!" viewBox="0 0 24 24">
                  <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          {errors.new && (
            <p className="text-red-400 text-xs mt-1">{errors.new[0]}</p>
          )}
        </div>

        {/* confirm new password */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            تکرار رمز عبور جدید
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-info min-w-full"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
            >
              {showConfirm ? (
                <svg className="size-5!" viewBox="0 0 24 24">
                  <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg className="size-5!" viewBox="0 0 24 24">
                  <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
          {errors.confirm && (
            <p className="text-red-400 text-xs mt-1">{errors.confirm[0]}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 transition px-6 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
}
