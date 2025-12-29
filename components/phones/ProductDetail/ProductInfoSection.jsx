import { useState, useEffect } from "react";
import { useVariant } from "./VariantContext";
import { formatCurrency } from "@/lib/format";
import { Store, TrendingDown, ChevronDown, Star } from "lucide-react";
import VariantSelector from "./VariantSelector";

export function ProductInfoSection({
  phone,
  lowestPrice,
  highestPrice,
  retailersCount,
  avgScore = 8.3,
  onColorImageChange,
}) {
  const { selectedVariant: ctxVariant, setSelectedVariant: setCtxVariant } = useVariant();
const sortedImages = [...phone.images].sort(
  (a, b) => a.sort_order - b.sort_order
);

  const orderedColors = (() => {
  if (!Array.isArray(phone.colors)) return [];

  const result = [];
  const seen = new Set();

  sortedImages.forEach((img) => {
    const match = phone.colors.find(
      (c) => c.color_image === img.image_url
    );

    if (match && !seen.has(match.color_name)) {
      seen.add(match.color_name);
      result.push(match);
    }
  });

  return result;
})();

  // Find the variant that matches the first image's color (by color_hex if present)
  const getInitialVariant = () => {
    if (!Array.isArray(phone.variants)) {
      return null;
    }
    const firstColor = orderedColors[0];
    if (firstColor?.color_hex) {
      const byHex = phone.variants.find((v) => v.color_hex === firstColor.color_hex);
      if (byHex) return byHex;
    }
    if (firstColor?.color_name) {
      const byName = phone.variants.find((v) => v.color === firstColor.color_name);
      if (byName) return byName;
    }
    return phone.variants?.[0] || null;
  };

  // Use context variant if available, otherwise init from first color
  const initialVariant = ctxVariant || getInitialVariant();
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);
  // Track selected color name separately since variants don't have color_hex populated
  const [selectedColorName, setSelectedColorName] = useState(() => orderedColors[0]?.color_name);

  // Sync internal state when context variant changes
  useEffect(() => {
    if (ctxVariant) {
      setSelectedVariant(ctxVariant);
      const matchingColor = phone.colors?.find(c => c.color_hex === ctxVariant.color_hex);
      if (matchingColor) setSelectedColorName(matchingColor.color_name);
    }
  }, [ctxVariant]);

  useEffect(() => {
    const newVariant = getInitialVariant();
    setSelectedVariant(newVariant);
    setSelectedColorName(orderedColors[0]?.color_name);
  }, [phone]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    if (setCtxVariant) setCtxVariant(variant);
  };

  // Derive variant-specific price range from Supabase prices (matches storage/color)
  const variantPrices = selectedVariant && Array.isArray(phone.prices)
    ? phone.prices.filter((p) => {
        const storageMatch = p.variant?.storage && selectedVariant?.storage
          ? p.variant.storage === selectedVariant.storage
          : true;
        const colorMatch = selectedVariant?.color
          ? (p.variant?.color_name ? p.variant.color_name === selectedVariant.color : true)
          : true;
        return storageMatch && colorMatch;
      })
    : [];

  const variantLowestPrice = variantPrices.length
    ? Math.min(...variantPrices.map((p) => Number(p.price)).filter((n) => Number.isFinite(n)))
    : (Number(lowestPrice) || 0);
  const variantHighestPrice = variantPrices.length
    ? Math.max(...variantPrices.map((p) => Number(p.price)).filter((n) => Number.isFinite(n)))
    : (Number(highestPrice) || Number(lowestPrice) || 0);

  const savings = variantHighestPrice - variantLowestPrice;

  return (
    <div className="h-full bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      {/* Header with title and expert score */}
      <div className="p-4 md:p-5 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
              {typeof phone.brand === "string" ? phone.brand : phone.brand?.name}
            </span>
            <h1 className="text-lg md:text-xl font-bold text-foreground leading-tight mt-1">
              {phone.name}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {phone.specs?.ram || "8GB RAM"} | {selectedVariant?.storage || phone.specs?.storage || "256GB"}
            </p>
          </div>
          {/* Expert Score Badge - moved higher for trust */}
          <div className="shrink-0 flex flex-col items-center bg-primary/10 rounded-xl px-3 py-2">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-primary fill-primary" />
              <span className="text-lg font-bold text-primary">{avgScore}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">Expert Score</span>
            <span className="text-[9px] text-muted-foreground/70 text-center mt-0.5 leading-tight max-w-[80px]">UAE price & performance</span>
          </div>
        </div>

      {/* Price section */}
      <div className="p-4 md:p-5 bg-muted/30">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Best price</p>
            <div className="text-2xl md:text-3xl font-bold text-foreground transition-all duration-300 ease-out">
              {formatCurrency(variantLowestPrice)}
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Price may vary by storage & color</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Store className="h-3.5 w-3.5" />
              <span>{retailersCount} stores</span>
            </div>
            {savings > 0 && (
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingDown className="h-3.5 w-3.5" />
                <span>Save up to {formatCurrency(savings)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Variants section */}
      <div className="flex-1 p-4 md:p-5">
        {phone.variants && phone.variants.length > 0 && (
          <VariantSelector
            variants={phone.variants}
            colors={orderedColors}
            selectedVariant={selectedVariant}
            selectedColorName={selectedColorName}
            onVariantChange={handleVariantChange}
            onColorChange={(colorName) => {
              setSelectedColorName(colorName);
            }}
            onColorImageChange={onColorImageChange}
            basePrice={phone.best_price ?? lowestPrice}
            selectedPrice={variantLowestPrice}
          />
        )}
      </div>

      {/* CTA - More prominent */}
      <div className="p-4 md:p-5 pt-0 mt-auto">
        <button
          type="button"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2"
        >
          Compare Prices
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
