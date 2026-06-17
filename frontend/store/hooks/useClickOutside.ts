"use client";

import { useEffect, useCallback, RefObject } from "react";

type OnClickOutside = () => void;

const useClickOutside = (
  onClickOutside: OnClickOutside,
  refs?: RefObject<HTMLElement> | RefObject<HTMLElement>[]
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const refArray = Array.isArray(refs) ? refs : (refs ? [refs] : []);
      
      if (refArray.length === 0) return;

      const isInside = refArray.some(
        (ref) => ref.current && ref.current.contains(e.target as Node)
      );

      if (!isInside) {
        onClickOutside();
      }
    },
    [onClickOutside, refs]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

};

export default useClickOutside;