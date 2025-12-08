import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Heart, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function PhoneListCard({ phone, index }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const watchingCount = Math.floor(Math.random() * 200) + 50;

  return (
    <Link
      href={`/phones/${phone.slug}`}
      className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-violet-300 transition-all duration-300"
    >
      {watchingCount > 100 && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-[10px] font-medium text-slate-600">
          <Eye className="h-3 w-3" />
          {watchingCount}+ watching
        </div>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          setIsFavorite(!isFavorite);
        }}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
      >
        <Heart
          className={`h-4 w-4 ${
            isFavorite ? "fill-pink-500 text-pink-500" : "text-slate-400"
          }`}
        />
      </button>

      <div className="relative h-36 sm:h-44 bg-slate-50 flex items-center justify-center">
        <Image
          src={`/mobile${(index % 5) + 1}.jpg`}
          alt={phone.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-violet-600 transition-colors min-h-10">
          {phone.name}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-slate-700">
              {phone.rating}
            </span>
          </div>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500">{phone.os}</span>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-lg font-bold text-slate-900">
            {formatCurrency(phone.price)}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">from 5+ stores</p>
        </div>
      </div>
    </Link>
  );
}
