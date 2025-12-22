"use client";

import Header from "@/components/header/Header";
import ProductHero from "./ProductHero";
import SimilarCarousel from "./SimilarCarousel";
import MobileBottomBar from "./MobileBottomBar";
import WhyBuySection from "./sections/WhyBuySection";
import SpecificationsSection from "./sections/SpecificationsSection";
import PriceComparisonSection from "./sections/PriceComparisonSection";
import CompareSimilarPriceSection from "./sections/CompareSimilarPriceSection";
import { analyzePhone } from "@/lib/product-detail/phoneAnalysis";
import { getRetailers } from "@/lib/product-detail/retailers";

// ===== MAIN COMPONENT =====
export default function ProductDetailPage({ phone, allPhones }) {
  const retailers = getRetailers(phone.price);
  const lowestPrice = Math.min(...retailers.map((r) => r.price));
  const { analysis, avgScore } = analyzePhone(phone);

  const compareCandidates = (() => {
    const currentPrice = Number(phone.price || 0);
    const base = allPhones.filter((p) => p.slug !== phone.slug);
    const withPrice = base.filter((p) => typeof p.price === "number" && p.price > 0);

    const inRange = withPrice.filter(
      (p) => Math.abs(p.price - currentPrice) <= 300
    );

    const pool = (inRange.length >= 3 ? inRange : withPrice)
      .slice()
      .sort(
        (a, b) =>
          Math.abs((a.price || 0) - currentPrice) -
          Math.abs((b.price || 0) - currentPrice)
      );

    return pool.slice(0, 3);
  })();

  const compareDemoImageSrc = "/mobile1.jpg";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <ProductHero
        phone={phone}
        lowestPrice={lowestPrice}
        highestPrice={retailers[retailers.length - 1].price}
        retailersCount={retailers.length}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8 pb-24 md:pb-10">
        <div className="space-y-6">
          <WhyBuySection phone={phone} analysis={analysis} avgScore={avgScore} />
          <SpecificationsSection phone={phone} />
          <PriceComparisonSection retailers={retailers} lowestPrice={lowestPrice} />
          <CompareSimilarPriceSection
            phone={phone}
            compareCandidates={compareCandidates}
            compareDemoImageSrc={compareDemoImageSrc}
          />
        </div>

        {/* Similar Phones */}
        <div className="mt-8">
          <SimilarCarousel currentPhone={phone} allPhones={allPhones} />
        </div>
      </div>

      <MobileBottomBar
        lowestPrice={lowestPrice}
        retailersCount={retailers.length}
      />
    </div>
  );
}
