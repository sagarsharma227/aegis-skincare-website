import React from "react";
import { Product } from "../types";
import { useImageStore } from "../hooks/useImageStore";

interface ProductPackagingViewProps {
  product: Product;
  size?: "xs" | "sm" | "md" | "lg" | "hero";
  className?: string;
}

export const ProductPackagingView: React.FC<ProductPackagingViewProps> = ({
  product,
  size = "md",
  className = "",
}) => {
  const cleanProductName = product.name
    .replace(/^THE AEGIS /i, "")
    .replace(/^AEGIS /i, "")
    .trim();
  const { image } = useImageStore(product.id, product.image);

  // Thumbnail sizes (xs, sm)
  if (size === "xs" || size === "sm") {
    return (
      <div
        className={`relative w-full h-full bg-[#1A1C1B] overflow-hidden group/thumb ${className}`}
      >
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end">
          <span className="text-[6px] font-mono-spec font-bold text-[#FAF9F7] uppercase truncate">
            {cleanProductName}
          </span>
        </div>
      </div>
    );
  }

  // Full sizes (md, lg, hero)
  const containerHeight =
    size === "hero"
      ? "h-72 sm:h-84"
      : size === "lg"
        ? "h-80 sm:h-96"
        : "h-64 sm:h-72";

  return (
    <div
      className={`relative w-full ${containerHeight} bg-[#1A1C1B] rounded-[3px] overflow-hidden flex flex-col justify-end select-none border border-[#3E453D] shadow-inner group ${className}`}
    >
      {/* Actual Photographic Image */}
      <img
        src={image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
        referrerPolicy="no-referrer"
      />

      {/* Lighting / Gradient Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
    </div>
  );
};
