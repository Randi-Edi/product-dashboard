import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../services/productService";
import type { Category, Product } from "../types";

interface FilterContextType {
  categories: Category[];
  category: string;
  setCategory: (c: string) => void;
  products: Product[];
  selectedProducts: string[];
  setSelectedProducts: (p: string[]) => void;
  loadingCategories: boolean;
  loadingProducts: boolean;
  clearFilters: () => void;
  runReport: boolean;
  triggerReport: () => void;
  canRunReport: boolean;
  reportData: { name: string; y: number }[];
  reportType: "pie" | "column";
  reportTitle: string;
  loadingReport: boolean;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [runReport, setRunReport] = useState(false);

  const [lastRunCategory, setLastRunCategory] = useState<string>("");
  const [lastRunProducts, setLastRunProducts] = useState<string[]>([]);

  const [reportData, setReportData] = useState<{ name: string; y: number }[]>(
    []
  );
  const [reportType, setReportType] = useState<"pie" | "column">("pie");
  const [reportTitle, setReportTitle] = useState("Category Distribution");
  const [loadingReport, setLoadingReport] = useState(false);

  const canRunReport =
    category !== lastRunCategory ||
    selectedProducts.join(",") !== lastRunProducts.join(",");

  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      try {
        const cats = await fetchCategories();
        setCategories(cats);

        const equalValue = 100 / cats.length;
        setReportData(cats.map((c) => ({ name: c.name, y: equalValue })));
        setReportType("pie");
        setReportTitle("");
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (!category) {
      setProducts([]);
      setSelectedProducts([]);
      return;
    }
    const loadProducts = async () => {
      setLoadingProducts(true);
      try {
        const prods = await fetchProductsByCategory(category);
        setProducts(prods);
        setSelectedProducts([]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProducts(false);
      }
    };
    loadProducts();
  }, [category]);

  const clearFilters = () => {
    setCategory("");
    setProducts([]);
    setSelectedProducts([]);
    setRunReport(false);
    setLastRunCategory("");
    setLastRunProducts([]);
    // Reset to default pie chart
    if (categories.length) {
      const equalValue = 100 / categories.length;
      setReportData(categories.map((c) => ({ name: c.name, y: equalValue })));
      setReportType("pie");
      setReportTitle("Category Distribution");
    }
  };

  const triggerReport = () => {
    setLoadingReport(true);
    setRunReport(false); // Don't show chart immediately

    // Set a timeout to simulate loading and show chart after 3 seconds
    setTimeout(() => {
      setRunReport(true);
      setLoadingReport(false);
      setLastRunCategory(category);
      setLastRunProducts([...selectedProducts]);

      if (!category) {
        // Default pie chart
        const equalValue = 100 / categories.length;
        setReportData(categories.map((c) => ({ name: c.name, y: equalValue })));
        setReportType("pie");
        setReportTitle("Category Distribution");
      } else {
        // Column chart with products
        const data = products
          .filter((p) => selectedProducts.includes(p.title))
          .map((p) => ({ name: p.title, y: p.price }));
        setReportData(data);
        setReportType("column");
        setReportTitle("Product Prices");
      }
    }, 3000);
  };

  return (
    <FilterContext.Provider
      value={{
        categories,
        category,
        setCategory,
        products,
        selectedProducts,
        setSelectedProducts,
        loadingCategories,
        loadingProducts,
        clearFilters,
        runReport,
        triggerReport,
        canRunReport,
        reportData,
        reportType,
        reportTitle,
        loadingReport,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilter must be used inside FilterProvider");
  return ctx;
};
