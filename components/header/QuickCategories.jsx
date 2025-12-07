import Link from "next/link";
import { ArrowRight } from "lucide-react";

const quickCategories = [
  {
    name: "Budget",
    icon: "💰",
    href: "/phones?category=budget",
    color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
  },
  {
    name: "Gaming",
    icon: "🎮",
    href: "/phones?category=gaming",
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200",
  },
  {
    name: "Flagship",
    icon: "👑",
    href: "/phones?category=flagship",
    color: "bg-amber-50 hover:bg-amber-100 border-amber-200",
  },
  {
    name: "Camera",
    icon: "📷",
    href: "/phones?category=camera",
    color: "bg-pink-50 hover:bg-pink-100 border-pink-200",
  },
];

export default function QuickCategories() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        Quick filters:
      </span>
      {quickCategories.map((cat) => (
        <Link
          key={cat.name}
          href={cat.href}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:shadow-sm ${cat.color}`}
        >
          <span>{cat.icon}</span>
          {cat.name}
        </Link>
      ))}
      <Link
        href="/phones"
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-violet-600 hover:text-violet-700 hover:bg-violet-50 transition-all ml-auto"
      >
        View all
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
