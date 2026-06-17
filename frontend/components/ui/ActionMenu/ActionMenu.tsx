import React from "react";

export default function ActionMenu({ onSelect, options = [] }) {
  return (
    <ul className="absolute top-full left-full flex-col z-10 rounded-lg bg-my-light3 dark:bg-my-dark2 text-sm text-my-Txt2 dark:text-my-Txt1 overflow-hidden [&>li]:px-3 [&>li]:py-1.5 hover:[&>li]:bg-my-dark1/20 hover:[&>li]:text-my-white dark:hover:[&>li]:bg-my-dark3/40 [&>li]:cursor-pointer">
      {options.map((option) => (
        <li key={option} onClick={() => onSelect(option)}>
          {option}
        </li>
      ))}
    </ul>
  );
}
