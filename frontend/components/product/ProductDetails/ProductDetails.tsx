"use client";

import { useState, JSX } from "react";
import Introduction from "./Introduction/Introduction";
import Features from "./Features/Features";
import Reviews from "./Reviews/Reviews";
import QuestionAnswer from "./QuestionAnswer/QuestionAnswer";

// ---------------- Tab Type ----------------
interface Tab {
  label: string;
  component: JSX.Element;
}

export default function ProductDetails() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const tabs: Tab[] = [
    { label: "معرفی", component: <Introduction /> },
    { label: "مشخصات", component: <Features /> },
    { label: "دیدگاه ها", component: <Reviews /> },
    { label: "پرسش و پاسخ", component: <QuestionAnswer /> },
  ];

  const handleTabSelect = (index: number) => setSelectedTab(index);

  const getTabClassName = (index: number) =>
    selectedTab === index ? "tab-menu-it selected" : "tab-menu-it";

  return (
    <div className="mt-14">
      <ul className="tab-menu">
        {tabs.map((tab) => (
          <li
            key={tab.label} // بهتر از index برای uniqueness
            className={getTabClassName(tabs.indexOf(tab))}
            onClick={() => handleTabSelect(tabs.indexOf(tab))}
          >
            {tab.label}
            {selectedTab === tabs.indexOf(tab) && (
              <div className="tab-border-selected" />
            )}
          </li>
        ))}
      </ul>

      {/* Render the selected tab's component */}
      <div className="tab-content">{tabs[selectedTab]?.component}</div>
    </div>
  );
}
