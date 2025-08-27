import type { Category, Product } from "../types";

const API_BASE = "https://dummyjson.com/products";

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const res = await fetch(`${API_BASE}/category/${category}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data.products; // API returns { products: [...] }
};
