"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/index";
import { useCart } from "../cart/CartContext";
import { renderRating } from "../utils/renderRating";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-2xl max-w-xl shadow hover:shadow-lg overflow-hidden transition-shadow flex flex-col h-full">
        <div className="relative w-full h-48 mb-3">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-4">
            <h3 className="font-semibold text-xl text-gray-800 mb-1 line-clamp-2">
          {product.title}
        </h3>
        
        <p className="text-neutral-800 font-bold text-xl mb-2">
          ${product.price}
        </p>

        {product.rating && (
          <div className="mb-3">
            {renderRating({ rating: product.rating, size: "sm" })}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-[#025cb1] hover:bg-[#014483] text-white py-2 px-4 rounded-xl transition-colors font-medium"
        >
          Add to Cart
        </button>
        </div>
      </div>
    </Link>
  );
}
