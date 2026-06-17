"use client";

import { createContext, useContext, ReactNode } from "react";
import { Product } from "@/types/product";

interface ProductContextType {
  product: Product | null;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined,
);

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}

export function ProductProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: Product | null;
}) {
  return (
    <ProductContext.Provider value={{ product: value }}>
      {children}
    </ProductContext.Provider>
  );
}
