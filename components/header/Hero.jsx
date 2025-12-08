import { CheckCircle2, TrendingUp, Tag, Shield, Sparkles } from "lucide-react";
import HeroSearch from "./HeroSearch";
import QuickCategories from "./QuickCategories";
import PhFlag from "@/components/ui/PhFlag";

export default function Hero() {
  return (
    <section className="bg-linear-to-b from-[#FAF6ED] to-white py-5 md:py-6 banig-pattern">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        {/* Hero Card */}
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-4 md:p-6 relative overflow-hidden">
          {/* Subtle sun rays background */}
          <div className="absolute inset-0 sunrays-pattern opacity-50 pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-stretch gap-5 lg:gap-8">
            {/* Left: Title, Search, Filters */}
            <div className="flex-1 flex flex-col">
              {/* Title with Filipino flair */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F9B434]/10 text-[#E5A020] text-[10px] font-bold">
                    <Sparkles className="w-3 h-3" />
                    #1 sa Pilipinas
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#1F2A44] mb-1 flex items-center gap-2">
                  Hanap mo, Sulit Presyo!{" "}
                  <PhFlag className="w-6 h-4 inline-block" />
                </h1>
                <p className="text-sm text-slate-500">
                  I-compare ang prices mula sa 6,300+{" "}
                  <span className="text-[#4CB9A8] font-medium">
                    Verified PH Sellers
                  </span>
                </p>
              </div>

              {/* Search Bar - Full width */}
              <div className="w-full mb-4">
                <HeroSearch />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <QuickCategories />
              </div>
            </div>

            {/* Right: Feature highlights - Filipino themed */}
            <div className="w-full lg:w-72 xl:w-80 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6">
              <div className="flex flex-row lg:flex-col gap-3">
                {/* Feature 1 - Sulit Deals */}
                <div className="flex-1 lg:flex-none flex items-center gap-3 p-3 rounded-xl bg-[#F9B434]/10 border border-[#F9B434]/20 tricycle-bounce">
                  <div className="w-9 h-9 rounded-lg bg-linear-to-br from-[#F9B434] to-[#E5A020] flex items-center justify-center shrink-0 shadow-sm">
                    <Tag className="w-4 h-4 text-[#1F2A44]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1F2A44]">
                      Sulit Deals
                    </p>
                    <p className="text-xs text-slate-500 hidden sm:block">
                      Pinakamurang presyo
                    </p>
                  </div>
                </div>

                {/* Feature 2 - Live Updates */}
                <div className="flex-1 lg:flex-none flex items-center gap-3 p-3 rounded-xl bg-[#6C2BD9]/5 border border-[#6C2BD9]/10 tricycle-bounce">
                  <div className="w-9 h-9 rounded-lg bg-linear-to-br from-[#6C2BD9] to-[#5521B0] flex items-center justify-center shrink-0 shadow-sm">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1F2A44]">
                      Live Updates
                    </p>
                    <p className="text-xs text-slate-500 hidden sm:block">
                      Real-time na presyo
                    </p>
                  </div>
                </div>

                {/* Feature 3 - Trusted PH Sellers */}
                <div className="flex-1 lg:flex-none flex items-center gap-3 p-3 rounded-xl bg-[#4CB9A8]/10 border border-[#4CB9A8]/20 tricycle-bounce">
                  <div className="w-9 h-9 rounded-lg bg-linear-to-br from-[#4CB9A8] to-[#3B9C8D] flex items-center justify-center shrink-0 shadow-sm">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1F2A44]">
                      Trusted PH
                    </p>
                    <p className="text-xs text-slate-500 hidden sm:block">
                      100% Legit Stores
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
