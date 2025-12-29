"use client";

import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function PriceComparisonSection({ retailers, lowestPrice }) {
  const [showAllPrices, setShowAllPrices] = useState(false);

  const displayedRetailers = showAllPrices ? retailers : retailers.slice(0, 3);
  const savings = retailers[retailers.length - 1].price - lowestPrice;

  // Get today's date formatted
  const today = new Date().toLocaleDateString('en-AE', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <section className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Compare Prices
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-muted-foreground">
                From {retailers.length} UAE retailers
              </p>
              <span className="text-muted-foreground">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-green-600">
                <RefreshCw className="h-3 w-3" />
                Updated {today}
              </span>
            </div>
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
            className={`flex items-center justify-between px-5 py-4 transition-colors ${idx === 0 ? "bg-green-50 dark:bg-green-950/30" : "hover:bg-muted/30"}`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                {retailer.logoUrl ? (
                  // Use plain img to avoid Next Image domain config
                  <img
                    src={retailer.logoUrl}
                    alt={retailer.name}
                    className="h-10 w-10 object-contain"
                  />
                ) : (
                  <span className="text-xl font-semibold">
                    {retailer.name?.[0] || "?"}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {retailer.name}
                  </span>
                  {idx === 0 && (
                    <span className="text-[10px] font-semibold bg-green-600 text-white px-1.5 py-0.5 rounded">
                      BEST PRICE
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  {idx === 0 ? "Best price today" : idx < 2 ? "Official Store" : "Authorized Seller"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-lg font-bold ${idx === 0 ? "text-green-600" : "text-foreground"}`}>
                {formatCurrency(retailer.price)}
              </span>
              <a
                type="button"
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  idx === 0
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
                href={retailer.affiliateUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
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
