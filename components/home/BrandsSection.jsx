"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { featuredBrands } from "@/lib/data/phones";
import { useRef } from "react";

const brandColors = {
  Apple: "hover:bg-black hover:border-black",
  Samsung: "hover:bg-blue-600 hover:border-blue-600",
  Xiaomi: "hover:bg-orange-600 hover:border-orange-600",
  OPPO: "hover:bg-primary hover:border-primary",
  Vivo: "hover:bg-blue-500 hover:border-blue-500",
  Realme: "hover:bg-yellow-500 hover:border-yellow-500",
  POCO: "hover:bg-red-600 hover:border-red-600",
  OnePlus: "hover:bg-red-500 hover:border-red-500",
  Google: "hover:bg-blue-500 hover:border-blue-500",
  Motorola: "hover:bg-red-600 hover:border-red-600",
};

export default function BrandsHorizontal() {
  const scrollRef = useRef(null);

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            🛒 UAE Best Sellers
          </p>
          <h2 className="mt-1 text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Top Brands in UAE
          </h2>
          <p className="mt-2 text-xs md:text-sm text-muted-foreground">
            Compare prices and deals across stores for Apple, Samsung,
            Xiaomi, and other popular brands.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
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
        </div>
      </div>

      {/* Brands Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {featuredBrands.map((brand, index) => (
            <Link
              key={brand}
              href={`/phones?brand=${brand}`}
              className="shrink-0 w-[calc(25%-9px)] md:w-[calc(20%-12px)] lg:w-[calc(16.666%-10px)] snap-start"
            >
              <div
                className={`group flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-all duration-300 h-full min-h-40 uae-card-hover ${
                  brandColors[brand] || "hover:bg-slate-100"
                }`}
              >
                <div className="relative h-16 w-16 md:h-20 md:w-20 group-hover:scale-125 transition-transform duration-300">
                  <Image
                    src={`/brand${(index % 4) + 1}.png`}
                    alt={brand}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <span className="text-xs md:text-sm font-bold text-center text-foreground group-hover:text-white transition-colors px-2">
                  {brand}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Browse All Link */}
      <div className="mt-6 flex items-center justify-center md:justify-start">
        <Link
          href="/phones"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary/85 hover:from-primary/90 hover:to-primary text-primary-foreground text-sm font-semibold transition-colors shadow-lg shadow-primary/20 uae-shine"
        >
          View all brands
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
