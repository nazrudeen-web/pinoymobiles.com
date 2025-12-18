import Link from "next/link";
import { ArrowRight } from "lucide-react";

const quickCategories = [
  {
    name: "Best Value",
    icon: "💰",
    href: "/phones?category=budget",
    color:
      "bg-[#10B981]/10 hover:bg-[#10B981]/20 border-[#10B981]/30 text-[#059669]",
  },
  {
    name: "Gaming",
    icon: "🎮",
    href: "/phones?category=gaming",
    color:
      "bg-[#00843D]/10 hover:bg-[#00843D]/20 border-[#00843D]/30 text-[#00843D]",
  },
  {
    name: "Flagship",
    icon: "👑",
    href: "/phones?category=flagship",
    color:
      "bg-[#EF3340]/10 hover:bg-[#EF3340]/20 border-[#EF3340]/30 text-[#C41E2A]",
  },
  {
    name: "Camera",
    icon: "📷",
    href: "/phones?category=camera",
    color: "bg-pink-50 hover:bg-pink-100 border-pink-200 text-pink-600",
  },
  {
    name: "Hot TikTok",
    icon: "🔥",
    href: "/phones?category=trending",
    color:
      "bg-[#EF3340]/10 hover:bg-[#EF3340]/20 border-[#EF3340]/30 text-[#EF3340]",
  },
];

export default function QuickCategories() {
  return (
    <>
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        Mabilisang Hanap:
      </span>
      {quickCategories.map((cat) => (
        <Link
          key={cat.name}
          href={cat.href}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:shadow-sm sari-sari-glow ${cat.color}`}
        >
          <span>{cat.icon}</span>
          {cat.name}
        </Link>
      ))}
      <Link
        href="/phones"
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#00843D] hover:text-[#006B31] transition-colors"
      >
        Tingnan lahat
        <ArrowRight className="h-3 w-3" />
      </Link>
    </>
  );
}
