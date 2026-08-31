import React, { ReactNode } from "react";

interface NavItemProps {
  label: string;
  icon: {
    default: ReactNode;
    active: ReactNode;
  };
  active: boolean;
  onClick: () => void;
}

export default function NavItem({ label, icon, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center relative text-xs transition-all duration-200 py-1.5
        ${
          active
            ? "text-ui-blue-600 bg-ui-blue-300/10 dark:text-ui-blue-300 dark:bg-ui-blue-800/50 rounded-full font-bold"
            : "text-dark-700 dark:text-white hover:opacity-80"
        }
      `}
    >
      {active ? icon.active : icon.default}
      <span className="mt-1">{label}</span>
    </button>
  );
}