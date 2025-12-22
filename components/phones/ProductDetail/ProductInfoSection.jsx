import { useState, useEffect } from "react";
import {
  TrendingDown,
  ChevronDown,
  ThumbsUp,
} from "lucide-react";
import { formatCurrency } from "@/lib/format";
import VariantSelector from "./VariantSelector";

// Calculate UAE Score
function calculateUAEScore(phone) {
  let score = phone.rating || 4.0;

  // Adjust based on category
  if (phone.category === "Flagship") score += 0.3;
  else if (phone.category === "Gaming") score += 0.2;

  // Cap at 9.9
  return Math.min(score, 9.9).toFixed(1);
}

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

  const uaeScore = calculateUAEScore(phone);
  const isRecommended = parseFloat(uaeScore) >= 4.5;

  return (
    <div className="md:col-span-7 h-full lg:min-h-[620px] flex flex-col">
      <div>
        {/* Phone Name */}
        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
          {phone.name}
        </h1>
        {/* Short Subtitle */}
        <p className="text-sm text-muted-foreground mb-3">
          {selectedVariant?.storage || phone.specs?.storage || "256GB"} •{" "}
          {phone.specs?.ram || "8GB RAM"} •{" "}
          {phone.specs?.display?.split(",")[0] || '6.7" Display'}
        </p>

        {/* Worth Buying (small) */}
        {isRecommended && (
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 mb-4">
            <ThumbsUp className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Worth Buying
            </span>
            <span className="text-xs text-accent/80">
              {phone.price < 20000 ? "Great value" : "Great flagship"}
            </span>
          </div>
        )}

        {/* Storage + Color */}
        {phone.variants && phone.variants.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-4">
            <VariantSelector
              variants={phone.variants}
              selectedVariant={selectedVariant}
              onVariantChange={setSelectedVariant}
              basePrice={phone.price}
            />
          </div>
        )}
      </div>

      {/* Bottom-aligned price + CTA (fills height to match left) */}
      <div className="mt-auto pt-4 space-y-4">
        {/* Best Price Today */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Best Price Today
            </span>
            <span className="text-xs text-accent font-medium flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              Save up to {formatCurrency(variantHighestPrice - variantLowestPrice)}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold text-primary">
              {formatCurrency(variantLowestPrice)}
            </span>
            <span className="text-sm text-muted-foreground">to</span>
            <span className="text-lg font-semibold text-muted-foreground">
              {formatCurrency(variantHighestPrice)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            From {retailersCount} stores • Prices updated today
          </p>
        </div>

        {/* Main CTA */}
        <div className="hidden md:block">
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 px-6 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg">
            Compare {retailersCount} Prices
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
