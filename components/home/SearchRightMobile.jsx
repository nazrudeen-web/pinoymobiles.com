"use client";

import Link from "next/link";
import {
  Smartphone,
  Wallet,
  Target,
  GitCompare,
  ArrowRight,
  Camera,
  Battery,
  Gamepad2,
  GraduationCap,
} from "lucide-react";

const actionCards = [
  {
    id: "all-phones",
    icon: Smartphone,
    title: "All Smartphones",
    description: "Latest mobiles with reviews & prices",
    href: "/phones",
    color: "from-[#00843D] to-[#006B31]",
    bgColor: "bg-[#00843D]/5",
    borderColor: "border-[#00843D]/20",
    hoverColor: "hover:border-[#00843D]/40",
    iconBg: "bg-[#00843D]",
  },
  {
    id: "by-budget",
    icon: Wallet,
    title: "By Budget",
    description: "Best phones under 500, 1000, 2000 AED",
    href: "/phones?sort=budget",
    color: "from-[#008B8B] to-[#006B6B]",
    bgColor: "bg-[#008B8B]/5",
    borderColor: "border-[#008B8B]/20",
    hoverColor: "hover:border-[#008B8B]/40",
    iconBg: "bg-[#008B8B]",
    badge: "🔥 Popular",
  },
  {
    id: "best-for-you",
    icon: Target,
    title: "Best for You",
    description: "Camera • Battery • Gaming • Work",
    href: "/phones?filter=purpose",
    color: "from-[#EF3340] to-[#C41E2A]",
    bgColor: "bg-[#EF3340]/5",
    borderColor: "border-[#EF3340]/20",
    hoverColor: "hover:border-[#EF3340]/40",
    iconBg: "bg-[#EF3340]",
    subIcons: [Camera, Battery, Gamepad2, GraduationCap],
  },
  {
    id: "compare",
    icon: GitCompare,
    title: "Compare Phones",
    description: "Compare specs & prices side-by-side",
    href: "/compare",
    color: "from-[#CC0000] to-[#B91C1C]",
    bgColor: "bg-[#CC0000]/5",
    borderColor: "border-[#CC0000]/20",
    hoverColor: "hover:border-[#CC0000]/40",
    iconBg: "bg-[#CC0000]",
  },
];

export default function SearchRightMobile() {
  return (
    <section className="mx-auto mt-8 md:mt-10 w-full max-w-7xl px-4 md:px-6">
      {/* Section Header */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] mb-2">
          🔍 Search the Right Mobile
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Find the perfect phone for your needs and budget — with honest reviews
          and best prices
        </p>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {actionCards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className={`group relative p-4 md:p-5 rounded-2xl border-2 ${card.bgColor} ${card.borderColor} ${card.hoverColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          >
            {/* Badge */}
            {card.badge && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#CC0000] text-white text-[10px] font-bold">
                {card.badge}
              </span>
            )}

            {/* Icon */}
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}
            >
              <card.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>

            {/* Title */}
            <h3 className="text-sm md:text-base font-bold text-[#1A1A1A] mb-1 group-hover:text-[#00843D] transition-colors">
              {card.title}
            </h3>

            {/* Description */}
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              {card.description}
            </p>

            {/* Sub Icons (for Best for You) */}
            {card.subIcons && (
              <div className="flex items-center gap-1.5 mt-3">
                {card.subIcons.map((SubIcon, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center"
                  >
                    <SubIcon className="w-3 h-3 text-slate-500" />
                  </div>
                ))}
              </div>
            )}

            {/* Arrow */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-4 h-4 text-[#00843D]" />
            </div>
          </Link>
        ))}
      </div>

      {/* Value Proposition */}
      <div className="mt-6 md:mt-8 text-center">
        <p className="text-xs text-slate-400">
          ✨ Find the right phone for your budget • Compare prices across stores
        </p>
      </div>
    </section>
  );
}
