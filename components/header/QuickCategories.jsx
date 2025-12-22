import Link from "next/link";
import { ArrowRight } from "lucide-react";

const quickCategories = [
  {
    name: "Best Value",
    icon: "💰",
    href: "/phones?category=budget",
    color: "bg-accent/10 hover:bg-accent/20 border-accent/30 text-accent",
  },
  {
    name: "Gaming",
    icon: "🎮",
    href: "/phones?category=gaming",
    color: "bg-primary/10 hover:bg-primary/15 border-primary/30 text-primary",
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
        Quick links:
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
        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        View all
        <ArrowRight className="h-3 w-3" />
      </Link>
    </>
  );
}
