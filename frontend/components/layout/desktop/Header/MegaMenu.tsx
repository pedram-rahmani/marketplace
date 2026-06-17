"use client";

import { useState, useCallback, useMemo } from "react";

import { DBMenuItem } from "@/types/dbMenu";
import MenuItem from "./MenuItem";

interface HeaderNavMenuProps {
  showMenu: boolean;
  menuItems: DBMenuItem[];
}

interface SelectedState {
  parentId: number | null;
  parentId2: number | null;
  parentId3: number | null;
}

export default function MegaMenu({
  showMenu,
  menuItems,
}: HeaderNavMenuProps) {
  const [selected, setSelected] = useState<SelectedState>({
    parentId: null,
    parentId2: null,
    parentId3: null,
  });

  const maxLevel = useMemo(() => {
    if (menuItems.length === 0) return 1;
    return Math.max(...menuItems.map((item) => item.level));
  }, [menuItems]);

  const catOne = useMemo(
    () => menuItems.filter((item) => item.level === 1),
    [menuItems],
  );
  
  const catTwo = useMemo(
  () => menuItems.filter((item) => item.level === 2 && parseInt(item.parent_id || "0") === selected.parentId),
  [menuItems, selected.parentId]
  );

  const catThree = useMemo(
  () => menuItems.filter((item) => item.level === 3 && parseInt(item.parent_id || "0") === selected.parentId2),
  [menuItems, selected.parentId2]
  );

  const handleMouseEnterParent = useCallback((id: number) => {
    setSelected({ parentId: id, parentId2: null, parentId3: null });
  }, []);

  const handleMouseEnterChild = useCallback((id: number) => {
    setSelected((prev) => ({ ...prev, parentId2: id, parentId3: null }));
  }, []);

  const handleMouseEnterLevel3 = useCallback((id: number) => {
    setSelected((prev) => ({ ...prev, parentId3: id }));
  }, []);

  const renderMenuItems = (
    items: DBMenuItem[],
    level: number,
    onHoverHandler?: (id: number) => void,
  ) =>
    items.map((item) => (
      <MenuItem
        key={item.id}
        item={item}
        onHover={
          onHoverHandler ? () => onHoverHandler(parseInt(item.id)) : undefined
        }
        isActive={
          level === 1
            ? parseInt(item.id) === selected.parentId
            : level === 2
              ? parseInt(item.id) === selected.parentId2 ||
                parseInt(item.id) === selected.parentId
              : parseInt(item.id) === selected.parentId3 ||
                parseInt(item.id) === selected.parentId2
        }
        isLastLevel={level === maxLevel}
        menuItems={menuItems}
        maxLevel={maxLevel}
      />
    ));

  if (menuItems.length === 0) return null;

  return (
    <div
      className={`relative flex transition-[height] z-40 py-1 duration-300 ease-in-out rounded-br-sm bg-white dark:bg-dark-600 shadow
        ${!showMenu ? "h-0" : "h-96"}`}
      style={{ height: `${(catOne.length / 5) * 100}px` }}
    >
      {/* Level 1 */}
      <ul className="flex flex-col h-full w-64 px-1 ml-0.5 overflow-y-auto scrollbar space-y-1 rounded-br-lg">
        {renderMenuItems(catOne, 1, handleMouseEnterParent)}
      </ul>

      {/* Level 2 & 3 */}
      <div className="absolute flex right-full h-full w-full top-0 bg-inherit rounded-bl-sm space-x-0.5">
        {catTwo.length > 0 && (
          <div className="w-64 py-1 flex">
            <ul className="flex flex-col h-full w-64 px-1 ml-0.5 overflow-y-auto scrollbar space-y-1">
              {renderMenuItems(catTwo, 2, handleMouseEnterChild)}
            </ul>
          </div>
        )}
        {catThree.length > 0 && (
          <div className="w-64 py-1 bg-inherit">
            <ul className="flex flex-col h-full w-64 ml-0.5 overflow-y-auto scrollbar space-y-1">
              {renderMenuItems(catThree, 3, handleMouseEnterLevel3)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
