"use client";

import { useState } from "react";
import { Clock, ExternalLink, Truck, ChevronDown, ChevronUp } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function PriceComparisonSection({ retailers, lowestPrice }) {
  const [showAllPrices, setShowAllPrices] = useState(false);

  const displayedRetailers = showAllPrices ? retailers : retailers.slice(0, 3);

  return (
    <section className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="px-5 py-4 bg-muted/30">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-1">
              Compare Prices
            </p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              {formatCurrency(lowestPrice)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground font-medium">Save up to</p>
            <p className="text-lg font-bold text-foreground">
              {formatCurrency(retailers[retailers.length - 1].price - lowestPrice)}
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {displayedRetailers.map((retailer, idx) => (
          <div
            key={retailer.id}
            className={`flex items-center justify-between p-4 ${
              idx === 0 ? "bg-muted/30" : "hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{retailer.logo}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {retailer.name}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-border bg-muted/40 text-muted-foreground">
                    {retailer.sellerType === "official"
                      ? "Official seller"
                      : "Marketplace seller"}
                  </span>
                  {retailer.badge && (
                    <span
                      className={`text-[10px] font-bold text-secondary-foreground px-1.5 py-0.5 rounded ${retailer.badgeColor}`}
                    >
                      {retailer.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    {retailer.freeShipping ? "Free" : "AED 10-20"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {retailer.days} days
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-lg font-bold ${
                  idx === 0 ? "text-primary" : "text-foreground"
                }`}
              >
                {formatCurrency(retailer.price)}
              </span>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 ${
                  idx === 0
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted/60 text-foreground hover:bg-muted"
                }`}
              >
                Buy <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {retailers.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAllPrices(!showAllPrices)}
          className="w-full py-3 text-sm font-medium text-foreground hover:bg-muted/30 flex items-center justify-center gap-1 border-t border-border"
        >
          {showAllPrices ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show {retailers.length - 3} More Stores{" "}
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      )}

      <p className="text-[10px] text-muted-foreground text-center py-2 bg-muted/30 border-t border-border">
        💡 Prices may vary • Updated today
      </p>
    </section>
  );
}
