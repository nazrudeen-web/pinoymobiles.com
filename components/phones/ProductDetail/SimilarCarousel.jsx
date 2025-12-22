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
    <section className="scroll-mt-32 md:scroll-mt-36">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Alternatives
          </p>
          <h2 className="mt-1 text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Alternatives you should consider
          </h2>
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
            className="h-8 w-8 rounded-full border border-border bg-card hover:bg-muted/40 flex items-center justify-center transition-colors"
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
            className="h-8 w-8 rounded-full border border-border bg-card hover:bg-muted/40 flex items-center justify-center transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
          <Link
            href="/phones"
            className="text-sm font-medium text-muted-foreground hover:text-foreground hidden md:flex items-center gap-1 ml-2"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="relative">
        <div
          id="similar-carousel"
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
        >
          {pool.map((similarPhone, index) => {
            return (
                <Link
                  key={similarPhone.slug}
                  href={`/phones/${similarPhone.slug}`}
                  className="shrink-0 w-[calc(50%-8px)] md:w-[calc(20%-13px)] group snap-start"
                >
                  <div
                    className="relative bg-card rounded-2xl border border-border p-4 hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className="relative h-40 md:h-48 flex items-center justify-center bg-muted/30 rounded-xl mb-3 overflow-hidden"
                    >
                      <Image
                        src={`/mobile${(index % 5) + 1}.jpg`}
                        alt={similarPhone.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 160px, 200px"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                          {similarPhone.brand}
                        </span>
                      </div>
                      <h3
                        className="text-sm font-semibold text-foreground line-clamp-2 transition-colors min-h-10 group-hover:text-primary"
                      >
                        {similarPhone.name}
                      </h3>
                      <div className="pt-2 border-t border-border">
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
