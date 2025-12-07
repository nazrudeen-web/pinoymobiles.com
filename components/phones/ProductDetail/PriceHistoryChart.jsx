"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format";

export default function PriceHistoryChart({ phone }) {
  const [timePeriod, setTimePeriod] = useState("30");

  const priceHistory = {
    30: [
      { date: "7d ago", price: phone.price * 1.08 },
      { date: "5d ago", price: phone.price * 1.05 },
      { date: "3d ago", price: phone.price * 1.02 },
      { date: "2d ago", price: phone.price },
      { date: "Today", price: phone.price * 0.98 },
    ],
    90: [
      { date: "60d ago", price: phone.price * 1.15 },
      { date: "45d ago", price: phone.price * 1.1 },
      { date: "30d ago", price: phone.price * 1.05 },
      { date: "14d ago", price: phone.price * 1.01 },
      { date: "Today", price: phone.price * 0.98 },
    ],
    365: [
      { date: "1y ago", price: phone.price * 1.25 },
      { date: "6mo ago", price: phone.price * 1.12 },
      { date: "3mo ago", price: phone.price * 1.05 },
      { date: "1mo ago", price: phone.price },
      { date: "Today", price: phone.price * 0.98 },
    ],
  };

  const data = priceHistory[timePeriod];
  const maxPrice = Math.max(...data.map((p) => p.price));
  const minPrice = Math.min(...data.map((p) => p.price));
  const priceRange = maxPrice - minPrice;
  const lowestPrice = Math.min(...data.map((p) => p.price));
  const highestPrice = Math.max(...data.map((p) => p.price));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4">
      {/* Period Selector */}
      <div className="flex gap-2">
        {["30", "90", "365"].map((period) => (
          <button
            key={period}
            onClick={() => setTimePeriod(period)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              timePeriod === period
                ? "bg-red-500 text-white"
                : "border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {period === "30" ? "30d" : period === "90" ? "90d" : "1y"}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="space-y-3">
        <div className="h-40 relative">
          {/* SVG Chart */}
          <svg
            className="w-full h-full"
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            <line
              x1="0"
              y1="30"
              x2="100"
              y2="30"
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />

            {/* Price line */}
            <polyline
              points={data
                .map((p, i) => {
                  const x = (i / (data.length - 1)) * 100;
                  const y = 50 - ((p.price - minPrice) / priceRange) * 40;
                  return `${x},${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="#e53935"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />

            {/* Points */}
            {data.map((p, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = 50 - ((p.price - minPrice) / priceRange) * 40;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="1"
                  fill="#e53935"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-slate-600 text-xs font-medium mb-1">Highest</p>
            <p className="font-bold text-slate-900">
              {formatCurrency(highestPrice)}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-green-600 text-xs font-medium mb-1">Lowest</p>
            <p className="font-bold text-green-900">
              {formatCurrency(lowestPrice)}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-blue-600 text-xs font-medium mb-1">Saved</p>
            <p className="font-bold text-blue-900">
              {Math.round(((highestPrice - lowestPrice) / highestPrice) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-sm text-amber-900">
          📉 Price dropped <strong>2%</strong> this week
        </p>
      </div>
    </div>
  );
}
