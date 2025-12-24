import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function SimilarCarousel({ currentPhone, allPhones }) {
  const currentPrice = Number(currentPhone.price || 0);
  const base = allPhones.filter((p) => p.slug !== currentPhone.slug);
  const byCategory = base.filter(
    (p) => p.category && p.category === currentPhone.category
  );
  const inRange = byCategory.filter(
    (p) => typeof p.price === "number" && Math.abs(p.price - currentPrice) <= 300
  );
  const pool = (inRange.length >= 6 ? inRange : byCategory.length >= 6 ? byCategory : base)
    .slice()
    .sort(
      (a, b) =>
        Math.abs((a.price || 0) - currentPrice) -
        Math.abs((b.price || 0) - currentPrice)
    )
    .slice(0, 10);

  return (
    <section className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Alternatives You Should Consider
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {pool.length} similar phones in your range
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const container = document.getElementById("similar-carousel");
                if (container)
                  container.scrollBy({
                    left: -container.offsetWidth * 0.8,
                    behavior: "smooth",
                  });
              }}
              className="h-8 w-8 rounded-full border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              onClick={() => {
                const container = document.getElementById("similar-carousel");
                if (container)
                  container.scrollBy({
                    left: container.offsetWidth * 0.8,
                    behavior: "smooth",
                  });
              }}
              className="h-8 w-8 rounded-full border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            <Link
              href="/phones"
              className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors ml-2"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="p-4">
        <div
          id="similar-carousel"
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {pool.map((similarPhone, index) => {
            return (
              <Link
                key={similarPhone.slug}
                href={`/phones/${similarPhone.slug}`}
                className="shrink-0 w-[calc(50%-8px)] md:w-[calc(20%-13px)] group snap-start"
              >
                <div className="bg-background rounded-xl border border-border p-4 hover:border-foreground/20 hover:shadow-md transition-all h-full">
                  <div className="relative h-36 md:h-44 flex items-center justify-center bg-muted/30 rounded-lg mb-3 overflow-hidden">
                    <Image
                      src={`/mobile${(index % 5) + 1}.jpg`}
                      alt={similarPhone.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 160px, 200px"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                      {similarPhone.brand}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 min-h-10">
                      {similarPhone.name}
                    </h3>
                    <div className="pt-3 border-t border-border">
                      <p className="text-lg font-bold text-foreground">
                        {formatCurrency(similarPhone.price)}
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
