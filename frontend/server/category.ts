"use server";

import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      console.error("API URL is not defined in .env.local");
      return [];
    }

    const response = await fetch(`${baseUrl}/categories`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch categories: ${response.status}`);
      return [];
    }

    const { data } = await response.json();
    return data || [];
  } catch (error) {
    console.error("Categories Fetch Error:", error);
    return [];
  }
}