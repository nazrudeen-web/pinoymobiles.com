import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function HeroSearch() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="relative">
        {/* Search container */}
        <div className="relative flex items-center bg-white rounded-xl border-2 border-slate-200 shadow-lg shadow-violet-600/10 hover:border-slate-300 transition-all duration-300">
          <Search className="absolute left-4 h-4 w-4 text-slate-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="iPhone 16, Samsung Galaxy S24..."
            className="flex-1 h-11 pl-11 pr-4 rounded-xl border-0 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0"
          />
          <Button className="absolute right-1 h-9 px-4 rounded-lg bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-sm font-medium shadow-lg shadow-violet-600/30 transition-all active:scale-95">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
