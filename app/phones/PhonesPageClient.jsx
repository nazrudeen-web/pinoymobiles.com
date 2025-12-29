"use client";

import { useState } from "react";
import { usePhoneFilters } from "@/hooks/usePhoneFilters";
import PhonePageHeader from "@/components/phones/PhonePageHeader";
import QuickFilterTabs from "@/components/phones/QuickFilterTabs";
import FilterSection from "@/components/phones/FilterSection";
import PhoneListCard from "@/components/phones/PhoneListCard";
import MobileFilterSheet from "@/components/phones/MobileFilterSheet";
import DesktopFilterSidebar from "@/components/phones/DesktopFilterSidebar";
import PhoneToolbar from "@/components/phones/PhoneToolbar";

const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];

export default function PhonesPageClient({ phones, brands, categories, osList }) {
  const {
    selectedBrands,
    selectedCategories,
    selectedOS,
    priceRange,
    sortBy,
    filteredPhones,
    toggleFilter,
    clearAllFilters,
    hasActiveFilters,
    setPriceRange,
    setSortBy,
  } = usePhoneFilters(phones);

  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("brand");
  const [expandedFilters, setExpandedFilters] = useState({
    brand: true,
    category: true,
    os: true,
    price: true,
  });

  // Extract series from phone names
  const seriesOptions = [
    ...new Set(
      phones.map((p) => {
        const name = p.name;
        if (name.includes("Pro Max")) return "Pro Max";
        if (name.includes("Pro")) return "Pro";
        if (name.includes("Ultra")) return "Ultra";
        if (name.includes("Plus")) return "Plus";
        if (name.includes("Lite")) return "Lite";
        if (name.includes("FE")) return "FE";
        return "Standard";
      })
    ),
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-background">
      <PhonePageHeader />
      <QuickFilterTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        brands={brands}
        seriesOptions={seriesOptions}
        storageOptions={storageOptions}
        selectedBrands={selectedBrands}
        selectedCategories={selectedCategories}
        toggleFilter={toggleFilter}
        productsCount={filteredPhones.length}
      />

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-6">
          <DesktopFilterSidebar
            hasActiveFilters={hasActiveFilters}
            clearAllFilters={clearAllFilters}
            brands={brands}
            categories={categories}
            osList={osList}
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategories}
            selectedOS={selectedOS}
            toggleFilter={toggleFilter}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            expandedFilters={expandedFilters}
            setExpandedFilters={setExpandedFilters}
            FilterSection={FilterSection}
          />

          <div className="flex-1 min-w-0">
            <PhoneToolbar
              setShowFilters={setShowFilters}
              filteredCount={filteredPhones.length}
              totalCount={phones.length}
              sortBy={sortBy}
              setSortBy={setSortBy}
              selectedBrands={selectedBrands}
              selectedCategories={selectedCategories}
              selectedOS={selectedOS}
              toggleFilter={toggleFilter}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPhones.map((phone, index) => (
                <PhoneListCard key={phone.slug} phone={phone} index={index} />
              ))}
            </div>

            {filteredPhones.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg font-semibold text-foreground">
                  No phones found
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters to find what you&apos;re looking
                  for.
                </p>
                <button
                  onClick={clearAllFilters}
                  type="button"
                  className="mt-4 text-sm font-medium text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {filteredPhones.length > 0 && (
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  You&apos;ve viewed {filteredPhones.length} out of{" "}
                  {phones.length} products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileFilterSheet
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        brands={brands}
        categories={categories}
        osList={osList}
        selectedBrands={selectedBrands}
        selectedCategories={selectedCategories}
        selectedOS={selectedOS}
        toggleFilter={toggleFilter}
        clearAllFilters={clearAllFilters}
        filteredCount={filteredPhones.length}
        expandedFilters={expandedFilters}
        setExpandedFilters={setExpandedFilters}
      />
    </main>
  );
}
