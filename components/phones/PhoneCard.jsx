import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

export default function PhoneCard({ phone, index = 0 }) {
  const brandName = typeof phone.brand === "string" ? phone.brand : phone.brand?.name || "";
  const rating = phone.expert_score ?? phone.rating ?? null;
  const price = phone.best_price ?? phone.price ?? 0;
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
      {/* Image Area */}
      <div className="relative h-40 bg-linear-to-br from-muted/60 to-muted/40 flex items-center justify-center overflow-hidden">
        <Image
          src={`/mobile${(index % 5) + 1}.jpg`}
          alt={phone.name}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform"
          sizes="300px"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-between p-5">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              {brandName}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-foreground">
                {rating ?? ""}
              </span>
            </div>
          </div>

          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {phone.name}
          </h3>

          <p className="mt-3 text-2xl font-bold text-foreground">
            {formatCurrency(price)}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">{phone.category}</p>

          <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
            {phone.highlights.slice(0, 2).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 line-clamp-1">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button asChild className="mt-4 w-full">
          <Link href={`/phones/${phone.slug}`}>
            View details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
