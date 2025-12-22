import { ChevronRight } from "lucide-react";
import Image from "next/image";
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
  selectedImage,
  setSelectedImage,
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="relative bg-muted/20 rounded-xl md:rounded-2xl overflow-hidden flex-1 flex flex-col">
        <div className="relative h-56 md:h-[320px] lg:h-[360px] flex items-center justify-center p-4 md:p-6">
          <Image
            src={`/mobile${selectedImage}.jpg`}
            alt={phone.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 224px, (max-width: 1024px) 320px, 360px"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-3 md:mt-4 justify-center md:justify-start overflow-x-auto md:overflow-visible pb-1 scrollbar-hide">
        {[1, 2, 3, 4].map((i) => (
          <button
            type="button"
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl border-2 transition-all ${
              selectedImage === i
                ? "border-primary bg-muted/40"
                : "border-border hover:border-border/80 bg-card"
            }`}
          >
            <div className="relative w-full h-full p-1">
              <Image
                src={`/mobile${i}.jpg`}
                alt={`View ${i}`}
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
