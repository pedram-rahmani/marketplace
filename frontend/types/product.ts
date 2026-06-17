export type ProductSummary = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number | null;
  description: string | null;
  img: string | null;
};

export type PaginationOptions = {
  page?: number;
  limit?: number;
};

export interface Product {
  id: string;
  name?: string;
  price?: number;
  slug?: string;
  [key: string]: any;
}
