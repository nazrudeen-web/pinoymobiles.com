"use client";

import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function PriceComparisonSection({ retailers, lowestPrice }) {
  const [showAllPrices, setShowAllPrices] = useState(false);

  const displayedRetailers = showAllPrices ? retailers : retailers.slice(0, 3);
  const savings = retailers[retailers.length - 1].price - lowestPrice;

  return (
    <section className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Compare Prices
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              From {retailers.length} UAE retailers
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(lowestPrice)}
            </div>
            {savings > 0 && (
              <p className="text-xs text-muted-foreground">
                Save up to {formatCurrency(savings)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Retailers list */}
      <div className="divide-y divide-border">
        {displayedRetailers.map((retailer, idx) => (
          <div
            key={retailer.id}
            className={`flex items-center justify-between px-5 py-4 ${idx === 0 ? "bg-green-50/50" : ""}`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                {retailer.logo}
              </div>
              <div>
                <span className="font-semibold text-foreground">
                  {retailer.name}
                </span>
                {idx === 0 && (
                  <span className="ml-2 text-[10px] font-semibold bg-green-600 text-white px-1.5 py-0.5 rounded">
                    LOWEST
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-lg font-bold ${idx === 0 ? "text-green-600" : "text-foreground"}`}>
                {formatCurrency(retailer.price)}
              </span>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  idx === 0
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Buy
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {retailers.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAllPrices(!showAllPrices)}
          className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/30 flex items-center justify-center gap-1.5 border-t border-border transition-colors"
        >
          {showAllPrices ? (
            <>Show Less <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>Show {retailers.length - 3} More <ChevronDown className="h-4 w-4" /></>
          )}
        </button>
      )}
    </section>
  );
}
