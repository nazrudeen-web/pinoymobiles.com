"use client";

import { useState } from "react";
import {
  ExternalLink,
  TrendingDown,
  ShieldCheck,
  Truck,
  Clock,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
} from "lucide-react";
import { formatCurrency } from "@/lib/format";

const retailers = [
  {
    id: "sharafdg",
    name: "Sharaf DG",
    logo: "🏪",
    rating: 4.8,
    verified: true,
    freeShipping: true,
    deliveryDays: "1-3",
    priceMultiplier: 0.95,
    badge: "Best Price",
    badgeColor: "bg-accent",
  },
  {
    id: "amazon-ae",
    name: "Amazon.ae",
    logo: "📦",
    rating: 4.9,
    verified: true,
    freeShipping: true,
    shippingFee: 0,
    deliveryDays: "1-2",
    priceMultiplier: 0.98,
    badge: "Prime",
    badgeColor: "bg-[#FF9900]",
  },
  {
    id: "noon",
    name: "Noon",
    logo: "🛒",
    rating: 4.7,
    verified: true,
    freeShipping: true,
    deliveryDays: "1-3",
    priceMultiplier: 1.0,
    badge: "Express",
    badgeColor: "bg-primary",
  },
  {
    id: "jumbo",
    name: "Jumbo Electronics",
    logo: "🏬",
    rating: 4.6,
    verified: true,
    freeShipping: false,
    shippingFee: 15,
    deliveryDays: "2-4",
    priceMultiplier: 1.02,
    badge: "Official Store",
    badgeColor: "bg-blue-500",
  },
  {
    id: "virgin",
    name: "Virgin Megastore",
    logo: "🎵",
    rating: 4.5,
    verified: true,
    freeShipping: true,
    deliveryDays: "2-5",
    priceMultiplier: 1.05,
    badge: null,
  },
];

export default function BestPriceToday({ phone, selectedVariant }) {
  const [showAll, setShowAll] = useState(false);

  const basePrice = selectedVariant?.price || phone.price;

  // Calculate prices for each retailer
  const retailerPrices = retailers
    .map((retailer) => ({
      ...retailer,
      price: Math.round(basePrice * retailer.priceMultiplier),
      originalPrice: Math.round(basePrice * retailer.priceMultiplier * 1.15),
    }))
    .sort((a, b) => a.price - b.price);

  const lowestPrice = retailerPrices[0].price;
  const highestPrice = retailerPrices[retailerPrices.length - 1].price;
  const displayedRetailers = showAll
    ? retailerPrices
    : retailerPrices.slice(0, 3);

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-white/90" />
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wide">
                Best Price Today
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-white">
                {formatCurrency(lowestPrice)}
              </span>
              <span className="text-sm text-white/60 line-through">
                {formatCurrency(Math.round(lowestPrice * 1.15))}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-primary-foreground/80">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm font-semibold">
                Save {formatCurrency(Math.round(lowestPrice * 0.15))}
              </span>
            </div>
            <span className="text-xs text-white/60">vs. SRP</span>
          </div>
        </div>

        {/* Price Range Info */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <p className="text-xs text-white/70">
            Price range from {retailerPrices.length} sellers:{" "}
            {formatCurrency(lowestPrice)} – {formatCurrency(highestPrice)}
          </p>
        </div>
      </div>

      {/* Retailer List */}
      <div className="divide-y divide-border">
        {displayedRetailers.map((retailer, index) => (
          <div
            key={retailer.id}
            className={`p-4 md:px-6 hover:bg-muted/40 transition-colors ${
              index === 0 ? "bg-accent/10" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Retailer Logo & Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{retailer.logo}</span>
                  <span className="font-semibold text-foreground">
                    {retailer.name}
                  </span>
                  {retailer.badge && (
                    <span
                      className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${retailer.badgeColor}`}
                    >
                      {retailer.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {retailer.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="h-3 w-3" />
                    {retailer.freeShipping
                      ? "Free"
                      : `AED ${retailer.shippingFee}`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {retailer.deliveryDays} days
                  </span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="text-right">
                <div className="flex items-baseline gap-1.5 justify-end mb-1">
                  <span
                    className={`text-lg font-bold ${
                      index === 0 ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {formatCurrency(retailer.price)}
                  </span>
                  {retailer.originalPrice > retailer.price && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatCurrency(retailer.originalPrice)}
                    </span>
                  )}
                </div>
                <a
                  href="#"
                  className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    index === 0
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-muted/60 hover:bg-muted text-foreground"
                  }`}
                >
                  Go to Store
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {retailerPrices.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors border-t border-border"
        >
          {showAll ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show {retailerPrices.length - 3} More Stores{" "}
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      )}

      {/* Disclaimer */}
      <div className="px-4 md:px-6 py-3 bg-muted/40 border-t border-border">
        <p className="text-[10px] text-muted-foreground text-center">
          💡 Prices may vary. We earn a commission when you buy through our
          links at no extra cost to you.
        </p>
      </div>
    </div>
  );
}
