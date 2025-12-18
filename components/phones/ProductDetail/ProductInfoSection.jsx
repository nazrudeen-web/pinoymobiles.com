import { useState, useEffect } from "react";
import {
  Star,
  TrendingDown,
  Package,
  Clock,
  ShieldCheck,
  Zap,
  ChevronDown,
  Bell,
  Award,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import Link from "next/link";
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
  const displayPrice = selectedVariant?.price || phone.price;
  const variantLowestPrice = selectedVariant?.price
    ? Math.round(selectedVariant.price * 0.95)
    : lowestPrice;
  const variantHighestPrice = selectedVariant?.price
    ? Math.round(selectedVariant.price * 1.05)
    : highestPrice;

  const uaeScore = calculateUAEScore(phone);
  const isRecommended = parseFloat(uaeScore) >= 4.5;

  return (
    <div className="lg:col-span-7">
      {/* UAE Score & Rating Row */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          {/* Star Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <Star className="h-4 w-4 fill-amber-400/30 text-amber-400" />
          </div>
          <span className="text-sm font-semibold text-slate-900">
            {phone.rating}
          </span>
          <Link
            href="#reviews"
            className="text-sm text-[#00843D] hover:underline hidden md:inline"
          >
            847 reviews
          </Link>
        </div>

        {/* UAE Score Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#00843D] to-[#006B31]">
          <Award className="h-4 w-4 text-[#EF3340]" />
          <span className="text-sm font-bold text-white">
            {uaeScore} UAE Score
          </span>
        </div>
      </div>
      {/* Phone Name */}
      <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
        {phone.name}
      </h1>
      {/* Quick Specs */}
      <p className="text-sm text-slate-500 mb-4">
        {selectedVariant?.storage || phone.specs?.storage || "256GB"} •{" "}
        {phone.specs?.ram || "8GB RAM"} •{" "}
        {phone.specs?.display?.split(",")[0] || '6.7" Display'}
      </p>
      {/* Verdict Badge */}
      {isRecommended && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 mb-4">
          <ThumbsUp className="h-5 w-5 text-emerald-600" />
          <div>
            <span className="text-sm font-bold text-emerald-700">
              Worth Buying
            </span>
            <span className="text-xs text-emerald-600 ml-2">
              Great{" "}
              {phone.price < 20000 ? "value for budget" : "flagship choice"}
            </span>
          </div>
        </div>
      )}
      {/* Variant Selector */}
      {phone.variants && phone.variants.length > 0 && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
          <VariantSelector
            variants={phone.variants}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
            basePrice={phone.price}
          />
        </div>
      )}
      {/* Price Box */}
      <div className="bg-gradient-to-br from-[#00843D]/5 to-[#EF3340]/5 border border-[#00843D]/20 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Best Price Today
          </span>
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <TrendingDown className="h-3 w-3" />
            Save up to{" "}
            {formatCurrency(variantHighestPrice - variantLowestPrice)}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl md:text-3xl font-bold text-[#00843D]">
            {formatCurrency(variantLowestPrice)}
          </span>
          <span className="text-sm text-slate-400">to</span>
          <span className="text-lg font-semibold text-slate-500">
            {formatCurrency(variantHighestPrice)}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          From {retailersCount} verified sellers • Prices updated today
        </p>
      </div>
      {/* Quick Pros & Cons */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
          <div className="flex items-center gap-1.5 mb-2">
            <ThumbsUp className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">Pros</span>
          </div>
          <ul className="space-y-1">
            {(phone.pros || ["Great performance", "Good camera"])
              .slice(0, 2)
              .map((pro, i) => (
                <li
                  key={i}
                  className="text-xs text-emerald-700 flex items-start gap-1"
                >
                  <span className="mt-0.5">+</span> {pro}
                </li>
              ))}
          </ul>
        </div>
        <div className="p-3 rounded-lg bg-red-50 border border-red-100">
          <div className="flex items-center gap-1.5 mb-2">
            <ThumbsDown className="h-4 w-4 text-red-500" />
            <span className="text-xs font-semibold text-red-600">Cons</span>
          </div>
          <ul className="space-y-1">
            {(phone.cons || ["High price", "No charger"])
              .slice(0, 2)
              .map((con, i) => (
                <li
                  key={i}
                  className="text-xs text-red-600 flex items-start gap-1"
                >
                  <span className="mt-0.5">−</span> {con}
                </li>
              ))}
          </ul>
        </div>
      </div>
      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
          <Package className="h-4 w-4 text-[#00843D] shrink-0" />
          <span className="text-xs text-slate-600">Free shipping</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
          <Clock className="h-4 w-4 text-[#00843D] shrink-0" />
          <span className="text-xs text-slate-600">1-5 days</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
          <ShieldCheck className="h-4 w-4 text-[#00843D] shrink-0" />
          <span className="text-xs text-slate-600">Verified sellers</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
          <Zap className="h-4 w-4 text-[#00843D] shrink-0" />
          <span className="text-xs text-slate-600">Price alerts</span>
        </div>
      </div>
      {/* CTA Buttons */}
      <div className="hidden md:flex gap-3">
        <button className="flex-1 bg-[#00843D] hover:bg-[#006B31] text-white py-3.5 px-6 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00843D]/20">
          Compare {retailersCount} Prices
          <ChevronDown className="h-5 w-5" />
        </button>
        <button className="px-4 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
