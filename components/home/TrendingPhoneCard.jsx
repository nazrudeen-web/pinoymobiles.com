"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Flame, Heart } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useState } from "react";

export default function TrendingPhoneCard({ phone, index = 0 }) {
  const [liked, setLiked] = useState(false);
  const brandName = typeof phone.brand === "string" ? phone.brand : phone.brand?.name || "";
  const rating = phone.expert_score ?? phone.rating ?? null;
  const price = phone.best_price ?? phone.price ?? 0;

  return (
    <Link
      href={`/phones/${phone.slug}`}
      className="shrink-0 w-[calc(50%-8px)] md:w-[calc(20%-13px)] group snap-start"
    >
      <div className="relative bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300 uae-card-hover uae-shine">
        {/* Like */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-2 right-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur border border-slate-200 text-slate-500 hover:text-primary transition-colors"
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current text-primary" : ""}`} />
        </button>

        {/* Phone Image */}
        <div className="relative h-40 md:h-48 flex items-center justify-center bg-linear-to-br from-primary/5 to-destructive/5 rounded-xl mb-3 overflow-hidden">
          <Image
            src={`/mobile${(index % 5) + 1}.jpg`}
            alt={phone.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 160px, 200px"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase">
              {brandName}
            </span>
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-[#EF3340] text-[#EF3340]" />
              <span className="text-[10px] font-semibold text-slate-700">
                {rating ?? ""}
              </span>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-primary transition-colors min-h-10">
            {phone.name}
          </h3>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-lg font-bold text-primary">
              {formatCurrency(price)}
            </p>
            <p className="text-[10px] text-slate-500">Best price today</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
