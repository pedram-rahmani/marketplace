"use client";

import { Category } from "@/types/category";

export default function CategoryRow({
  category,
  permissions,
  onAddSub,
  onEdit,
  onDelete,
  className,
}: {
  category: Category;
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canAddSub: boolean;
  };
  onAddSub: (id: number) => void;
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}) {
  const indent = (category.level - 1) * 32;

  // tree style
  const levelStyles = {
    1: "bg-light dark:bg-dark-900/20 border border-gray-100 dark:border-gray-800",
    2: "bg-ui-purple/10 dark:bg-ui-purple/12 border-r-4 border-r-violet-400",
    3: "bg-blue-200/35 dark:bg-ui-blue-900/70 border-r-4 border-r-blue-400",
  };

  const getLevelStyle = () => {
    if (category.level === 1) return levelStyles[1];
    if (category.level === 2) return levelStyles[2];
    return levelStyles[3];
  };

  // level (Badge)
  const getBadgeStyle = () => {
    if (category.level === 1) return "bg-orange-100 text-orange-600";
    if (category.level === 2) return "bg-violet-100 text-violet-600";
    return "bg-blue-100 text-blue-600";
  };

  // btn styles
  const btnBase = "text-[11px] py-1 px-3 rounded-lg font-medium transition-colors";
  const addSubClass = permissions.canAddSub ? `${btnBase} bg-blue-100 text-blue-600 hover:bg-blue-200` : `${btnBase} bg-gray-100 text-gray-400 opacity-50 cursor-default`;
  const editClass = permissions.canEdit ? `${btnBase} bg-violet-100 text-violet-600 hover:bg-violet-200` : `${btnBase} bg-gray-100 text-gray-400 opacity-50 cursor-default`;
  const deleteClass = permissions.canDelete ? `${btnBase} bg-red-100 text-red-600 hover:bg-red-200` : `${btnBase} bg-gray-100 text-gray-400 opacity-50 cursor-default`;

  return (
    <div
      className={`p-4 rounded-xl shadow-sm transition-all duration-300 mt-2 flex flex-col md:flex-row md:justify-between md:items-center ${getLevelStyle()} ${className}`}
      style={{ marginRight: `${indent}px` }}
    >
      {/* بخش نام، اسلاگ و نشان سطح */}
      <div className="flex justify-between items-start md:items-center w-full mb-3 md:mb-0">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm md:text-base">{category.name}</p>
            <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold tracking-widest ${getBadgeStyle()}`}>
              L{category.level}
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-mono">slug: {category.slug}</span>
        </div>
      </div>

      {/* بخش دکمه‌ها (همیشه ثابت) */}
      <div className="flex gap-1 md:gap-2">
        <button onClick={() => onAddSub(category.id)} disabled={!permissions.canAddSub} className={addSubClass}>افزودن</button>
        <button onClick={onEdit} disabled={!permissions.canEdit} className={editClass}>ویرایش</button>
        <button onClick={onDelete} disabled={!permissions.canDelete} className={deleteClass}>حذف</button>
      </div>
    </div>
  );
}