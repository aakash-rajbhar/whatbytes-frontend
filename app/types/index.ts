export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  brand?: string;
  image: string;
  description?: string;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  search: string;
}
