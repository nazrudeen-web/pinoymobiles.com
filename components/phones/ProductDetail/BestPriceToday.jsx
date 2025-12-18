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
    reviews: 18500,
    verified: true,
    freeShipping: true,
    deliveryDays: "1-3",
    priceMultiplier: 0.95,
    badge: "Best Price",
    badgeColor: "bg-emerald-500",
  },
  {
    id: "amazon-ae",
    name: "Amazon.ae",
    logo: "📦",
    rating: 4.9,
    reviews: 85000,
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
    reviews: 42000,
    verified: true,
    freeShipping: true,
    deliveryDays: "1-3",
    priceMultiplier: 1.0,
    badge: "Express",
    badgeColor: "bg-[#00843D]",
  },
  {
    id: "jumbo",
    name: "Jumbo Electronics",
    logo: "🏬",
    rating: 4.6,
    reviews: 12200,
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
    reviews: 8600,
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
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#00843D] to-[#006B31] px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-[#EF3340]" />
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
            <div className="flex items-center gap-1 text-emerald-300">
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
      <div className="divide-y divide-slate-100">
        {displayedRetailers.map((retailer, index) => (
          <div
            key={retailer.id}
            className={`p-4 md:px-6 hover:bg-slate-50 transition-colors ${
              index === 0 ? "bg-emerald-50/50" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Retailer Logo & Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{retailer.logo}</span>
                  <span className="font-semibold text-slate-900">
                    {retailer.name}
                  </span>
                  {retailer.verified && (
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  )}
                  {retailer.badge && (
                    <span
                      className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${retailer.badgeColor}`}
                    >
                      {retailer.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {retailer.rating} ({(retailer.reviews / 1000).toFixed(1)}k)
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
                      index === 0 ? "text-emerald-600" : "text-slate-900"
                    }`}
                  >
                    {formatCurrency(retailer.price)}
                  </span>
                  {retailer.originalPrice > retailer.price && (
                    <span className="text-xs text-slate-400 line-through">
                      {formatCurrency(retailer.originalPrice)}
                    </span>
                  )}
                </div>
                <a
                  href="#"
                  className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    index === 0
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
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
          className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-[#00843D] hover:bg-[#00843D]/5 transition-colors border-t border-slate-100"
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
      <div className="px-4 md:px-6 py-3 bg-slate-50 border-t border-slate-100">
        <p className="text-[10px] text-slate-400 text-center">
          💡 Prices may vary. We earn a commission when you buy through our
          links at no extra cost to you.
        </p>
      </div>
    </div>
  );
}
