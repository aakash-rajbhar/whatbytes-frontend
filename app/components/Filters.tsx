"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

const categories = [
  { value: "all", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home" },
];

function FiltersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category") || "all";
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "1000");

  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/?${params.toString()}`);
  };

  const updatePriceRange = (value: string) => {
    const newMax = parseInt(value);
    const params = new URLSearchParams(searchParams.toString());
    
    if (newMax === 1000) {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      params.set("minPrice", "0");
      params.set("maxPrice", value);
    }
    
    router.push(`/?${params.toString()}`);
  };

  return (
    <aside className="sticky top-24 bg-[#0758a8] text-white p-6 rounded-lg w-64 h-fit self-start z-10">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat.value}
                checked={selectedCategory === cat.value}
                onChange={(e) => updateFilter("category", e.target.value)}
                className="w-4 h-4"
              />
              <span>{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-semibold mb-3">Price</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => {
              setPriceRange([0, parseInt(e.target.value)]);
            }}
            onMouseUp={(e) => updatePriceRange((e.target as HTMLInputElement).value)}
            onTouchEnd={(e) => updatePriceRange((e.target as HTMLInputElement).value)}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-sm">
            <span>{priceRange[0]}</span>
            <span>{priceRange[1]}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function Filters() {
  return (
    <Suspense fallback={
      <aside className="sticky top-24 bg-[#0758a8] text-white p-6 rounded-lg w-64 h-fit self-start z-10">
        <h2 className="text-xl font-bold mb-6">Filters</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-[#0758a8] rounded w-3/4"></div>
          <div className="h-4 bg-[#0758a8] rounded w-1/2"></div>
        </div>
      </aside>
    }>
      <FiltersContent />
    </Suspense>
  );
}
