"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "../types/index";
import { useCart } from "../cart/CartContext";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const renderRating = (rating?: number) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-[#1e4474] text-[#355d86]" />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-blue-300 text-blue-500" />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }
    
    return <div className="flex gap-0.5">{stars}</div>;
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow flex flex-col h-full">
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
            {renderRating(product.rating)}
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
