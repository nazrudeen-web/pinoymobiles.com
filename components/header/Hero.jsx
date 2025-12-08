import { CheckCircle2 } from "lucide-react";
import HeroSearch from "./HeroSearch";
import QuickCategories from "./QuickCategories";

export default function Hero() {
  return (
    <section className="relative bg-linear-to-b from-white to-slate-50 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute -top-20 right-0 w-60 h-60 bg-violet-100 rounded-full blur-3xl opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-10">
        {/* Heading - Compact */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-2">
            <span className="bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Find Best Phone Deals
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto">
            Compare prices & save money
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-5">
          <HeroSearch />
        </div>

        {/* Quick trust indicator */}
        <div className="flex justify-center gap-4 text-xs md:text-sm text-slate-600 mb-6">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            5,000+ Buyers
          </span>
          <span className="text-slate-300">•</span>
          <span className="font-medium">Real-time Prices</span>
        </div>

        {/* Quick Categories - Compact */}
        <QuickCategories />
      </div>
    </section>
  );
}
