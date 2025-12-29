"use client";

import Header from "@/components/header/Header";
import ProductHero from "./ProductHero";
import MobileBottomBar from "./MobileBottomBar";
import WhyBuySection from "./sections/WhyBuySection";
import SpecificationsSection from "./sections/SpecificationsSection";
import PriceComparisonSection from "./sections/PriceComparisonSection";
import CompareSimilarPriceSection from "./sections/CompareSimilarPriceSection";
import { useState, useMemo } from "react";
import { VariantContext } from "./VariantContext";

// ===== MAIN COMPONENT =====
export default function ProductDetailPage({ phone, allPhones }) {
  // Track selected variant to filter prices
  const [selectedVariant, setSelectedVariant] = useState(() => {
    if (Array.isArray(phone?.variants) && phone.variants.length > 0) {
      return phone.variants[0];
    }
    return null;
  });

  // Filter prices based on selected variant
  const filteredPrices = useMemo(() => {
    if (!selectedVariant || !Array.isArray(phone?.prices)) return phone.prices || [];
    
    return (phone.prices || []).filter(p => {
      // Match by storage
      const storageMatch = !p.variant?.storage || p.variant.storage === selectedVariant.storage;
      // Match by color (check color_name)
      const colorMatch = !p.variant?.color_name || p.variant.color_name === selectedVariant.color;
      return storageMatch && colorMatch;
    });
  }, [selectedVariant, phone.prices]);

  // Map filtered prices to retailers shape
  const retailers = (filteredPrices)
    .map((p) => ({
      id: p.id,
      name: p.store?.name || "Unknown Store",
      logoUrl: p.store?.logo || null,
      price: Number(p.price) || 0,
      affiliateUrl: p.affiliate_url || p.store?.website_url || "#",
      isOfficial: p.store?.is_official || false,
    }))
    .sort((a, b) => a.price - b.price);

  const lowestPrice = retailers.length
    ? retailers[0].price
    : Number(phone.best_price || 0);
  const highestPrice = retailers.length
    ? retailers[retailers.length - 1].price
    : Number(phone.best_price || 0);

  // Use real expert_rating data from Supabase
  const expertRating = phone?.expert_rating;
  const avgScore = expertRating?.overall_score ? Number(expertRating.overall_score) : 7.5;
  
  // For compatibility, create a basic analysis object if expert rating exists
  const analysis = expertRating ? {
    display: {
      label: 'Display',
      score: Number(expertRating.display_score || 8),
      summary: expertRating.display_details || 'Display quality',
    },
    camera: {
      label: 'Camera',
      score: Number(expertRating.camera_score || 8),
      summary: expertRating.camera_details || 'Camera quality',
    },
    performance: {
      label: 'Performance',
      score: Number(expertRating.performance_score || 8),
      summary: expertRating.performance_details || 'Processing power',
    },
    battery: {
      label: 'Battery',
      score: Number(expertRating.battery_score || 8),
      summary: expertRating.battery_details || 'Battery life',
    },
  } : null;

  const compareCandidates = (() => {
    const currentPrice = Number(phone.best_price ?? phone.price ?? 0);
    const base = (allPhones || []).filter((p) => p.slug !== phone.slug);

    // Normalize price from best_price or price
    const normalized = base.map((p) => ({
      ...p,
      price: Number(p.best_price ?? p.price ?? 0),
    }));

    const withPrice = normalized.filter((p) => Number.isFinite(p.price) && p.price > 0);

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

    return pool.slice(0, 4);
  })();

  const compareDemoImageSrc = "/mobile1.jpg";

  return (
    <VariantContext.Provider value={{ selectedVariant, setSelectedVariant }}>
    <div className="min-h-screen bg-background">
      <Header />
      
      <ProductHero
        phone={phone}
        lowestPrice={lowestPrice}
        highestPrice={highestPrice}
        retailersCount={retailers.length}
        avgScore={phone.expert_score ?? phone.expert_rating?.overall_score ?? avgScore}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8 pb-24 md:pb-10">
        <div className="space-y-6">
          <WhyBuySection phone={phone} analysis={analysis} avgScore={avgScore} />
          <SpecificationsSection phone={phone} />
          <PriceComparisonSection 
            retailers={retailers} 
            lowestPrice={lowestPrice} 
            selectedVariant={selectedVariant}
          />
          <CompareSimilarPriceSection
            phone={phone}
            compareCandidates={compareCandidates}
            compareDemoImageSrc={compareDemoImageSrc}
          />
        </div>
      </div>

      <MobileBottomBar
        lowestPrice={lowestPrice}
        retailersCount={retailers.length}
      />
    </div>
    </VariantContext.Provider>
  );
}
