export interface Product {
  id: number;
  title: string;
  price: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ChartData {
  name: string;
  y: number;
}

export interface DashboardFilters {
  selectedCategory: string;
  selectedProducts: number[];
}

export interface DashboardState {
  categories: Category[];
  products: Product[];
  loading: boolean;
  error: string | null;
  reportRun: boolean;
  filtersChanged: boolean;
}
