import { Star } from "lucide-react";

interface RenderRatingProps {
  rating?: number;
  size?: "sm" | "md" | "lg";
}

export function renderRating({ rating, size = "md" }: RenderRatingProps) {
  if (!rating) return null;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const starSize = sizeClasses[size];
  const gapSize = size === "sm" ? "gap-0.5" : "gap-1";

  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className={`${starSize} fill-[#1e4474] text-[#355d86]`} />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <Star key="half" className={`${starSize} fill-blue-300 text-blue-400`} />
    );
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className={`${starSize} text-gray-300`} />
    );
  }

  return <div className={`flex ${gapSize} items-center`}>{stars}</div>;
}
