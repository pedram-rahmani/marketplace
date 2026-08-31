"use client";

import { useState, useEffect } from "react";
import useLockBodyScroll from "@/store/hooks/useLockBodyScroll";
import GalleryLightbox from "./GalleryLightbox";

export type MediaType = "image" | "video";
export type MediaSource = "official" | "user";

export interface GalleryMedia {
  id: string | number;
  type: MediaType;
  url: string;
  thumbnail?: string;
  source?: MediaSource;
  userName?: string;
  comment?: string;
  likes_count?: number;
  dislikes_count?: number;
  user_reaction?: "like" | "dislike" | null;
}

interface ProductGalleryProps {
  mediaItems?: GalleryMedia[];
  images?: string[];
}

export default function ProductGallery({
  mediaItems,
  images = [],
}: ProductGalleryProps) {
  const baseUrl = process.env.NEXT_PUBLIC_ASSET_URL
    ? `${process.env.NEXT_PUBLIC_ASSET_URL}/storage/`
    : "http://127.0.0.1:8000/storage/";

  const initialMedia: GalleryMedia[] =
    mediaItems && mediaItems.length > 0
      ? mediaItems
      : images.map((img, idx) => ({
          id: `img-${idx}-${img}`,
          type: "image" as MediaType,
          url: img,
          source: "official" as MediaSource,
        }));

  // State to hold and sync media items including their read-only like/dislike stats
  const [allMedia, setAllMedia] = useState<GalleryMedia[]>(initialMedia);
  const [activeTab, setActiveTab] = useState<"official" | "user">("official");
  
  //main media display index (always 0)
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sync state if props change
  useEffect(() => {
    setAllMedia(initialMedia);
  }, [mediaItems, images]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLockBodyScroll(isLightboxOpen);

  const activeMainMedia = allMedia[0];
  const activeLightboxMedia = allMedia[lightboxIndex] || allMedia[0];

  const getFullUrl = (path?: string) => {
    if (!path) return "/placeholder.png";
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/"))
      return path;
    return `${baseUrl}${path}`;
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    const clickedMedia = allMedia[index];
    if (clickedMedia?.source === "user") {
      setActiveTab("user");
    } else {
      setActiveTab("official");
    }
    setIsLightboxOpen(true);
  };

  const renderMediaContent = (media: GalleryMedia, isLightbox = false) => {
    if (!media) return null;
    if (media.type === "video") {
      return (
        <video
          src={getFullUrl(media.url)}
          poster={media.thumbnail ? getFullUrl(media.thumbnail) : undefined}
          controls
          autoPlay={isLightbox}
          playsInline
          className={`w-full h-full object-contain ${isLightbox ? "rounded-xl max-h-[58vh]" : "rounded-xl"}`}
        />
      );
    }
    return (
      <img
        src={getFullUrl(media.url)}
        alt="Product View"
        className={`w-full h-full object-contain ${
          isLightbox ? "rounded-xl max-h-[58vh]" : "transition-transform duration-300 group-hover:scale-105"
        }`}
      />
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* main media display (productDetails) */}
      <div
        onClick={() => openLightbox(0)}
        className="relative aspect-video max-h-80 w-full overflow-hidden rounded-2xl bg-gray-900/80 border border-white/10 p-2.5 shadow-lg flex items-center justify-center cursor-pointer group mx-auto"
      >
        {activeMainMedia ? (
          renderMediaContent(activeMainMedia, false)
        ) : (
          <img src="/placeholder.png" alt="No Media" className="h-full w-full object-contain" />
        )}

        {activeMainMedia?.type === "video" && (
          <div className="absolute top-2.5 right-2.5 bg-red-500/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
            ویدیو
          </div>
        )}
        {activeMainMedia?.source === "user" && (
          <div className="absolute top-2.5 left-2.5 bg-cyan-500/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
            کاربر: {activeMainMedia.userName || "ناشناس"}
          </div>
        )}
      </div>

      {/* thumbnails */}
      {allMedia.length > 1 && (
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
          {allMedia.slice(0, 6).map((item, index) => {
            const thumbUrl = item.type === "video" && item.thumbnail ? item.thumbnail : item.url;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  openLightbox(index);
                }}
                className="relative aspect-square overflow-hidden rounded-xl border border-white/10 opacity-60 hover:opacity-100 transition-all bg-gray-900/50 p-0.5 cursor-pointer hover:border-cyan-400"
              >
                <img
                  src={getFullUrl(thumbUrl)}
                  alt=""
                  className="h-full w-full object-cover rounded-lg pointer-events-none"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-[10px]">▶</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* lightbox modal */}
      <GalleryLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        mounted={mounted}
        activeLightboxMedia={activeLightboxMedia}
        allMedia={allMedia}
        lightboxIndex={lightboxIndex}
        setLightboxIndex={setLightboxIndex}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        getFullUrl={getFullUrl}
        renderMediaContent={renderMediaContent}
      />
    </div>
  );
}