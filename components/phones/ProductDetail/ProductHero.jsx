import { useState, useEffect } from "react";
import { ProductBreadcrumb, ProductImageSection } from "./ProductImageSection";
import { ProductInfoSection } from "./ProductInfoSection";

export default function ProductHero({
  phone,
  lowestPrice,
  highestPrice,
  retailersCount,
  avgScore,
}) {
  // Always sort images by sort_order on the client to enforce strict ordering
  const sortedImages = Array.isArray(phone.images)
    ? [...phone.images].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    : [];

  const [selectedImage, setSelectedImage] = useState(1);
  

  // Reset to main image (position 1) when phone changes
  useEffect(() => {
    setSelectedImage(1);
  }, [phone?.id]);

  const imageCount = sortedImages.length || 4;
  const images = Array.from({ length: imageCount }, (_, i) => i + 1);

  const onColorImageChange = (imageUrl) => {
    if (!imageUrl || !Array.isArray(sortedImages)) return;
    const idx = sortedImages.findIndex((img) => img.image_url === imageUrl);
    if (idx !== -1) {
      setSelectedImage(idx + 1);
    }
  };

  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8">
        <ProductBreadcrumb phone={phone} />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 mt-6">
          {/* Left: Images */}
          <ProductImageSection
            phone={phone}
            images={sortedImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* Right: Info */}
          <ProductInfoSection
            phone={phone}
            lowestPrice={lowestPrice}
            highestPrice={highestPrice}
            retailersCount={retailersCount}
            avgScore={avgScore}
            onColorImageChange={onColorImageChange}
          />
        </div>
      </div>
    </section>
  );
}
