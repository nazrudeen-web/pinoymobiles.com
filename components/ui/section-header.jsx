"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function SectionHeader({
  label,
  title,
  description,
  labelColor = "text-[#00843D]",
  linkHref = "/phones",
  linkText = "Tingnan Lahat",
  onScrollLeft,
  onScrollRight,
  showNavigation = true,
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <p
          className={`text-xs font-semibold uppercase tracking-wide ${labelColor}`}
        >
          {label}
        </p>
        <h2 className="mt-1 text-xl md:text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-xs md:text-sm text-slate-600">
            {description}
          </p>
        )}
      </div>

      {showNavigation && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onScrollLeft}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors sari-sari-glow"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={onScrollRight}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors sari-sari-glow"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 text-slate-600" />
          </button>
          <Link
            href={linkHref}
            className={`text-sm font-medium ${labelColor} hover:opacity-80 hidden md:flex items-center gap-1 ml-2`}
          >
            {linkText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
