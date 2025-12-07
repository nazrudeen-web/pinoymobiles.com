"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { comparisonSets, phones } from "@/lib/data/phones";
import { useRef } from "react";
import ComparisonCard from "./comparison/ComparisonCard";
import QuickPhoneCard from "./comparison/QuickPhoneCard";

export default function ComparisonPromo() {
  const scrollRef = useRef(null);

  // Get phone details for comparison sets
  const comparisons = comparisonSets.map((set) => ({
    ...set,
    phones: set.slugs
      .map((slug) => phones.find((p) => p.slug === slug))
      .filter(Boolean),
  }));

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
    <section className="mx-auto mt-16 w-full max-w-7xl px-4 md:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            ⚔️ Compare
          </p>
          <h2 className="mt-1 text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Quick Phone Comparisons
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 text-slate-600" />
          </button>
          <Link
            href="/compare"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 hidden md:flex items-center gap-1 ml-2"
          >
            Compare All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {comparisons.map((comparison) => (
            <ComparisonCard key={comparison.title} comparison={comparison} />
          ))}
          {phones.slice(0, 3).map((phone, index) => (
            <QuickPhoneCard key={phone.slug} phone={phone} index={index} />
          ))}
        </div>
      </div>

      {/* Mobile View All Link */}
      <Link
        href="/compare"
        className="mt-4 flex md:hidden items-center justify-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        View All Comparisons
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
