import { TrendingUp, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-time Prices",
    description: "Updated hourly from verified sellers across the Philippines",
    bgColor: "from-emerald-100 to-teal-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Price Tracking",
    description: "Get instant alerts when prices drop on your wishlist",
    bgColor: "from-violet-100 to-purple-100",
    iconColor: "text-violet-600",
  },
  {
    icon: Users,
    title: "Trusted Sellers",
    description: "All sellers verified, rated, and backed by buyer protection",
    bgColor: "from-blue-100 to-cyan-100",
    iconColor: "text-blue-600",
  },
];

export default function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-7">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, bgColor, iconColor }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md p-5 transition-all duration-300 group hover:border-slate-300/80">
      <div className="flex items-start gap-4 mb-3">
        <div
          className={`h-12 w-12 rounded-xl bg-linear-to-br ${bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mt-0.5">
          {title}
        </h3>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed pl-16 -mt-6">
        {description}
      </p>
    </div>
  );
}
