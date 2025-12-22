"use client";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/format";

// Color options with their display values
const colorMap = {
  "natural-titanium": { name: "Natural Titanium", hex: "#A8A9AD" },
  "blue-titanium": { name: "Blue Titanium", hex: "#4A5568" },
  "white-titanium": { name: "White Titanium", hex: "#F5F5F5" },
  "black-titanium": { name: "Black Titanium", hex: "#1A1A1A" },
  "desert-titanium": { name: "Desert Titanium", hex: "#C4A77D" },
  black: { name: "Black", hex: "#1A1A1A" },
  white: { name: "White", hex: "#FFFFFF" },
  blue: { name: "Blue", hex: "#3B82F6" },
  green: { name: "Green", hex: "#22C55E" },
  purple: { name: "Purple", hex: "#A855F7" },
  yellow: { name: "Yellow", hex: "#EAB308" },
  pink: { name: "Pink", hex: "#EC4899" },
  red: { name: "Red", hex: "#EF4444" },
  gold: { name: "Gold", hex: "#D4AF37" },
  silver: { name: "Silver", hex: "#C0C0C0" },
  graphite: { name: "Graphite", hex: "#4A4A4A" },
  "phantom-black": { name: "Phantom Black", hex: "#0D0D0D" },
  cream: { name: "Cream", hex: "#FFFDD0" },
  violet: { name: "Violet", hex: "#7C3AED" },
  "titanium-gray": { name: "Titanium Gray", hex: "#6B7280" },
  "titanium-black": { name: "Titanium Black", hex: "#1F2937" },
  "titanium-blue": { name: "Titanium Blue", hex: "#3B5998" },
  "titanium-violet": { name: "Titanium Violet", hex: "#6D28D9" },
};

export default function VariantSelector({
  variants,
  selectedVariant,
  onVariantChange,
  basePrice,
}) {
  // Extract unique storage options and colors from variants
  const storageOptions = [...new Set(variants?.map((v) => v.storage) || [])];
  const colorOptions = [...new Set(variants?.map((v) => v.color) || [])];

  // Get current selections
  const currentStorage = selectedVariant?.storage || storageOptions[0];
  const currentColor = selectedVariant?.color || colorOptions[0];

  // Find matching variant for current selections
  const findVariant = (storage, color) => {
    return (
      variants?.find((v) => v.storage === storage && v.color === color) ||
      variants?.find((v) => v.storage === storage) ||
      variants?.[0]
    );
  };

  // Get available colors for selected storage
  const availableColors =
    variants
      ?.filter((v) => v.storage === currentStorage)
      ?.map((v) => v.color) || [];

  const handleStorageChange = (storage) => {
    const newVariant = findVariant(storage, currentColor);
    onVariantChange(newVariant);
  };

  const handleColorChange = (color) => {
    const newVariant = findVariant(currentStorage, color);
    onVariantChange(newVariant);
  };

  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="space-y-5">
      {/* Storage Selection */}
      {storageOptions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-700">Storage</p>
            <span className="text-xs text-slate-500">{currentStorage}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {storageOptions.map((storage) => {
              const variantForStorage = variants.find(
                (v) => v.storage === storage
              );
              const priceDiff = variantForStorage
                ? variantForStorage.price - basePrice
                : 0;
              const isSelected = currentStorage === storage;

              return (
                <button
                  type="button"
                  key={storage}
                  onClick={() => handleStorageChange(storage)}
                  className={`relative px-4 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <span className="font-semibold text-sm">{storage}</span>
                  {priceDiff > 0 && (
                    <span
                      className={`block text-xs mt-0.5 ${
                        isSelected ? "text-primary/70" : "text-slate-400"
                      }`}
                    >
                      +{formatCurrency(priceDiff)}
                    </span>
                  )}
                  {priceDiff < 0 && (
                    <span
                      className={`block text-xs mt-0.5 ${
                        isSelected ? "text-[#008B8B]" : "text-[#008B8B]"
                      }`}
                    >
                      {formatCurrency(priceDiff)}
                    </span>
                  )}
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {colorOptions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-700">Color</p>
            <span className="text-xs text-slate-500">
              {colorMap[currentColor]?.name || currentColor}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => {
              const colorData = colorMap[color] || { name: color, hex: "#888" };
              const isSelected = currentColor === color;
              const isAvailable = availableColors.includes(color);

              return (
                <button
                  type="button"
                  key={color}
                  onClick={() => isAvailable && handleColorChange(color)}
                  disabled={!isAvailable}
                  className={`relative group ${
                    !isAvailable ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                  title={colorData.name}
                >
                  <div
                    className={`h-10 w-10 rounded-full border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                    style={{ backgroundColor: colorData.hex }}
                  >
                    {isSelected && (
                      <div className="h-full w-full flex items-center justify-center">
                        <Check
                          className={`h-4 w-4 ${
                            colorData.hex === "#FFFFFF" ||
                            colorData.hex === "#F5F5F5" ||
                            colorData.hex === "#FFFDD0"
                              ? "text-slate-800"
                              : "text-white"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                  {/* Color name tooltip on hover */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <span className="text-xs text-slate-600 bg-white px-2 py-0.5 rounded shadow-sm border">
                      {colorData.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Variant Price */}
      {selectedVariant && (
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">
              Selected variant price
            </span>
            <span className="text-lg font-bold text-primary">
              {formatCurrency(selectedVariant.price)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
