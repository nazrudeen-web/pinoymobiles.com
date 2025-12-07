"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header/Header";
import { phones } from "@/lib/data/phones";
import {
  Star,
  ChevronDown,
  ChevronUp,
  Heart,
  Eye,
  SlidersHorizontal,
  X,
  Check,
} from "lucide-react";
import { formatCurrency } from "@/lib/format";

// Extract unique values for filters
const brands = [...new Set(phones.map((p) => p.brand))];
const categories = [...new Set(phones.map((p) => p.category))];
const osList = [...new Set(phones.map((p) => p.os))];

// Storage options
const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];

// Series options (extracted from phone names)
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

export default function PhonesPage() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedOS, setSelectedOS] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("brand");
  const [expandedFilters, setExpandedFilters] = useState({
    brand: true,
    category: true,
    os: true,
    price: true,
  });

  // Filter phones
  const filteredPhones = useMemo(() => {
    let result = [...phones];

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedOS.length > 0) {
      result = result.filter((p) => selectedOS.includes(p.os));
    }
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // popularity - by rating
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedBrands, selectedCategories, selectedOS, priceRange, sortBy]);

  const toggleFilter = (type, value) => {
    const setters = {
      brand: setSelectedBrands,
      category: setSelectedCategories,
      os: setSelectedOS,
    };
    const current = {
      brand: selectedBrands,
      category: selectedCategories,
      os: selectedOS,
    };

    if (current[type].includes(value)) {
      setters[type](current[type].filter((v) => v !== value));
    } else {
      setters[type]([...current[type], value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedOS([]);
    setPriceRange([0, 100000]);
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedOS.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 100000;

  const FilterSection = ({ title, filterKey, items, selected, onToggle }) => (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() =>
          setExpandedFilters((prev) => ({
            ...prev,
            [filterKey]: !prev[filterKey],
          }))
        }
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-slate-900">{title}</span>
        {expandedFilters[filterKey] ? (
          <ChevronUp className="h-4 w-4 text-slate-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-500" />
        )}
      </button>
      {expandedFilters[filterKey] && (
        <div className="mt-3 space-y-2">
          {items.map((item) => (
            <label
              key={item}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-700 hover:text-slate-900"
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                  selected.includes(item)
                    ? "border-violet-600 bg-violet-600"
                    : "border-slate-300 bg-white"
                }`}
                onClick={() => onToggle(filterKey, item)}
              >
                {selected.includes(item) && (
                  <Check className="h-3 w-3 text-white" />
                )}
              </div>
              <span onClick={() => onToggle(filterKey, item)}>{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Page Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <Link href="/" className="hover:text-violet-600">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-900">Mobile Phones</span>
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Mobile Phones
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-3xl">
              Looking for the right mobile phone? Compare specs, prices, and
              reviews from verified sellers across the Philippines. Use our
              filters to find the perfect match for your needs.
            </p>
          </div>
        </div>

        {/* Quick Filter Tabs - PriceRunner Style */}
        <div className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-4">
            {/* Tab Headers */}
            <div className="flex items-center gap-1 mb-3 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab("brand")}
                className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all rounded-md ${
                  activeTab === "brand"
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Brand
              </button>
              <button
                onClick={() => setActiveTab("series")}
                className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all rounded-md ${
                  activeTab === "series"
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Series
              </button>
              <button
                onClick={() => setActiveTab("storage")}
                className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all rounded-md ${
                  activeTab === "storage"
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Internal Memory Size
              </button>
            </div>

            {/* Filter Pills Row - Changes based on active tab */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              {activeTab === "brand" &&
                brands.slice(0, 6).map((brand) => (
                  <button
                    key={brand}
                    onClick={() => toggleFilter("brand", brand)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                      selectedBrands.includes(brand)
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    {brand}
                  </button>
                ))}

              {activeTab === "series" &&
                seriesOptions.map((series) => (
                  <button
                    key={series}
                    onClick={() => toggleFilter("category", series)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                      selectedCategories.includes(series)
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    {series}
                  </button>
                ))}

              {activeTab === "storage" &&
                storageOptions.map((storage) => (
                  <button
                    key={storage}
                    className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                  >
                    {storage}
                  </button>
                ))}

              <div className="w-px h-6 bg-slate-200 mx-2 shrink-0" />

              {/* Product Count */}
              <div className="shrink-0">
                <span className="text-sm text-slate-500">
                  <span className="font-semibold text-slate-900">
                    {filteredPhones.length > 1000
                      ? "1000"
                      : filteredPhones.length}
                  </span>
                  + products
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-6">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <h2 className="text-base font-bold text-slate-900">
                    Filters
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-violet-600 hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <FilterSection
                  title="Brand"
                  filterKey="brand"
                  items={brands}
                  selected={selectedBrands}
                  onToggle={toggleFilter}
                />

                <FilterSection
                  title="Category"
                  filterKey="category"
                  items={categories}
                  selected={selectedCategories}
                  onToggle={toggleFilter}
                />

                <FilterSection
                  title="Operating System"
                  filterKey="os"
                  items={osList}
                  selected={selectedOS}
                  onToggle={toggleFilter}
                />

                {/* Price Range */}
                <div className="py-4">
                  <button
                    onClick={() =>
                      setExpandedFilters((prev) => ({
                        ...prev,
                        price: !prev.price,
                      }))
                    }
                    className="flex w-full items-center justify-between text-left"
                  >
                    <span className="text-sm font-semibold text-slate-900">
                      Price Range
                    </span>
                    {expandedFilters.price ? (
                      <ChevronUp className="h-4 w-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    )}
                  </button>
                  {expandedFilters.price && (
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0] || ""}
                          onChange={(e) =>
                            setPriceRange([
                              Number(e.target.value) || 0,
                              priceRange[1],
                            ])
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none"
                        />
                        <span className="text-slate-400">-</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1] || ""}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Number(e.target.value) || 100000,
                            ])
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter
                  </button>
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">
                      {filteredPhones.length}
                    </span>{" "}
                    products
                  </p>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600 hidden sm:inline">
                    Sort by
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:border-violet-500 focus:outline-none"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="name">Name</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Pills */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => toggleFilter("brand", brand)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-200"
                    >
                      {brand}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                  {selectedCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleFilter("category", cat)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200"
                    >
                      {cat}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                  {selectedOS.map((os) => (
                    <button
                      key={os}
                      onClick={() => toggleFilter("os", os)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-200"
                    >
                      {os}
                      <X className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              )}

              {/* Products Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPhones.map((phone, index) => (
                  <PhoneListCard key={phone.slug} phone={phone} index={index} />
                ))}
              </div>

              {/* Empty State */}
              {filteredPhones.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg font-semibold text-slate-900">
                    No phones found
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Try adjusting your filters to find what you&apos;re looking
                    for.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 text-sm font-medium text-violet-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Load More */}
              {filteredPhones.length > 0 && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-slate-600 mb-4">
                    You&apos;ve viewed {filteredPhones.length} out of{" "}
                    {phones.length} products
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Sheet */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowFilters(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 rounded-full hover:bg-slate-100"
                >
                  <X className="h-5 w-5 text-slate-600" />
                </button>
              </div>
              <div className="p-4">
                <FilterSection
                  title="Brand"
                  filterKey="brand"
                  items={brands}
                  selected={selectedBrands}
                  onToggle={toggleFilter}
                />
                <FilterSection
                  title="Category"
                  filterKey="category"
                  items={categories}
                  selected={selectedCategories}
                  onToggle={toggleFilter}
                />
                <FilterSection
                  title="Operating System"
                  filterKey="os"
                  items={osList}
                  selected={selectedOS}
                  onToggle={toggleFilter}
                />
              </div>
              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 flex gap-3">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 py-3 rounded-xl bg-violet-600 text-sm font-medium text-white hover:bg-violet-700"
                >
                  Show {filteredPhones.length} results
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

// Product Card Component - PriceRunner Style
function PhoneListCard({ phone, index }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const watchingCount = Math.floor(Math.random() * 200) + 50;

  return (
    <Link
      href={`/phones/${phone.slug}`}
      className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-violet-300 transition-all duration-300"
    >
      {/* Watching Badge */}
      {watchingCount > 100 && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-[10px] font-medium text-slate-600">
          <Eye className="h-3 w-3" />
          {watchingCount}+ watching
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsFavorite(!isFavorite);
        }}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
      >
        <Heart
          className={`h-4 w-4 ${
            isFavorite ? "fill-pink-500 text-pink-500" : "text-slate-400"
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative h-36 sm:h-44 bg-slate-50 flex items-center justify-center">
        <Image
          src={`/mobile${(index % 5) + 1}.jpg`}
          alt={phone.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Name */}
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-violet-600 transition-colors min-h-10">
          {phone.name}
        </h3>

        {/* Rating & OS */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-slate-700">
              {phone.rating}
            </span>
          </div>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-500">{phone.os}</span>
        </div>

        {/* Price */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-lg font-bold text-slate-900">
            {formatCurrency(phone.price)}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">from 5+ stores</p>
        </div>
      </div>
    </Link>
  );
}
