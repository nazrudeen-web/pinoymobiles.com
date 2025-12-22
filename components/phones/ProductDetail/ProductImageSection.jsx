import { Heart, Share2, ChevronRight } from "lucide-react";
import Link from "next/link";

export function ProductBreadcrumb({ phone }) {
  return (
    <>
      <div className="bg-background border-b border-border md:hidden">
        <div className="px-4 py-2.5">
          <nav className="flex items-center gap-1 text-xs text-muted-foreground overflow-x-auto scrollbar-hide">
            <Link href="/" className="hover:text-primary whitespace-nowrap">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link
              href="/phones"
              className="hover:text-primary whitespace-nowrap"
            >
              Phones
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="text-foreground font-medium truncate">
              {phone.name}
            </span>
          </nav>
        </div>
      </div>

      <div className=" max-w-7xl mx-auto hidden md:block px-6 pt-4">
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/phones"
            className="hover:text-primary transition-colors"
          >
            Phones
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href={`/phones?brand=${phone.brand}`}
            className="hover:text-primary transition-colors"
          >
            {phone.brand}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">{phone.name}</span>
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
    <div className="md:col-span-5 h-full lg:min-h-[620px] flex flex-col">
      <div className="relative bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden flex-1 flex flex-col">
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          <span className="px-2 py-1 bg-primary text-primary-foreground text-[10px] md:text-xs font-bold rounded">
            BEST PRICE
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full transition-all ${
              isFavorite
                ? "bg-pink-100 text-pink-600"
                : "bg-background/90 backdrop-blur text-muted-foreground hover:text-pink-600"
            } shadow-sm`}
          >
            <Heart
              className={`h-4 w-4 md:h-5 md:w-5 ${
                isFavorite ? "fill-current" : ""
              }`}
            />
          </button>
          <button className="p-2 rounded-full bg-background/90 backdrop-blur text-muted-foreground hover:text-primary shadow-sm transition-all">
            <Share2 className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
        <div className="relative aspect-[4/3] md:aspect-[16/13] lg:aspect-auto lg:flex-1 flex items-center justify-center p-4 md:p-6">
          <img
            src={`/mobile${selectedImage}.jpg`}
            alt={phone.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-3 md:mt-4 justify-center md:justify-start overflow-x-auto md:overflow-visible pb-1 scrollbar-hide">
        {[1, 2, 3, 4].map((i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl border-2 transition-all ${
              selectedImage === i
                ? "border-primary bg-muted/40"
                : "border-border hover:border-border/80 bg-card"
            }`}
          >
            <img
              src={`/mobile${i}.jpg`}
              alt={`View ${i}`}
              className="w-full h-full object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
