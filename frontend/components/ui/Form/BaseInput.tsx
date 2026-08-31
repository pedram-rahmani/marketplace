import { InputHTMLAttributes, ReactNode } from "react";
import { ValidationRule } from "@/Validator/Rules";

interface BaseInputProps extends InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  elem?: "input" | "textarea";
  label?: string;
  children?: ReactNode;
  validations?: ValidationRule[];
  onInputHandler?: (id: string, value: any, isValid: boolean) => void;
  allInputs?: any;
}

export default function BaseInput({
  elem = "input",
  label,
  className = "",
  children,
  validations,
  onInputHandler,
  allInputs,
  ...props
}: BaseInputProps) {
  const commonClasses = `w-full px-4! py-3! rounded-xl focus:shadow-sm! focus:shadow-ui-green-400! focus:ring-2 dark:border-2! focus:ring-ui-blue-400/40 border! border-custom-gray-400/50! dark:border-white/10! bg-light dark:bg-dark-600 text-text-on-light dark:text-text-on-dark transition-all ${className}`;

  return (
    <div className="w-full relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      {elem === "textarea" ? (
        <textarea className={commonClasses} {...(props as any)} />
      ) : (
        <input className={commonClasses} {...props} />
      )}
      {children}
    </div>
  );
}