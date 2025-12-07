import { Store, TrendingDown, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

export default function PriceComparison({ price, phoneName }) {
  // Mock retailers data - in production, this would come from API
  const retailers = [
    {
      name: "Lazada",
      logo: "🛍️",
      price: price,
      shipping: "Free",
      delivery: "2-5 days",
      stock: "In stock",
      verified: true,
    },
    {
      name: "Shopee",
      logo: "🛒",
      price: price * 0.98,
      shipping: "₱50",
      delivery: "3-7 days",
      stock: "In stock",
      verified: true,
    },
    {
      name: "Abenson",
      logo: "🏪",
      price: price * 1.02,
      shipping: "₱100",
      delivery: "1-3 days",
      stock: "Limited stock",
      verified: true,
    },
    {
      name: "Power Mac Center",
      logo: "🍎",
      price: price * 1.05,
      shipping: "Free",
      delivery: "Same day",
      stock: "In stock",
      verified: true,
    },
  ];

  const lowestPrice = Math.min(...retailers.map((r) => r.price));

  return (
    <section className="mt-8">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Compare Prices
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {retailers.length} offers from verified sellers
              </p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingDown className="h-5 w-5" />
              <span className="text-sm font-semibold">
                Save up to {formatCurrency(price * 0.07)}
              </span>
            </div>
          </div>
        </div>

        {/* Retailers List */}
        <div className="divide-y divide-slate-100">
          {retailers.map((retailer, index) => (
            <div
              key={index}
              className={`px-6 py-4 hover:bg-slate-50 transition-colors ${
                retailer.price === lowestPrice ? "bg-green-50/30" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Retailer Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="text-3xl">{retailer.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {retailer.name}
                      </h3>
                      {retailer.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                          <Check className="h-3 w-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        📦 {retailer.shipping} shipping
                      </span>
                      <span>⏱️ {retailer.delivery}</span>
                      <span
                        className={
                          retailer.stock === "In stock"
                            ? "text-green-600"
                            : "text-amber-600"
                        }
                      >
                        ● {retailer.stock}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right flex items-center gap-4">
                  <div>
                    {retailer.price === lowestPrice && (
                      <span className="inline-block px-2 py-0.5 rounded-md bg-green-600 text-white text-xs font-bold mb-1">
                        LOWEST PRICE
                      </span>
                    )}
                    <div className="text-2xl font-bold text-slate-900">
                      {formatCurrency(retailer.price)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="gap-2"
                    variant={
                      retailer.price === lowestPrice ? "default" : "outline"
                    }
                  >
                    Go to store
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 text-center text-xs text-slate-500 border-t border-slate-200">
          Prices updated 2 hours ago • Shipping costs may vary
        </div>
      </div>
    </section>
  );
}
