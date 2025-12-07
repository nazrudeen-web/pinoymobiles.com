import {
  Star,
  Shield,
  RotateCcw,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";

export default function PriceCard({ retailer, isLowestPrice }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`border rounded-2xl p-5 mb-4 transition-all duration-200 shadow-sm hover:shadow-md ${
        isExpanded
          ? "border-violet-300 bg-linear-to-br from-violet-50/50 to-white"
          : "border-slate-200/60 bg-white"
      } ${isSelected ? "ring-2 ring-violet-400/50" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{retailer.logo}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 text-base">
                {retailer.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{retailer.rating}</span>
                  <span className="text-slate-400">({retailer.reviews})</span>
                </div>
                {retailer.verified && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => setIsSelected(e.target.checked)}
          className="w-5 h-5 rounded-md cursor-pointer accent-violet-600"
        />
      </div>

      {/* Price & Shipping */}
      <div className="mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-2xl font-bold text-slate-900">
            {formatCurrency(retailer.price)}
          </span>
          {isLowestPrice && (
            <span className="px-2.5 py-1 bg-linear-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-sm">
              LOWEST PRICE
            </span>
          )}
        </div>
        <div className="text-sm text-slate-600 space-y-1.5">
          <p className="flex items-center gap-2">
            <span className="text-base">📦</span>
            <span>{retailer.shipping}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="text-base">⏱️</span>
            <span>Delivery: {retailer.delivery}</span>
          </p>
          <p
            className={`flex items-center gap-2 font-medium ${
              retailer.stock === "In stock"
                ? "text-green-600"
                : "text-amber-600"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                retailer.stock === "In stock" ? "bg-green-500" : "bg-amber-500"
              }`}
            />
            {retailer.stock}
          </p>
        </div>
      </div>

      {/* CTA */}
      <button className="w-full bg-linear-to-r from-violet-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-sm mb-3 hover:from-violet-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
        View Offer
        <ExternalLink className="h-4 w-4" />
      </button>

      {/* Expand Details */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-2 text-violet-600 text-sm font-medium hover:text-violet-700 transition-colors py-1"
      >
        {isExpanded ? "Hide" : "Show"} Details
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          <div className="space-y-2.5 text-sm">
            <div className="flex items-center gap-3 text-slate-700">
              <Shield className="h-4 w-4 text-violet-600" />
              <span>Warranty: {retailer.warranty}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <RotateCcw className="h-4 w-4 text-violet-600" />
              <span>Returns: {retailer.returns}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <span className="font-medium">Trust Score:</span>
              <span className="px-2 py-0.5 bg-slate-100 rounded-full text-xs font-medium">
                {retailer.trustScore}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
