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
            href={`/phones?brand=${
              typeof phone.brand === 'string' ? phone.brand : (phone.brand?.slug || '')
            }`}
            className="hover:text-primary transition-colors"
          >
            {typeof phone.brand === 'string' ? phone.brand : (phone.brand?.name || '')}
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
  // Prefer Supabase images when available, sorted strictly by sort_order
  const supabaseImages = Array.isArray(phone.images) && phone.images.length > 0
    ? [...phone.images].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    : (phone.main_image ? [{ image_url: phone.main_image, sort_order: 0 }] : []);

  const hasMultipleImages = (supabaseImages.length || images.length) > 1;

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden">
      {/* Main image - reduced height for better focus on price/CTA */}
      <div className="relative bg-muted/20 flex-1 min-h-40 md:min-h-48 flex items-center justify-center p-3">
        {supabaseImages.length > 0 ? (
          <Image
            src={supabaseImages[Math.min(selectedImage - 1, supabaseImages.length - 1)].image_url}
            alt={phone.name}
            fill
            unoptimized
            className="object-contain"
            sizes="(max-width: 768px) 200px, (max-width: 1024px) 240px, 280px"
          />
        ) : (
          <Image
            src={`/mobile${selectedImage}.jpg`}
            alt={phone.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 200px, (max-width: 1024px) 240px, 280px"
          />
        )}
      </div>

      {/* Thumbnails - only show if multiple images */}
      {hasMultipleImages && (
        <div className="flex gap-2 p-3 justify-center border-t border-border bg-muted/10">
          {(supabaseImages.length > 0 ? supabaseImages.map((img, idx) => idx + 1) : images).map((i) => (
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
                {supabaseImages.length > 0 ? (
                  <Image
                    src={supabaseImages[i - 1]?.image_url}
                    alt={`View ${i}`}
                    fill
                    unoptimized
                    className="object-contain"
                    sizes="44px"
                  />
                ) : (
                  <Image
                    src={`/mobile${i}.jpg`}
                    alt={`View ${i}`}
                    fill
                    className="object-contain"
                    sizes="44px"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
