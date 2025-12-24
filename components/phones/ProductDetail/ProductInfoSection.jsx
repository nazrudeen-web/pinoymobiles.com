import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/format";
import { Store, TrendingDown, ChevronDown } from "lucide-react";
import VariantSelector from "./VariantSelector";

export function ProductInfoSection({
  phone,
  lowestPrice,
  highestPrice,
  retailersCount,
}) {
  // Variant state management
  const [selectedVariant, setSelectedVariant] = useState(
    phone.variants?.[0] || null
  );

  // Update selected variant when phone changes
  useEffect(() => {
    setSelectedVariant(phone.variants?.[0] || null);
  }, [phone]);

  // Calculate display price based on selected variant
  const variantLowestPrice = selectedVariant?.price
    ? Math.round(selectedVariant.price * 0.95)
    : lowestPrice;
  const variantHighestPrice = selectedVariant?.price
    ? Math.round(selectedVariant.price * 1.05)
    : highestPrice;

  const savings = variantHighestPrice - variantLowestPrice;

  return (
    <div className="h-full bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      {/* Header with title */}
      <div className="p-4 md:p-5 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <span className="text-xs font-semibold text-primary uppercase tracking-wide">
              {phone.brand}
            </span>
            <h1 className="text-lg md:text-xl font-bold text-foreground leading-tight mt-1">
              {phone.name}
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              {phone.specs?.ram || "8GB RAM"} |{" "}
              {selectedVariant?.storage || phone.specs?.storage || "256GB"}
            </p>
          </div>
        </div>
      </div>

      {/* Price section */}
      <div className="p-4 md:p-5 bg-muted/30">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Best price</p>
            <div className="text-2xl md:text-3xl font-bold text-foreground">
              {formatCurrency(variantLowestPrice)}
            </div>
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
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
            basePrice={phone.price}
          />
        )}
      </div>

      {/* CTA */}
      <div className="p-4 md:p-5 pt-0 mt-auto">
        <button
          type="button"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
        >
          Compare Prices
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
