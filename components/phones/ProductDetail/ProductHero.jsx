import { useState } from "react";
import { ProductBreadcrumb, ProductImageSection } from "./ProductImageSection";
import { ProductInfoSection } from "./ProductInfoSection";

export default function ProductHero({
  phone,
  lowestPrice,
  highestPrice,
  retailersCount,
}) {
  const [selectedImage, setSelectedImage] = useState(1);

  // Simulate images based on phone - can be 1 to 4 images
  // In real app, this would come from phone.images or similar
  const imageCount = phone.images?.length || 4;
  const images = Array.from({ length: imageCount }, (_, i) => i + 1);

  return (
    <>
      <ProductBreadcrumb phone={phone} />

      <div className="bg-background">
        <div className="mx-auto max-w-7xl">
          <div className="px-4 md:px-6 py-4 md:py-6">
            <div className="grid gap-5 lg:gap-6 items-stretch md:[grid-template-columns:0.35fr_0.65fr]">
              <ProductImageSection
                phone={phone}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                images={images}
              />
              <ProductInfoSection
                phone={phone}
                lowestPrice={lowestPrice}
                highestPrice={highestPrice}
                retailersCount={retailersCount}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
