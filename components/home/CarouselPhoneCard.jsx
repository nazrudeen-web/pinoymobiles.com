"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";

export default function CarouselPhoneCard({
  phone,
  index = 0,
  imageColors = "from-orange-50 to-red-50",
  hoverColor = "hover:border-orange-300 group-hover:text-orange-600",
  priceColor = "text-orange-600",
  subtitle,
}) {
  const [liked, setLiked] = useState(false);
  const brandName = typeof phone.brand === "string" ? phone.brand : phone.brand?.name || "";
  const rating = phone.expert_score ?? phone.rating ?? null;
  const price = phone.best_price ?? phone.price ?? 0;
  const imageSrc = phone.main_image || (phone.images?.[0]?.image_url ?? null);
  const fallbackSrc = `/mobile${(index % 5) + 1}.jpg`;

  return (
    <Link
      href={`/phones/${phone.slug}`}
      className="shrink-0 w-[calc(50%-8px)] md:w-[calc(20%-13px)] group snap-start"
    >
      <div
        className={`relative bg-card rounded-2xl border border-border p-4 hover:shadow-lg ${hoverColor.split(" ")[0]
          } transition-all duration-300 uae-card-hover uae-shine`}
      >
        {/* Like */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-2 right-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 backdrop-blur border border-border text-muted-foreground hover:text-primary transition-colors"
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current text-primary" : ""}`} />
        </button>

        {/* Phone Image */}
        <div
          className={`relative h-40 md:h-48 flex items-center justify-center bg-linear-to-br ${imageColors} rounded-xl mb-3 overflow-hidden`}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={phone.name}
              className="h-full w-full object-contain p-4"
              loading="lazy"
            />
          ) : (
            <img
              src={fallbackSrc}
              alt={phone.name}
              className="h-full w-full object-contain p-4"
              loading="lazy"
            />
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">
              {brandName}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground">
              {rating ?? ""}
            </span>
          </div>

          <h3
            className={`text-sm font-semibold text-foreground line-clamp-2 ${hoverColor.split(" ")[1] || ""
              } transition-colors min-h-10`}
          >
            {phone.name}
          </h3>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-lg font-bold ${priceColor}`}>
                  {formatCurrency(price)}
                </p>
                {subtitle && (
                  <p className="text-[10px] text-muted-foreground">{subtitle}</p>
                )}
              </div>
              <span className="text-[9px] text-muted-foreground text-right">
                compare store prices
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
