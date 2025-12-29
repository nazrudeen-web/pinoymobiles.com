"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function QuickPhoneCard({ phone, index }) {
  const brandName = typeof phone.brand === "string" ? phone.brand : phone.brand?.name || "";
  const rating = phone.expert_score ?? phone.rating ?? null;
  const price = phone.best_price ?? phone.price ?? 0;
  return (
    <Link
      href={`/phones/${phone.slug}`}
      className="shrink-0 w-[calc(50%-8px)] md:w-[calc(20%-13px)] group snap-start"
    >
      <div className="relative bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:border-[#00843D]/30 transition-all duration-300 h-full uae-card-hover uae-shine">
        {/* Phone Image */}
        <div className="relative h-40 md:h-48 flex items-center justify-center bg-linear-to-br from-[#FAFAFA] to-[#00843D]/5 rounded-xl mb-3 overflow-hidden">
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

          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-[#00843D] transition-colors min-h-10">
            {phone.name}
          </h3>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-lg font-bold text-[#00843D]">
              {formatCurrency(price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
