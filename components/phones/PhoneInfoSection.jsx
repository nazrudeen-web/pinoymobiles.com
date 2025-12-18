import {
  Star,
  MessageSquare,
  Share2,
  Heart,
  Bell,
  Check,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

export default function PhoneInfoSection({ phone }) {
  return (
    <div className="space-y-6">
      {/* Header with Brand */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            {phone.brand}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-sm text-slate-500">{phone.category}</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 leading-tight">
          {phone.name}
        </h1>
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(phone.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-slate-900">
            {phone.rating}
          </span>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          Read 250+ reviews
        </button>
      </div>

      {/* Key Highlights */}
      <div className="grid grid-cols-2 gap-3">
        {phone.highlights.slice(0, 4).map((highlight, index) => (
          <div
            key={index}
            className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 border border-slate-100"
          >
            <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
            <span className="text-sm text-slate-700 font-medium">
              {highlight}
            </span>
          </div>
        ))}
      </div>

      {/* Price Alert Banner */}
      <div className="p-4 rounded-xl bg-linear-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="text-sm font-bold text-green-900">
            Lowest Price Tracked
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-900">
            {formatCurrency(phone.price)}
          </span>
          <span className="text-sm text-green-700">from 4 sellers</span>
        </div>
        <p className="text-xs text-slate-600 mt-2">
          Save up to AED 200 vs. suggested retail price
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button size="lg" className="flex-1 gap-2 text-base">
          <Award className="h-5 w-5" />
          Compare Prices
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <Heart className="h-5 w-5" />
        </Button>
        <Button size="lg" variant="outline" className="gap-2">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Price Alert */}
      <button className="w-full p-3 rounded-lg border-2 border-dashed border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600">
        <Bell className="h-4 w-4" />
        Get price drop alerts
      </button>
    </div>
  );
}

function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, text: "1 Year Warranty" },
    { icon: Truck, text: "Free Delivery" },
    { icon: RefreshCw, text: "7 Day Return" },
  ];

  return (
    <div className="mt-5 flex items-center gap-4 flex-wrap">
      {badges.map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-1.5 text-slate-600">
          <Icon className="h-4 w-4 text-blue-500" />
          <span className="text-xs font-medium">{text}</span>
        </div>
      ))}
    </div>
  );
}

function PhoneActions() {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 text-base h-12"
        >
          Find Best Deals
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-12 w-12 p-0 border-slate-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-500"
        >
          <Heart className="h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="h-12 w-12 p-0 border-slate-200"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
      <Button
        size="lg"
        variant="outline"
        className="w-full h-11 border-blue-200 text-blue-600 hover:bg-blue-50"
      >
        Compare with other phones
      </Button>
    </div>
  );
}
