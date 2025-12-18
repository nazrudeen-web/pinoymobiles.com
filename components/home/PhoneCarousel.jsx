"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function PhoneCarousel({
  label,
  labelIcon,
  labelColor = "text-[#00843D]",
  title,
  viewAllHref = "/phones",
  viewAllText = "Tingnan Lahat",
  mobileViewAllText,
  children,
}) {
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
    <section className="mx-auto mt-8 md:mt-10 w-full max-w-7xl px-4 md:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${labelColor}`}
          >
            {labelIcon} {label}
          </p>
          <h2 className="mt-1 text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {title}
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
            href={viewAllHref}
            className={`text-sm font-medium ${labelColor} hover:opacity-80 hidden md:flex items-center gap-1 ml-2`}
          >
            {viewAllText}
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
          {children}
        </div>
      </div>

      {/* Mobile View All Link */}
      {mobileViewAllText && (
        <Link
          href={viewAllHref}
          className={`mt-4 flex md:hidden items-center justify-center gap-1 text-sm font-medium ${labelColor} hover:opacity-80`}
        >
          {mobileViewAllText}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </section>
  );
}
