import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function HeroSearch() {
  return (
    <div className="w-full ">
      <div className="relative">
        {/* Search container */}
        <div className="relative flex items-center bg-white rounded-xl border-2 border-slate-200 shadow-lg shadow-[#00843D]/10 hover:border-[#00843D]/30 focus-within:border-[#00843D]/50 focus-within:shadow-[#00843D]/20 transition-all duration-300">
          <Search className="absolute left-4 h-4 w-4 text-slate-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="Hanapin: iPhone 16, Samsung Galaxy S24..."
            className="flex-1 h-11 w-full pl-11 pr-4 rounded-xl border-0 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0"
          />
          <Button className="absolute right-1 h-9 px-4 rounded-lg bg-linear-to-r from-[#00843D] to-[#006B31] hover:from-[#006B31] hover:to-[#00843D] text-white text-sm font-medium shadow-lg shadow-[#00843D]/30 transition-all active:scale-95 uae-shine">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
