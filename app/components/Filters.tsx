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

  const updatePriceRange = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (min === 0 && max === 1000) {
      params.delete("minPrice");
      params.delete("maxPrice");
    } else {
      params.set("minPrice", min.toString());
      params.set("maxPrice", max.toString());
    }
    
    router.push(`/?${params.toString()}`);
  };

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, priceRange[1] - 10);
    setPriceRange([newMin, priceRange[1]]);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, priceRange[0] + 10);
    setPriceRange([priceRange[0], newMax]);
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
          <div className="relative h-5 flex items-center">
            {/* Track */}
            <div className="absolute w-full h-1 bg-white/25 rounded-lg"></div>
            {/* Active track */}
            <div 
              className="absolute h-1 bg-white/50 rounded-lg"
              style={{
                left: `${(priceRange[0] / 1000) * 100}%`,
                right: `${100 - (priceRange[1] / 1000) * 100}%`
              }}
            ></div>
            
            {/* Min thumb */}
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[0]}
              onChange={(e) => handleMinChange(parseInt(e.target.value))}
              onMouseUp={() => updatePriceRange(priceRange[0], priceRange[1])}
              onTouchEnd={() => updatePriceRange(priceRange[0], priceRange[1])}
              className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0758a8] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#0758a8] "
            />
            
            {/* Max thumb */}
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => handleMaxChange(parseInt(e.target.value))}
              onMouseUp={() => updatePriceRange(priceRange[0], priceRange[1])}
              onTouchEnd={() => updatePriceRange(priceRange[0], priceRange[1])}
              className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0758a8] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#0758a8] "
            />
          </div>
          <div className="flex justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
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
