import Link from "next/link";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function CompareCarousel({
  currentPhone,
  allPhones,
  compareRef,
}) {
  return (
    <section
      id="compare"
      ref={compareRef}
      className="scroll-mt-32 md:scroll-mt-36"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
            📊 Compare
          </p>
          <h2 className="mt-1 text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            Compare with Similar Phones
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const container = document.getElementById("compare-carousel");
              if (container)
                container.scrollBy({
                  left: -container.offsetWidth * 0.8,
                  behavior: "smooth",
                });
            }}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={() => {
              const container = document.getElementById("compare-carousel");
              if (container)
                container.scrollBy({
                  left: container.offsetWidth * 0.8,
                  behavior: "smooth",
                });
            }}
            className="h-8 w-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 text-slate-600" />
          </button>
          <Link
            href="/compare"
            className="text-sm font-medium text-violet-600 hover:opacity-80 hidden md:flex items-center gap-1 ml-2"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="relative">
        <div
          id="compare-carousel"
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {allPhones
            .filter((p) => p.slug !== currentPhone.slug)
            .slice(0, 8)
            .map((comparePhone, index) => {
              const gradientColors = [
                "from-violet-50 to-purple-50",
                "from-blue-50 to-cyan-50",
                "from-emerald-50 to-teal-50",
                "from-orange-50 to-red-50",
                "from-pink-50 to-rose-50",
              ][index % 5];
              const hoverColors = [
                "hover:border-violet-300 group-hover:text-violet-600",
                "hover:border-blue-300 group-hover:text-blue-600",
                "hover:border-emerald-300 group-hover:text-emerald-600",
                "hover:border-orange-300 group-hover:text-orange-600",
                "hover:border-pink-300 group-hover:text-pink-600",
              ][index % 5];
              const priceColors = [
                "text-violet-600",
                "text-blue-600",
                "text-emerald-600",
                "text-orange-600",
                "text-pink-600",
              ][index % 5];
              return (
                <Link
                  key={comparePhone.slug}
                  href={`/phones/${comparePhone.slug}`}
                  className="shrink-0 w-[calc(50%-8px)] md:w-[calc(20%-13px)] group snap-start"
                >
                  <div
                    className={`relative bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg ${
                      hoverColors.split(" ")[0]
                    } transition-all duration-300`}
                  >
                    <div
                      className={`relative h-40 md:h-48 flex items-center justify-center bg-linear-to-br ${gradientColors} rounded-xl mb-3 overflow-hidden`}
                    >
                      <Image
                        src={`/mobile${(index % 5) + 1}.jpg`}
                        alt={comparePhone.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 160px, 200px"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">
                          {comparePhone.brand}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-[10px] font-semibold text-slate-700">
                            {comparePhone.rating}
                          </span>
                        </div>
                      </div>
                      <h3
                        className={`text-sm font-semibold text-slate-900 line-clamp-2 ${
                          hoverColors.split(" ")[1] || ""
                        } transition-colors min-h-10`}
                      >
                        {comparePhone.name}
                      </h3>
                      <div className="pt-2 border-t border-slate-100">
                        <p className={`text-lg font-bold ${priceColors}`}>
                          {formatCurrency(comparePhone.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
