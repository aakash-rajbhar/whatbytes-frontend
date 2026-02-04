"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

const categories = [
  { value: "all", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home" },
];

function MobileSearchAndFiltersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const selectedCategory = searchParams.get("category") || "all";
  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "1000");

  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set("search", search);
    else params.delete("search");

    router.push(`/?${params.toString()}`);
  };

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
    <>
      <div className="lg:hidden sticky top-16 md:top-20 z-40 bg-white  shadow-sm px-4 py-3">
        <div className="flex gap-2">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-[#0758a8] text-white px-4 py-2 rounded-md hover:bg-[#064a8f] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0758a8] focus:border-transparent"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Filter Drawer Overlay */}
      {isFilterOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs bg-opacity-50 z-50"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Filter Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-80 bg-[#0758a8] text-white transform transition-transform duration-300 ease-in-out z-50 ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-white hover:bg-[#064a8f] p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

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
                    onChange={(e) => {
                      updateFilter("category", e.target.value);
                      setIsFilterOpen(false);
                    }}
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
                  className="absolute h-1 bg-white rounded-lg"
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
                  className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#0758a8] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#0758a8] "
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function MobileSearchAndFilters() {
  return (
    <Suspense fallback={
      <div className="lg:hidden sticky top-16 md:top-20 z-40 bg-white border-b shadow-sm px-4 py-3">
        <div className="flex gap-2">
          <div className="bg-gray-200 animate-pulse h-10 w-24 rounded-md"></div>
          <div className="flex-1 bg-gray-200 animate-pulse h-10 rounded-md"></div>
        </div>
      </div>
    }>
      <MobileSearchAndFiltersContent />
    </Suspense>
  );
}
