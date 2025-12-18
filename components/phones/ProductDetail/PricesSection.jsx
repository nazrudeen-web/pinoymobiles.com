import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { RetailerCard } from "./RetailerCard";
import { PriceAlertBox } from "./PriceAlertBox";

export default function PricesSection({ phone, pricesRef }) {
  const [showAllRetailers, setShowAllRetailers] = useState(false);
  const [sortBy, setSortBy] = useState("price");

  const retailers = [
    {
      id: 1,
      name: "Amazon.ae",
      price: phone.price,
      originalPrice: phone.price * 1.15,
      shipping: "Free Shipping",
      deliveryDays: "1-2",
      stock: "In stock",
      verified: true,
      sponsored: true,
    },
    {
      id: 2,
      name: "Noon",
      price: phone.price * 0.98,
      originalPrice: phone.price * 1.12,
      shipping: "AED 10",
      deliveryDays: "1-3",
      stock: "In stock",
      verified: true,
      sponsored: false,
    },
    {
      id: 3,
      name: "Jumbo Electronics",
      price: phone.price * 1.02,
      originalPrice: phone.price * 1.1,
      shipping: "AED 15",
      deliveryDays: "2-4",
      stock: "In stock",
      verified: true,
      sponsored: false,
    },
    {
      id: 4,
      name: "Virgin Megastore",
      price: phone.price * 1.05,
      originalPrice: phone.price * 1.18,
      shipping: "Free Shipping",
      deliveryDays: "2-5",
      stock: "Limited",
      verified: true,
      sponsored: false,
    },
    {
      id: 5,
      name: "Sharaf DG",
      price: phone.price * 0.95,
      originalPrice: phone.price * 1.08,
      shipping: "AED 10",
      deliveryDays: "1-3",
      stock: "In stock",
      verified: true,
      sponsored: false,
    },
  ];

  const sortedRetailers = [...retailers].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "delivery")
      return parseInt(a.deliveryDays) - parseInt(b.deliveryDays);
    return 0;
  });

  const displayedRetailers = showAllRetailers
    ? sortedRetailers
    : sortedRetailers.slice(0, 3);

  return (
    <section
      id="prices"
      ref={pricesRef}
      className="scroll-mt-32 md:scroll-mt-36"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4 md:mb-6">
        <div>
          <h2 className="text-base md:text-xl font-bold text-slate-900">
            {retailers.length} Offers from Trusted Sellers
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Prices include delivery • Updated today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
          >
            <option value="price">Lowest Price</option>
            <option value="delivery">Fastest Delivery</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {displayedRetailers.map((retailer, index) => (
          <RetailerCard
            key={retailer.id}
            retailer={retailer}
            isLowest={index === 0}
          />
        ))}
      </div>

      {retailers.length > 3 && (
        <button
          onClick={() => setShowAllRetailers(!showAllRetailers)}
          className="w-full mt-4 py-3 md:py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
        >
          {showAllRetailers
            ? "Show less"
            : `Show all ${retailers.length} offers`}
          <ChevronDown
            className={`h-5 w-5 transition-transform ${
              showAllRetailers ? "rotate-180" : ""
            }`}
          />
        </button>
      )}

      <PriceAlertBox />
    </section>
  );
}
