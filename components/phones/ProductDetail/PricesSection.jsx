import { useState } from "react";
import { Check, ExternalLink, Zap, ChevronDown, Bell } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function PricesSection({ phone, pricesRef }) {
  const [showAllRetailers, setShowAllRetailers] = useState(false);
  const [sortBy, setSortBy] = useState("price");

  const retailers = [
    {
      id: 1,
      logo: "/stores/lazada.png",
      name: "Lazada",
      price: phone.price,
      originalPrice: phone.price * 1.15,
      shipping: "Free Shipping",
      deliveryDays: "2-5",
      stock: "In stock",
      verified: true,
      sponsored: true,
    },
    {
      id: 2,
      logo: "/stores/shopee.png",
      name: "Shopee",
      price: phone.price * 0.98,
      originalPrice: phone.price * 1.12,
      shipping: "₱50",
      deliveryDays: "3-7",
      stock: "In stock",
      verified: true,
      sponsored: false,
    },
    {
      id: 3,
      logo: "/stores/abenson.png",
      name: "Abenson",
      price: phone.price * 1.02,
      originalPrice: phone.price * 1.1,
      shipping: "₱100",
      deliveryDays: "1-3",
      stock: "In stock",
      verified: true,
      sponsored: false,
    },
    {
      id: 4,
      logo: "/stores/sm.png",
      name: "SM Appliance",
      price: phone.price * 1.05,
      originalPrice: phone.price * 1.18,
      shipping: "Free Shipping",
      deliveryDays: "3-5",
      stock: "Limited",
      verified: true,
      sponsored: false,
    },
    {
      id: 5,
      logo: "/stores/kimstore.png",
      name: "Kimstore",
      price: phone.price * 0.95,
      originalPrice: phone.price * 1.08,
      shipping: "₱80",
      deliveryDays: "2-4",
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
          <div
            key={retailer.id}
            className={`bg-white rounded-xl md:rounded-2xl border transition-all hover:shadow-md ${
              index === 0
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
                    <p className="font-medium text-slate-700">
                      {retailer.shipping}
                    </p>
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
            {index === 0 && (
              <div className="bg-emerald-50 px-4 py-2 md:px-6 md:py-2.5 border-t border-emerald-100 flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span className="text-xs md:text-sm text-emerald-700 font-medium">
                  Best price available now
                </span>
              </div>
            )}
          </div>
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

      <div className="mt-6 md:mt-8 bg-linear-to-r from-violet-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-violet-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Bell className="h-5 w-5 text-violet-600" />
              <h3 className="font-bold text-slate-900">Price Drop Alert</h3>
            </div>
            <p className="text-sm text-slate-600">
              Get notified when the price drops. We'll email you!
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-64 border border-violet-200 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 bg-white"
            />
            <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 md:px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shrink-0">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
