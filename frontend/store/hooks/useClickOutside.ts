import { useEffect, useCallback, RefObject } from "react";

const useClickOutside = (
  onClickOutside: () => void,
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[]
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const refArray = Array.isArray(refs) ? refs : [refs];
      
      const isInside = refArray.some(
        (ref) => ref.current && ref.current.contains(e.target as Node)
      );

      // اگر کلیک داخل مودال نبود، تابع بسته شدن را صدا بزن
      if (!isInside) {
        onClickOutside();
      }
    },
    [onClickOutside, refs]
  );

  useEffect(() => {
    // استفاده از mousedown یا click (فرقی نمی‌کند وقتی شرط بالا دقیق باشد)
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useClickOutside;