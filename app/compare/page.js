"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/Header";
import { phones } from "@/lib/data/phones";
import { formatCurrency } from "@/lib/format";
import { X, Search, Star, ChevronUp, ChevronDown, Plus } from "lucide-react";

// Spec categories organized like PriceRunner
const specCategories = [
  {
    name: "Storage",
    specs: [{ key: "storage", label: "Internal Memory Size" }],
  },
  {
    name: "Series",
    specs: [{ key: "category", label: "Series" }],
  },
  {
    name: "Camera",
    specs: [{ key: "camera", label: "Camera Setup" }],
  },
  {
    name: "Product Properties",
    specs: [
      { key: "brand", label: "Brand" },
      { key: "os", label: "Operating System" },
      { key: "build", label: "Material (body)" },
      { key: "dimensions", label: "Dimensions" },
      { key: "weight", label: "Weight" },
    ],
  },
  {
    name: "Processor",
    specs: [
      { key: "processor", label: "System on Chip (SoC)" },
      { key: "ram", label: "RAM" },
    ],
  },
  {
    name: "Display",
    specs: [{ key: "display", label: "Display" }],
  },
  {
    name: "Power Source",
    specs: [{ key: "battery", label: "Battery Capacity" }],
  },
  {
    name: "Connections",
    specs: [{ key: "connectivity", label: "Connectivity" }],
  },
];

export default function ComparePage() {
  const [selectedPhones, setSelectedPhones] = useState([phones[0], phones[1]]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState({});

  // Filter phones for search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return phones
      .filter(
        (p) =>
          !selectedPhones.find((sp) => sp.slug === p.slug) &&
          (p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query))
      )
      .slice(0, 8);
  }, [searchQuery, selectedPhones]);

  // Suggested phones (not currently selected)
  const suggestedPhones = useMemo(() => {
    return phones
      .filter((p) => !selectedPhones.find((sp) => sp.slug === p.slug))
      .slice(0, 8);
  }, [selectedPhones]);

  const addPhone = (phone) => {
    if (selectedPhones.length < 4) {
      setSelectedPhones([...selectedPhones, phone]);
      setSearchQuery("");
    }
  };

  const removePhone = (slug) => {
    setSelectedPhones(selectedPhones.filter((p) => p.slug !== slug));
  };

  const toggleCategory = (categoryName) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const getSpecValue = (phone, specKey) => {
    if (specKey === "brand") return phone.brand;
    if (specKey === "category") return phone.category;
    if (specKey === "os") return phone.os;
    return phone.specs?.[specKey] || "-";
  };

  const hasSpecDifference = (specKey) => {
    if (selectedPhones.length < 2) return true;
    const values = selectedPhones.map((p) => getSpecValue(p, specKey));
    return !values.every((v) => v === values[0]);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Page Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <Link href="/" className="hover:text-violet-600">
                Home
              </Link>
              <span>/</span>
              <Link href="/phones" className="hover:text-violet-600">
                Mobile Phones
              </Link>
              <span>/</span>
              <span className="text-slate-900">Compare products</span>
            </nav>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">
                Compare products
              </h1>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyDifferences}
                  onChange={(e) => setShowOnlyDifferences(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
                Show only differences
              </label>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-6">
            {/* Main Compare Table */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {/* Product Cards Header */}
                <div className="border-b border-slate-200 p-4">
                  <div className="flex gap-4">
                    {selectedPhones.map((phone) => (
                      <div
                        key={phone.slug}
                        className="flex-1 min-w-0 relative group"
                      >
                        <button
                          onClick={() => removePhone(phone.slug)}
                          className="absolute -top-1 -right-1 z-10 w-6 h-6 bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex flex-col items-center text-center">
                          <div className="relative w-24 h-24 mb-3 bg-slate-50 rounded-lg p-2">
                            <Image
                              src={phone.image}
                              alt={phone.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <Link
                            href={`/phones/${phone.slug}`}
                            className="text-sm font-semibold text-slate-900 hover:text-violet-600 line-clamp-2"
                          >
                            {phone.name}
                          </Link>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-medium text-slate-600">
                              {phone.rating}
                            </span>
                          </div>
                          <div className="text-base font-bold text-slate-900 mt-1">
                            {formatCurrency(phone.price)}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add more phones placeholder */}
                    {selectedPhones.length < 4 && (
                      <div className="flex-1 min-w-0 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg p-4 min-h-[180px]">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2">
                          <Plus className="w-6 h-6 text-slate-400" />
                        </div>
                        <span className="text-sm text-slate-500">
                          Add product
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Specs Table */}
                <div className="divide-y divide-slate-200">
                  {specCategories.map((category) => {
                    const isCollapsed = collapsedCategories[category.name];
                    const visibleSpecs = showOnlyDifferences
                      ? category.specs.filter((spec) =>
                          hasSpecDifference(spec.key)
                        )
                      : category.specs;

                    if (visibleSpecs.length === 0) return null;

                    return (
                      <div key={category.name}>
                        {/* Category Header */}
                        <button
                          onClick={() => toggleCategory(category.name)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <span className="text-sm font-bold text-slate-900">
                            {category.name}
                          </span>
                          {isCollapsed ? (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          ) : (
                            <ChevronUp className="w-4 h-4 text-slate-500" />
                          )}
                        </button>

                        {/* Spec Rows */}
                        {!isCollapsed && (
                          <div className="divide-y divide-slate-100">
                            {visibleSpecs.map((spec) => (
                              <div
                                key={spec.key}
                                className="flex hover:bg-slate-50 transition-colors"
                              >
                                <div className="w-40 shrink-0 px-4 py-3 text-sm text-slate-500 border-r border-slate-100">
                                  {spec.label}
                                </div>
                                <div className="flex-1 flex divide-x divide-slate-100">
                                  {selectedPhones.map((phone) => (
                                    <div
                                      key={phone.slug}
                                      className="flex-1 px-4 py-3 text-sm text-slate-900"
                                    >
                                      {getSpecValue(phone, spec.key)}
                                    </div>
                                  ))}
                                  {selectedPhones.length < 4 && (
                                    <div className="flex-1 px-4 py-3" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Add Product */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-white rounded-xl border border-slate-200 p-4">
                <h2 className="text-base font-bold text-slate-900 mb-3">
                  Add product
                </h2>

                {/* Search Input */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                {/* Search Results or Suggestions */}
                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                  {(searchQuery ? searchResults : suggestedPhones).map(
                    (phone) => (
                      <button
                        key={phone.slug}
                        onClick={() => addPhone(phone)}
                        disabled={selectedPhones.length >= 4}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="relative w-12 h-12 bg-slate-100 rounded-lg shrink-0 overflow-hidden">
                          <Image
                            src={phone.image}
                            alt={phone.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-slate-900 truncate">
                            {phone.name}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs text-slate-500">
                                {phone.rating}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm font-bold text-slate-900">
                            {formatCurrency(phone.price)}
                          </div>
                        </div>
                      </button>
                    )
                  )}
                </div>

                {selectedPhones.length >= 4 && (
                  <div className="mt-3 text-xs text-center text-slate-500">
                    Maximum 4 products can be compared
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
