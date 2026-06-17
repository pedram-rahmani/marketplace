"use server";

import { DBMenuItem } from "@/types/dbMenu";

export async function getMenu(): Promise<DBMenuItem[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      console.error("API URL is not defined in .env.local");
      return [];
    }

    const res = await fetch(`${baseUrl}/menu`, {
      next: { revalidate: 3600 }, 
    });

    if (!res.ok) {
      console.error(`Failed to fetch menu: ${res.status}`);
      return [];
    }

    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Menu Fetch Error:", error);
    return [];
  }
}