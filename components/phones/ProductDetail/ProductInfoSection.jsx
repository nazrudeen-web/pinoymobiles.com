import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/format";
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

  return (
    <div className="h-full flex flex-col">
      <div>
        <h1 className="text-lg md:text-xl font-bold text-foreground leading-tight">
          {phone.name}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {phone.specs?.ram || "8GB RAM"} |{" "}
          {selectedVariant?.storage || phone.specs?.storage || "256GB"}
        </p>

        {/* Price (dominant) */}
        <div className="mt-4">
          <div className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            {formatCurrency(variantLowestPrice)}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            from {retailersCount} stores
            {variantHighestPrice > variantLowestPrice ? (
              <>
                {" "}• up to {formatCurrency(variantHighestPrice - variantLowestPrice)} difference
              </>
            ) : null}
          </div>
        </div>

        {/* Storage + Color */}
        {phone.variants && phone.variants.length > 0 && (
          <div className="mt-4 bg-card border border-border rounded-xl p-4">
            <VariantSelector
              variants={phone.variants}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
              basePrice={phone.price}
            />
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-4 md:mt-auto pt-4">
        <div className="hidden md:block">
          <button type="button" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 px-6 rounded-xl font-bold text-base transition-colors flex items-center justify-center">
            Compare Prices
          </button>
        </div>
      </div>
    </div>
  );
}
