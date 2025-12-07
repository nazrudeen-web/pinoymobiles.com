import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Smartphone,
  GitCompare,
  Newspaper,
  HelpCircle,
  Info,
  ChevronDown,
} from "lucide-react";

const menuItems = [
  { title: "Mobiles", href: "/phones", icon: Smartphone },
  { title: "Compare", href: "/compare", icon: GitCompare },
  { title: "News & Reviews", href: "/blogs", icon: Newspaper },
  { title: "How to Use", href: "/how-to-use", icon: HelpCircle },
  { title: "About Us", href: "/about", icon: Info },
];

export default function NavMenu({ vertical = false }) {
  if (vertical) {
    return (
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors font-medium"
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-1">
      {menuItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
