"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function QuickPhoneCard({ phone, index }) {
  return (
    <Link
      href={`/phones/${phone.slug}`}
      className="shrink-0 w-[calc(50%-8px)] md:w-[calc(20%-13px)] group snap-start"
    >
      <div className="relative bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:border-[#6C2BD9]/30 transition-all duration-300 h-full pinoy-card-hover jeepney-shine">
        {/* Phone Image */}
        <div className="relative h-40 md:h-48 flex items-center justify-center bg-linear-to-br from-[#FAF6ED] to-[#6C2BD9]/5 rounded-xl mb-3 overflow-hidden">
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
              {phone.brand}
            </span>
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-[#F9B434] text-[#F9B434]" />
              <span className="text-[10px] font-semibold text-slate-700">
                {phone.rating}
              </span>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-[#6C2BD9] transition-colors min-h-10">
            {phone.name}
          </h3>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-lg font-bold text-[#6C2BD9]">
              {formatCurrency(phone.price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
