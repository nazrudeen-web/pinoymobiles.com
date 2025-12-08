import { useState } from "react";
import { ProductBreadcrumb, ProductImageSection } from "./ProductImageSection";
import { ProductInfoSection } from "./ProductInfoSection";

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
      <ProductBreadcrumb phone={phone} />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="px-4 md:px-6 py-4 md:py-8">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
              <ProductImageSection
                phone={phone}
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
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
