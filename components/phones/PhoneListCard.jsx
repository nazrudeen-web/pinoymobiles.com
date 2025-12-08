import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { cardStyles } from "@/lib/design-system";

export default function PhoneListCard({ phone, index }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const watchingCount = Math.floor(Math.random() * 200) + 50;

  return (
    <Link
      href={`/phones/${phone.slug}`}
      className="group relative bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg hover:border-violet-400/50 hover:shadow-violet-600/10 transition-all duration-300"
    >
      {watchingCount > 100 && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 shadow-md">
          <Eye className="h-3.5 w-3.5 text-emerald-600" />
          <span>{watchingCount}+ watching</span>
        </div>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          setIsFavorite(!isFavorite);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white shadow-md transition-all active:scale-90"
      >
        <Heart
          className={`h-4 w-4 ${
            isFavorite
              ? "fill-pink-500 text-pink-500"
              : "text-slate-400 hover:text-slate-500"
          }`}
        />
      </button>

      <div className="relative h-36 sm:h-44 bg-slate-50/80 flex items-center justify-center overflow-hidden group-hover:bg-slate-50 transition-colors">
        <Image
          src={`/mobile${(index % 5) + 1}.jpg`}
          alt={phone.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-violet-600 transition-colors min-h-10 leading-snug">
          {phone.name}
        </h3>

        <div className="flex items-center gap-2 mt-2.5">
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-slate-700">
              {phone.rating}
            </span>
          </div>
          <span className="text-xs text-slate-300">•</span>
          <span className="text-xs text-slate-600 font-medium">{phone.os}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100/80">
          <p className="text-lg font-bold text-violet-600">
            {formatCurrency(phone.price)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            from 5+ stores
          </p>
        </div>
      </div>
    </Link>
  );
}
