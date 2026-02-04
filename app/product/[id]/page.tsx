"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { products } from "../../data/products";
import { useCart } from "../../cart/CartContext";
import { renderRating } from "../../utils/renderRating";
import { useState } from "react";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    router.push("/cart");
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
          {/* Image Section */}
          <div className="relative h-64 md:h-96">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain rounded-lg"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">
              {product.title}
            </h1>

            <div className="text-3xl md:text-4xl font-bold text-neutral-800 mb-3 md:mb-4">
              ${product.price}
            </div>

            {product.rating && (
              <div className="mb-4">
                {renderRating({ rating: product.rating, size: "md" })}
              </div>
            )}

            {product.description && (
              <div className="mb-4 md:mb-6">
                <h2 className="text-lg md:text-xl font-semibold mb-2">Description</h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Category</h3>
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full capitalize">
                {product.category}
              </span>
            </div>

            {product.brand && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Brand</h3>
                <p className="text-gray-700">{product.brand}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={decrementQuantity}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="bg-gray-200 hover:bg-gray-300 p-2 rounded"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-[#0758a8] hover:bg-[#014483] text-white py-3 px-6 md:px-8 rounded-lg text-base md:text-lg font-semibold transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}