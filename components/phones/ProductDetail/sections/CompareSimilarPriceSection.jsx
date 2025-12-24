import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function CompareSimilarPriceSection({
  phone,
  compareCandidates,
  compareDemoImageSrc = "/mobile1.jpg",
}) {
  if (!compareCandidates || compareCandidates.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground">
          Compare Similar Phones
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {compareCandidates.length} alternatives in your budget range
        </p>
      </div>

      {/* Comparison cards */}
      <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {compareCandidates.map((p) => (
          <Link
            key={p.slug}
            href={`/compare?phones=${encodeURIComponent(`${phone.slug},${p.slug}`)}`}
            className="group rounded-xl border border-border bg-background hover:border-foreground/20 hover:shadow-md transition-all"
          >
            <div className="p-4">
              {/* Phone image */}
              <div className="relative h-32 mb-4 rounded-lg bg-muted/30 overflow-hidden flex items-center justify-center">
                <Image
                  src={compareDemoImageSrc}
                  alt={p.name}
                  fill
                  sizes="200px"
                  className="object-contain p-4"
                />
              </div>

              {/* Phone info */}
              <div className="space-y-1">
                <div className="text-[10px] font-semibold text-muted-foreground uppercase">
                  {p.brand}
                </div>
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 min-h-[2.5rem]">
                  {p.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {p.specs?.processor || p.specs?.display || ""}
                </p>
              </div>

              {/* Price and CTA */}
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <div className="text-lg font-bold text-foreground">
                  {typeof p.price === "number" ? formatCurrency(p.price) : "—"}
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:text-primary/80 transition-colors">
                  Compare
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
