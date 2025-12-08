import {
  Star,
  TrendingDown,
  Package,
  Clock,
  ShieldCheck,
  Zap,
  ChevronDown,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";

export function ProductInfoSection({
  phone,
  lowestPrice,
  highestPrice,
  retailersCount,
}) {
  return (
    <div className="lg:col-span-7">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400"
            />
          ))}
          <Star className="h-4 w-4 md:h-5 md:w-5 fill-amber-400/30 text-amber-400" />
        </div>
        <span className="text-sm md:text-base font-semibold text-slate-900">
          {phone.rating}
        </span>
        <span className="text-sm text-slate-500 hidden md:inline">•</span>
        <Link
          href="#reviews"
          className="text-sm text-violet-600 hover:underline hidden md:inline"
        >
          847 reviews
        </Link>
      </div>

      <h1 className="text-lg md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
        {phone.name}
      </h1>

      <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6 leading-relaxed">
        {phone.specs?.storage || "256GB"} • {phone.specs?.ram || "8GB RAM"} •{" "}
        {phone.specs?.display?.split(",")[0] || '6.7" AMOLED Display'}
      </p>

      <div className="bg-slate-50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
        <p className="text-sm text-slate-600 mb-1 md:mb-2">
          Compare prices from
        </p>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-xl md:text-2xl font-bold text-slate-900">
            {formatCurrency(lowestPrice)}
          </span>
          <span className="text-sm md:text-base text-slate-400">to</span>
          <span className="text-base md:text-lg font-semibold text-slate-500">
            {formatCurrency(highestPrice)}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-3 md:mt-4">
          <TrendingDown className="h-4 w-4 text-emerald-600" />
          <span className="text-sm text-emerald-600 font-medium">
            Save up to {formatCurrency(highestPrice - lowestPrice)} by comparing
            prices
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="flex items-center gap-2 p-2.5 md:p-3 rounded-lg bg-slate-50">
          <Package className="h-4 w-4 text-violet-600 shrink-0" />
          <span className="text-xs md:text-sm text-slate-700">
            Free shipping
          </span>
        </div>
        <div className="flex items-center gap-2 p-2.5 md:p-3 rounded-lg bg-slate-50">
          <Clock className="h-4 w-4 text-violet-600 shrink-0" />
          <span className="text-xs md:text-sm text-slate-700">
            1-5 days delivery
          </span>
        </div>
        <div className="flex items-center gap-2 p-2.5 md:p-3 rounded-lg bg-slate-50">
          <ShieldCheck className="h-4 w-4 text-violet-600 shrink-0" />
          <span className="text-xs md:text-sm text-slate-700">
            Verified sellers
          </span>
        </div>
        <div className="flex items-center gap-2 p-2.5 md:p-3 rounded-lg bg-slate-50">
          <Zap className="h-4 w-4 text-violet-600 shrink-0" />
          <span className="text-xs md:text-sm text-slate-700">
            Price drop alert
          </span>
        </div>
      </div>

      <div className="hidden md:flex gap-3">
        <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-3.5 px-6 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2">
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
