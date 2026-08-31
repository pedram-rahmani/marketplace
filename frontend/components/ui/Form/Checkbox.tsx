"use client";

import { useEffect, useReducer } from "react";

interface CheckboxState {
  checked: boolean;
  isValid: boolean;
  touched?: boolean;
}

type CheckboxAction = { type: "TOGGLE"; checked: boolean; required: boolean };

const checkboxReducer = (
  state: CheckboxState,
  action: CheckboxAction,
): CheckboxState => {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        checked: action.checked,
        isValid: action.required ? action.checked : true,
        touched: true,
      };
    default:
      return state;
  }
};

interface CheckboxProps {
  id: string;
  label: string;
  required?: boolean;
  activeColor?: string;
  onInputHandler: (id: string, checked: boolean, isValid: boolean) => void;
}

export default function Checkbox({
  id,
  label,
  required = false,
  onInputHandler,
  activeColor = "bg-green-500 border-green-500",
}: CheckboxProps) {
  const [checkboxState, dispatch] = useReducer(checkboxReducer, {
    checked: false,
    isValid: !required,
  });

  useEffect(() => {
    onInputHandler(id, checkboxState.checked, checkboxState.isValid);
  }, [id, checkboxState.checked, checkboxState.isValid, onInputHandler]);

  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checkboxState.checked}
        onChange={(e) =>
          dispatch({
            type: "TOGGLE",
            checked: e.target.checked,
            required: !!required,
          })
        }
      />
      <div
        className={`w-5 h-5 border-2 border-custom-gray-300 dark:border-white/20 rounded-full flex items-center justify-center transition-all 
                    peer-checked:[&_svg]:opacity-100 
                    ${checkboxState.checked ? activeColor : "bg-transparent"}`}
      >
        <svg
          className="scale-80 text-white opacity-0 transition-opacity duration-200"
          viewBox="0 0 24 24"
          style={{ strokeWidth: "4px" }}
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <span className="select-none">{label}</span>
    </label>
  );
}
