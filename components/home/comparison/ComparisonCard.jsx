"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shuffle } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function ComparisonCard({ comparison }) {
  return (
    <Link
      href="/compare"
      className="shrink-0 w-[calc(100%-32px)] md:w-[calc(33.333%-11px)] group snap-start"
    >
      <div className="relative bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:border-[#F9B434]/50 transition-all duration-300 pinoy-card-hover">
        {/* Comparison Badge */}
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center gap-1 rounded-full bg-linear-to-r from-[#F9B434] to-[#E5A020] px-2 py-1 text-[10px] font-bold text-[#1F2A44]">
            <Shuffle className="h-3 w-3" />
            VS
          </span>
        </div>

        {/* Phone Images Row */}
        <div className="relative h-40 md:h-48 flex items-center justify-center bg-linear-to-br from-[#F9B434]/5 to-[#6C2BD9]/5 rounded-xl mb-3 overflow-hidden">
          <div className="flex items-center justify-center gap-2 w-full px-2">
            {comparison.phones.slice(0, 3).map((phone, phoneIdx) => (
              <div key={phone.slug} className="relative flex-1 h-32">
                <Image
                  src={`/mobile${(phoneIdx % 5) + 1}.jpg`}
                  alt={phone.name}
                  fill
                  className="object-contain p-1"
                  sizes="100px"
                />
                {phoneIdx < comparison.phones.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#F9B434] text-[#1F2A44] text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    VS
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-[#6C2BD9] transition-colors">
            {comparison.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2">
            {comparison.description}
          </p>

          {/* Phone Names */}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            {comparison.phones.slice(0, 2).map((phone) => (
              <div
                key={phone.slug}
                className="flex items-center justify-between text-[10px]"
              >
                <span className="text-slate-600 truncate max-w-[60%]">
                  {phone.name}
                </span>
                <span className="font-bold text-[#6C2BD9]">
                  {formatCurrency(phone.price)}
                </span>
              </div>
            ))}
            {comparison.phones.length > 2 && (
              <p className="text-[10px] text-slate-400">
                +{comparison.phones.length - 2} pa
              </p>
            )}
          </div>

          {/* Compare Button */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C2BD9] group-hover:gap-2 transition-all">
              I-Compare Ngayon
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
