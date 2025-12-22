import { Check, ExternalLink, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export function RetailerCard({ retailer, isLowest }) {
  return (
    <div
      className={`bg-white rounded-xl md:rounded-2xl border transition-all hover:shadow-md ${
        isLowest
          ? "border-accent/30 ring-1 ring-accent/10"
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
                {retailer.verified && null}
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
                    ? "text-accent"
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
            <button className="bg-primary hover:bg-violet-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold text-sm transition-all flex items-center gap-1.5 shrink-0">
              <span className="hidden md:inline">Go to store</span>
              <span className="md:hidden">View</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      {isLowest && (
        <div className="bg-accent/10 px-4 py-2 md:px-6 md:py-2.5 border-t border-accent/20 flex items-center gap-2">
          <Zap className="h-4 w-4 text-accent" />
          <span className="text-xs md:text-sm text-accent font-medium">
            Best price available now
          </span>
        </div>
      )}
    </div>
  );
}
