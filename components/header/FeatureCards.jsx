import { TrendingUp, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-time Prices",
    description: "Updated hourly from verified sellers",
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Price Tracking",
    description: "Get alerts when prices drop",
    bgColor: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    icon: Users,
    title: "Trusted Sellers",
    description: "All sellers are verified and rated",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

export default function FeatureCards() {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-5">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, bgColor, iconColor }) {
  return (
    <div className="rounded-xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`h-12 w-12 rounded-xl ${bgColor} flex items-center justify-center`}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
