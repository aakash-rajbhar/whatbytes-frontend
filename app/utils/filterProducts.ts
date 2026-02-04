import { Product } from "../types";

interface FilterParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export function filterProducts(
  products: Product[],
  filters: FilterParams
) {
  return products.filter((product) => {
    if (filters.category && product.category !== filters.category)
      return false;

    if (filters.minPrice && product.price < filters.minPrice)
      return false;

    if (filters.maxPrice && product.price > filters.maxPrice)
      return false;

    if (
      filters.search &&
      !product.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;

    return true;
  });
}
