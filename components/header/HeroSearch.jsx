import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function HeroSearch() {
  return (
    <div className="md:col-span-2">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
        <Input
          type="text"
          placeholder="iPhone 16, Samsung Galaxy S24, Xiaomi..."
          className="h-12 pl-10 pr-24 rounded-xl border-slate-200 bg-white text-sm focus:border-violet-300 focus:ring-violet-100"
        />
        <Button className="absolute right-1.5 h-10 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 shadow-md">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function QuickStats() {
  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3 md:col-span-1">
      <StatCard value="50K+" label="Phones" />
      <StatCard value="5K+" label="Sellers" />
      <StatCard value="₱2.5K" label="Savings" highlight />
    </div>
  );
}

function StatCard({ value, label, highlight = false }) {
  return (
    <div className="rounded-xl bg-white/60 backdrop-blur-sm border border-slate-100 p-3 text-center hover:bg-white/80 transition-colors">
      <div
        className={`text-xl font-bold ${
          highlight ? "text-emerald-600" : "text-slate-900"
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
    </div>
  );
}
