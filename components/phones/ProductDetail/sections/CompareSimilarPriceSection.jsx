import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function CompareSimilarPriceSection({
  phone,
  compareCandidates,
  compareDemoImageSrc = "/mobile1.jpg",
}) {
  if (!compareCandidates || compareCandidates.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 bg-muted/30 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base md:text-lg font-bold text-foreground">
            Compare with similar price
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Compare 3 phones around the same budget.
          </p>
        </div>
      </div>

      <div className="p-4 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {compareCandidates.map((p) => (
          <Link
            key={p.slug}
            href={`/compare?phones=${encodeURIComponent(`${phone.slug},${p.slug}`)}`}
            className="group flex items-center gap-3 rounded-xl border border-border bg-background hover:bg-muted/30 transition-colors p-3"
          >
            <div className="relative h-14 w-14 rounded-lg overflow-hidden border border-border bg-muted/10 shrink-0">
              <Image
                src={compareDemoImageSrc}
                alt={p.name}
                fill
                sizes="56px"
                className="object-contain p-2"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-foreground line-clamp-1">
                {p.name}
              </div>
              <div className="mt-1 text-xs text-muted-foreground line-clamp-1">
                {p.specs?.processor || p.specs?.display || p.category || ""}
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="text-sm font-bold text-foreground whitespace-nowrap">
                  {typeof p.price === "number" ? formatCurrency(p.price) : "—"}
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-primary whitespace-nowrap">
                  Compare <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
