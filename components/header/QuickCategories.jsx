import Link from "next/link";
import { ArrowRight } from "lucide-react";

const quickCategories = [
  {
    name: "Sulit",
    icon: "💰",
    href: "/phones?category=budget",
    color:
      "bg-[#4CB9A8]/10 hover:bg-[#4CB9A8]/20 border-[#4CB9A8]/30 text-[#3B9C8D]",
  },
  {
    name: "Gaming",
    icon: "🎮",
    href: "/phones?category=gaming",
    color:
      "bg-[#6C2BD9]/10 hover:bg-[#6C2BD9]/20 border-[#6C2BD9]/30 text-[#6C2BD9]",
  },
  {
    name: "Flagship",
    icon: "👑",
    href: "/phones?category=flagship",
    color:
      "bg-[#F9B434]/10 hover:bg-[#F9B434]/20 border-[#F9B434]/30 text-[#E5A020]",
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
      "bg-[#DC2626]/10 hover:bg-[#DC2626]/20 border-[#DC2626]/30 text-[#DC2626]",
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
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C2BD9] hover:text-[#5521B0] transition-colors"
      >
        Tingnan lahat
        <ArrowRight className="h-3 w-3" />
      </Link>
    </>
  );
}
