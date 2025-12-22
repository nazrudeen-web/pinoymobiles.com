import {
  Star,
  ArrowRight,
  Smartphone,
  Wallet,
  Target,
  GitCompare,
  Camera,
  Battery,
  Gamepad2,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import HeroSearch from "./HeroSearch";
import UAEFlag from "@/components/ui/UAEFlag";

const actionCards = [
  {
    id: "all-phones",
    icon: Smartphone,
    title: "All Phones",
    description: "Browse with reviews & prices",
    href: "/phones",
    color: "from-primary to-primary/80",
  },
  {
    id: "by-budget",
    icon: Wallet,
    title: "By Budget",
    description: "Under 500, 1000, 2000 AED",
    href: "/phones?sort=budget",
    color: "from-accent to-accent/80",
    badge: "🔥",
  },
  {
    id: "best-for-you",
    icon: Target,
    title: "Best for You",
    description: "Camera • Gaming • Work",
    href: "/phones?filter=purpose",
    color: "from-primary to-secondary",
  },
  {
    id: "compare",
    icon: GitCompare,
    title: "Compare",
    description: "Side-by-side comparison",
    href: "/compare",
    color: "from-primary to-accent",
  },
];

export default function Hero() {
  return (
    <section className="bg-background py-6 md:py-8 arabic-pattern">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        {/* Main Hero Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-5 md:p-8 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 sunrays-pattern opacity-30 pointer-events-none" />

          <div className="relative">
            {/* Top: Title + Search */}
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
                Find the Right Phone for You
                <UAEFlag className="w-7 h-5" />
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto">
                Search by budget and compare prices across stores.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <HeroSearch />
            </div>

            {/* Action Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {actionCards.map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className="group relative flex items-center gap-3 p-3 md:p-4 rounded-xl bg-muted border border-border hover:border-muted-foreground hover:bg-card hover:shadow-md transition-all duration-200"
                >
                  {/* Badge */}
                  {card.badge && (
                    <span className="absolute -top-1.5 -right-1.5 text-sm">
                      {card.badge}
                    </span>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    <card.icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {card.description}
                    </p>
                  </div>

                  {/* Arrow on hover */}
                  <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all shrink-0 hidden md:block" />
                </Link>
              ))}
            </div>

            {/* Bottom stats line */}
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-center text-xs text-muted-foreground">
              Compare prices across stores • Find phones by budget
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
