import { Check, ExternalLink, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export function RetailerCard({ retailer, isLowest }) {
  return (
    <div
      className={`bg-white rounded-xl md:rounded-2xl border transition-all hover:shadow-md ${
        isLowest
          ? "border-emerald-200 ring-1 ring-emerald-100"
          : "border-slate-200"
      }`}
    >
      {retailer.sponsored && (
        <div className="px-4 pt-2 md:px-6 md:pt-3">
          <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wide">
            Sponsored
          </span>
        </div>
      )}
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3 md:w-48">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xl md:text-2xl shrink-0">
              🏪
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 text-sm md:text-base truncate">
                {retailer.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                {retailer.verified && (
                  <>
                    <Check className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-600">Verified</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-1 items-center gap-6 text-sm text-slate-600">
            <div>
              <p className="text-slate-400 text-xs mb-0.5">Delivery</p>
              <p className="font-medium text-slate-700">
                {retailer.deliveryDays} days
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-0.5">Shipping</p>
              <p className="font-medium text-slate-700">{retailer.shipping}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-0.5">Stock</p>
              <p
                className={`font-medium ${
                  retailer.stock === "In stock"
                    ? "text-emerald-600"
                    : "text-amber-600"
                }`}
              >
                {retailer.stock}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6">
            <div className="text-left md:text-right">
              <p className="text-lg md:text-xl font-bold text-slate-900">
                {formatCurrency(retailer.price)}
              </p>
              {retailer.originalPrice > retailer.price && (
                <p className="text-xs text-slate-400 line-through">
                  {formatCurrency(retailer.originalPrice)}
                </p>
              )}
              <p className="text-xs text-slate-500 mt-1 md:hidden">
                {retailer.shipping} • {retailer.deliveryDays} days
              </p>
            </div>
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm transition-all flex items-center gap-1.5 shrink-0">
              <span className="hidden md:inline">Go to store</span>
              <span className="md:hidden">View</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      {isLowest && (
        <div className="bg-emerald-50 px-4 py-2 md:px-6 md:py-2.5 border-t border-emerald-100 flex items-center gap-2">
          <Zap className="h-4 w-4 text-emerald-600" />
          <span className="text-xs md:text-sm text-emerald-700 font-medium">
            Best price available now
          </span>
        </div>
      )}
    </div>
  );
}
