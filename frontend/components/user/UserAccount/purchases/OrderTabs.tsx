"use client";

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface OrderTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function OrderTabs({ tabs, activeTab, onTabChange }: OrderTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isActive
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                isActive ? "bg-white/20 text-white" : "bg-white/5 text-gray-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}