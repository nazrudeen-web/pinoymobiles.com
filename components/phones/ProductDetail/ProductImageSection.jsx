import { Star, Heart, Share2, ChevronRight } from "lucide-react";
import Link from "next/link";

export function ProductBreadcrumb({ phone }) {
  return (
    <>
      <div className=" bg-white border-b border-slate-200 md:hidden">
        <div className="px-4 py-2.5">
          <nav className="flex items-center gap-1 text-xs text-slate-500 overflow-x-auto scrollbar-hide">
            <Link href="/" className="hover:text-violet-600 whitespace-nowrap">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link
              href="/phones"
              className="hover:text-violet-600 whitespace-nowrap"
            >
              Phones
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-slate-900 font-medium truncate">
              {phone.name}
            </span>
          </nav>
        </div>
      </div>

      <div className=" max-w-7xl mx-auto hidden md:block px-6 pt-4">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link href="/" className="hover:text-violet-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/phones"
            className="hover:text-violet-600 transition-colors"
          >
            Phones
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href={`/phones?brand=${phone.brand}`}
            className="hover:text-violet-600 transition-colors"
          >
            {phone.brand}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-900 font-medium">{phone.name}</span>
        </nav>
      </div>
    </>
  );
}

export function ProductImageSection({
  phone,
  isFavorite,
  setIsFavorite,
  selectedImage,
  setSelectedImage,
}) {
  return (
    <div className="lg:col-span-5">
      <div className="relative bg-white rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden">
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <span className="px-2 py-1 bg-emerald-500 text-white text-[10px] md:text-xs font-bold rounded">
            BEST PRICE
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full transition-all ${
              isFavorite
                ? "bg-pink-100 text-pink-600"
                : "bg-white/90 backdrop-blur text-slate-500 hover:text-pink-600"
            } shadow-sm`}
          >
            <Heart
              className={`h-4 w-4 md:h-5 md:w-5 ${
                isFavorite ? "fill-current" : ""
              }`}
            />
          </button>
          <button className="p-2 rounded-full bg-white/90 backdrop-blur text-slate-500 hover:text-violet-600 shadow-sm transition-all">
            <Share2 className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
        <div className="relative aspect-square flex items-center justify-center p-6 md:p-10">
          <img
            src={`/mobile${selectedImage}.jpg`}
            alt={phone.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-3 md:mt-4 justify-center md:justify-start">
        {[1, 2, 3, 4].map((i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl border-2 transition-all ${
              selectedImage === i
                ? "border-violet-600 bg-slate-50"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <img
              src={`/mobile${i}.jpg`}
              alt={`View ${i}`}
              className="w-full h-full object-contain p-1"
            />
          </button>
        ))}
        <button className="w-14 h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl border-2 border-slate-200 hover:border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 text-xs font-medium transition-all">
          +5
        </button>
      </div>
    </div>
  );
}
