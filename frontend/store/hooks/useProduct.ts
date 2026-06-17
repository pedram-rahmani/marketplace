"use client";

import { useContext } from "react";
import { ProductContext } from "@/context/ProductInfoContext";

export const useProduct = () => {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  
  return context.product;
};