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
  images = [1, 2, 3, 4], // Can pass custom images array
}) {
  const hasMultipleImages = images.length > 1;

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden">
      {/* Main image */}
      <div className="relative bg-muted/20 flex-1 min-h-48 md:min-h-56 flex items-center justify-center p-4">
        <Image
          src={`/mobile${selectedImage}.jpg`}
          alt={phone.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 200px, (max-width: 1024px) 240px, 280px"
        />
      </div>

      {/* Thumbnails - only show if multiple images */}
      {hasMultipleImages && (
        <div className="flex gap-2 p-3 justify-center border-t border-border bg-muted/10">
          {images.map((i) => (
            <button
              type="button"
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`w-10 h-10 md:w-11 md:h-11 rounded-lg border-2 transition-all shrink-0 ${
                selectedImage === i
                  ? "border-primary bg-background"
                  : "border-transparent hover:border-primary/50 bg-background/50"
              }`}
            >
              <div className="relative w-full h-full p-0.5">
                <Image
                  src={`/mobile${i}.jpg`}
                  alt={`View ${i}`}
                  fill
                  className="object-contain"
                  sizes="44px"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
