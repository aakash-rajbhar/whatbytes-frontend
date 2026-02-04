"use client";

import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../cart/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const { cartCount } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) params.set("search", search);
    else params.delete("search");

    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0758a8] text-white px-4 md:px-8 py-4 shadow-md">
      <div className="flex items-center justify-between gap-3 md:gap-4">
        <Link href="/" className="text-2xl md:text-4xl font-bold whitespace-nowrap">
          Logo
        </Link>

        {/* Desktop Search - Hidden on mobile/tablet */}
        <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl relative border border-white rounded-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for products..."
              className="w-full pl-10 pr-4 py-2 text-base rounded text-white placeholder:text-white outline-none"
            />
          </div>
        </form>

        <Link href="/cart" className="flex items-center gap-2 bg-[#002a5a] hover:bg-[#001e40] px-3 md:px-4 py-2 rounded transition-colors text-sm md:text-base">
        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
        <span className="font-medium hidden sm:inline">Cart</span>
        {cartCount > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {cartCount}
          </span>
        )}
      </Link>
      </div>
    </header>
  );
}
