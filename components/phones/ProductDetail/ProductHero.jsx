import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  Heart,
  Share2,
  ChevronRight,
  Package,
  Clock,
  ShieldCheck,
  Zap,
  ChevronDown,
  Bell,
  TrendingDown,
} from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function ProductHero({
  phone,
  lowestPrice,
  highestPrice,
  retailersCount,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(1);

  return (
    <>
      {/* Breadcrumb - Mobile */}
      <div className="bg-white border-b border-slate-200 md:hidden">
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

      {/* Main Product Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb - Desktop */}
          <div className="hidden md:block px-6 pt-4">
            <nav className="flex items-center gap-1.5 text-sm text-slate-500">
              <Link
                href="/"
                className="hover:text-violet-600 transition-colors"
              >
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

          {/* Product Hero */}
          <div className="px-4 md:px-6 py-4 md:py-8">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
              {/* Left Column - Images */}
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
                    <Image
                      src={`/mobile${selectedImage}.jpg`}
                      alt={phone.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 mt-3 md:mt-4 justify-center md:justify-start">
                  {[1, 2, 3, 4].map((i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-14 h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl border-2 overflow-hidden transition-all bg-white ${
                        selectedImage === i
                          ? "border-violet-500 ring-2 ring-violet-500/20"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <Image
                        src={`/mobile${i}.jpg`}
                        alt={`View ${i}`}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    </button>
                  ))}
                  <button className="w-14 h-14 md:w-16 md:h-16 rounded-lg md:rounded-xl border-2 border-slate-200 hover:border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 text-xs font-medium transition-all">
                    +5
                  </button>
                </div>
              </div>

              {/* Right Column - Product Info */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <Star className="h-4 w-4 md:h-5 md:w-5 fill-amber-400/30 text-amber-400" />
                  </div>
                  <span className="text-sm md:text-base font-semibold text-slate-900">
                    {phone.rating}
                  </span>
                  <span className="text-sm text-slate-500 hidden md:inline">
                    •
                  </span>
                  <Link
                    href="#reviews"
                    className="text-sm text-violet-600 hover:underline hidden md:inline"
                  >
                    847 reviews
                  </Link>
                </div>

                <h1 className="text-lg md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
                  {phone.name}
                </h1>

                <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6 leading-relaxed">
                  {phone.specs?.storage || "256GB"} •{" "}
                  {phone.specs?.ram || "8GB RAM"} •{" "}
                  {phone.specs?.display?.split(",")[0] || '6.7" AMOLED Display'}
                </p>

                <div className="bg-slate-50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
                  <p className="text-sm text-slate-600 mb-1 md:mb-2">
                    Compare prices from
                  </p>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-xl md:text-2xl font-bold text-slate-900">
                      {formatCurrency(lowestPrice)}
                    </span>
                    <span className="text-sm md:text-base text-slate-400">
                      to
                    </span>
                    <span className="text-base md:text-lg font-semibold text-slate-500">
                      {formatCurrency(highestPrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3 md:mt-4">
                    <TrendingDown className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-emerald-600 font-medium">
                      Save up to {formatCurrency(highestPrice - lowestPrice)} by
                      comparing prices
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="flex items-center gap-2 p-2.5 md:p-3 rounded-lg bg-slate-50">
                    <Package className="h-4 w-4 text-violet-600 shrink-0" />
                    <span className="text-xs md:text-sm text-slate-700">
                      Free shipping
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 md:p-3 rounded-lg bg-slate-50">
                    <Clock className="h-4 w-4 text-violet-600 shrink-0" />
                    <span className="text-xs md:text-sm text-slate-700">
                      1-5 days delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 md:p-3 rounded-lg bg-slate-50">
                    <ShieldCheck className="h-4 w-4 text-violet-600 shrink-0" />
                    <span className="text-xs md:text-sm text-slate-700">
                      Verified sellers
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 md:p-3 rounded-lg bg-slate-50">
                    <Zap className="h-4 w-4 text-violet-600 shrink-0" />
                    <span className="text-xs md:text-sm text-slate-700">
                      Price drop alert
                    </span>
                  </div>
                </div>

                <div className="hidden md:flex gap-3">
                  <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white py-3.5 px-6 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2">
                    Compare {retailersCount} Prices
                    <ChevronDown className="h-5 w-5" />
                  </button>
                  <button className="px-4 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all">
                    <Bell className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
