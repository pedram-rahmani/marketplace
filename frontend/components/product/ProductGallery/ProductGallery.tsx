"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import GallerySlider from "./GallerySlider";

interface ProductGalleryProps {
    showGallery: boolean;
    hideGallery: () => void;
}

export default function ProductGallery({ showGallery, hideGallery }: ProductGalleryProps) {
    const [mounted, setMounted] = useState<boolean>(false);

    // تضمین اینکه کد فقط در مرورگر اجرا می‌شود
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const menuItems = [
        { name: "رسمی" },
        { name: "خریداران" },
        { name: "ویدیوهای مگنت" },
    ];

    const [activeMenu, setActiveMenu] = useState("رسمی");
    const activeMenuItem = menuItems.find((item) => item.name === activeMenu);

    // اگر کامپوننت هنوز در مرورگر ماونت نشده، یا اصلاً گالری باز نیست، چیزی رندر نکن
    if (!mounted || !showGallery) return null;

    const portalTarget = document.getElementById("modal-portal");
    
    // یک لایه امنیتی: اگر فراموش کردی دایو پورتال را در layout بسازی، کرش نکند و در body رندر شود
    const targetContainer = portalTarget || document.body;

    return ReactDOM.createPortal(
        <div className="top-0 right-0 left-0 z-50 h-screen w-screen bg-my-dark3 fixed">
            <div className="relative h-full w-full flex flex-col justify-between select-none touch-none rtl">
                {/* Header */}
                <div className="gallery-header flex justify-between p-4 bg-black/20">
                    <button className="flex hover:bg-my-dark2 p-1 rounded-lg transition-colors">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white fill-none"><path d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                    </button>
                    
                    <div className="gallery-menu flex gap-4">
                        {menuItems.map((item) => (
                            <div
                                key={item.name}
                                className={`gallery-menu-item cursor-pointer text-white/70 ${
                                    activeMenu === item.name ? "selected text-white font-bold" : ""
                                }`}
                                onClick={() => setActiveMenu(item.name)}
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>

                    <button className="flex hover:bg-my-dark2 p-1 rounded-lg transition-colors" onClick={hideGallery}>
                        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white"><path d="M6 18 18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Content */}
                <div className="h-full w-full grow overflow-hidden">
                    <div className={`h-full flex flex-col justify-between ${activeMenuItem?.name !== "رسمی" ? "w-full" : ""}`}>
                        {activeMenuItem && <GallerySlider menuName={activeMenuItem.name} />}
                    </div>
                </div>
            </div>
        </div>,
        targetContainer
    );
}