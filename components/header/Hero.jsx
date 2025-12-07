import { CheckCircle2 } from "lucide-react";
import HeroSearch, { QuickStats } from "./HeroSearch";
import QuickCategories from "./QuickCategories";
import FeatureCards from "./FeatureCards";

export default function Hero() {
  return (
    <section className="bg-linear-to-b from-white to-blue-50/30">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        {/* Main Hero Card */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-white via-blue-50/20 to-violet-50/30 border border-slate-200/60 shadow-md p-6 md:p-7">
          {/* Background Accent */}
          <div className="absolute -top-20 -right-20 h-40 w-40 bg-blue-200 rounded-full opacity-10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 bg-violet-200 rounded-full opacity-10 blur-3xl" />

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-5">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                Find <span className="text-violet-600">Best Phone Deals</span>{" "}
                in the Philippines
              </h1>
              <TrustBadge />
            </div>

            {/* Search Bar + Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-5">
              <HeroSearch />
              <QuickStats />
            </div>

            <QuickCategories />
          </div>
        </div>

        <FeatureCards />
      </div>
    </section>
  );
}

function TrustBadge() {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
      <span className="inline-flex items-center gap-1.5 font-medium">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        Trusted by 5,000+ Filipino buyers
      </span>
      <span className="text-slate-400">•</span>
      <span className="font-medium">Updated daily</span>
      <span className="text-slate-400">•</span>
      <span className="font-medium">Verified sellers</span>
    </div>
  );
}
