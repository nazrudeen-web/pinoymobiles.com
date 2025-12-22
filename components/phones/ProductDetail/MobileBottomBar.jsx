import { useState } from "react";
import { Heart } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function MobileBottomBar({ lowestPrice, retailersCount }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-3 z-40 md:hidden">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground truncate">
            From {retailersCount} sellers
          </p>
          <p className="text-lg font-bold text-foreground">
            {formatCurrency(lowestPrice)}
          </p>
        </div>
        <button type="button" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm transition-all">
          Compare Prices
        </button>
        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-3 rounded-xl border-2 transition-all ${
            isFavorite
              ? "bg-pink-50 border-pink-200 text-pink-600"
              : "border-border text-muted-foreground hover:bg-muted/30"
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>
    </div>
  );
}
