"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { phones } from "@/lib/data/phones";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CarouselPhoneCard from "./CarouselPhoneCard";

const priceRanges = [
  {
    id: "under500",
    label: "Under 500 AED",
    min: 0,
    max: 500,
  },
  {
    id: "500-1000",
    label: "500 - 1000 AED",
    min: 500,
    max: 1000,
  },
  {
    id: "1000-1500",
    label: "1000 - 1500 AED",
    min: 1000,
    max: 1500,
  },
  {
    id: "1500-2500",
    label: "1500 - 2500 AED",
    min: 1500,
    max: 2500,
  },
  {
    id: "flagship",
    label: "2500+ AED",
    min: 2500,
    max: Infinity,
  },
];

export default function BudgetPhones() {
  const [activeTab, setActiveTab] = useState("under500");
  const scrollRef = useRef(null);

  const activeRange = priceRanges.find((r) => r.id === activeTab);
  const filteredPhones = phones
    .filter((p) => p.price >= activeRange.min && p.price < activeRange.max)
    .slice(0, 6);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      const scrollAmount = containerWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mx-auto mt-8 md:mt-10 w-full max-w-7xl px-4 md:px-6">
      {/* Header - Same pattern as other sections */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#008B8B]">
            💰 Phones by Budget
          </p>
          <h2 className="mt-1 text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Best Value Phones for Every Budget
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors sari-sari-glow"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors sari-sari-glow"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 text-slate-600" />
          </button>
          <Link
            href={`/phones?minPrice=${activeRange.min}&maxPrice=${activeRange.max}`}
            className="text-sm font-medium text-[#10B981] hover:opacity-80 hidden md:flex items-center gap-1 ml-2"
          >
            Tingnan Lahat
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Price Range Tabs - Compact pill style */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
        {priceRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => setActiveTab(range.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-full border ${
              activeTab === range.id
                ? "text-white bg-[#10B981] border-[#10B981] shadow-sm"
                : "text-slate-600 bg-white border-slate-200 hover:border-[#10B981]/50 hover:text-[#10B981]"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Phone Cards Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {filteredPhones.length > 0 ? (
            filteredPhones.map((phone, index) => (
              <CarouselPhoneCard
                key={phone.slug}
                phone={phone}
                index={index}
                badge="💰 BEST VALUE"
                badgeColors="bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]"
                imageColors="from-[#10B981]/5 to-emerald-50"
                hoverColor="hover:border-[#10B981]/40 group-hover:text-[#10B981]"
                priceColor="text-[#10B981]"
                subtitle="Best value"
                showSulitBadge={true}
              />
            ))
          ) : (
            <div className="w-full py-12 text-center text-slate-500">
              <p className="text-sm">
                No phones available in this price range.
              </p>
              <p className="text-xs mt-1">Check back later!</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile View All Link */}
      <Link
        href={`/phones?minPrice=${activeRange.min}&maxPrice=${activeRange.max}`}
        className="mt-4 flex md:hidden items-center justify-center gap-1 text-sm font-medium text-[#10B981] hover:opacity-80"
      >
        View All Best Value Phones
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
