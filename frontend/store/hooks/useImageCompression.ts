import { useState } from "react";
import imageCompression from "browser-image-compression";

export const useImageCompression = () => {
  const [isCompressing, setIsCompressing] = useState(false);

  const compressImage = async (file: File) => {
    setIsCompressing(true);
    
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
      fileType: "image/webp",
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error("Compression failed:", error);
      throw error;
    } finally {
      setIsCompressing(false);
    }
  };

  return { compressImage, isCompressing };
};