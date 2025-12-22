"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/Header";
import { phones } from "@/lib/data/phones";
import { formatCurrency } from "@/lib/format";
import { useSearchParams } from "next/navigation";
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

function ComparePageInner() {
  const searchParams = useSearchParams();

  const initialSelectedPhones = useMemo(() => {
    const raw = searchParams.get("phones");
    if (!raw) return [phones[0], phones[1]];
    const slugs = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const picked = slugs
      .map((slug) => phones.find((p) => p.slug === slug))
      .filter(Boolean)
      .slice(0, 4);

    if (picked.length === 0) return [phones[0], phones[1]];
    if (picked.length === 1) {
      const fallback = phones.find((p) => p.slug !== picked[0].slug) || phones[1];
      return [picked[0], fallback];
    }
    return picked;
  }, [searchParams]);

  const [selectedPhones, setSelectedPhones] = useState(initialSelectedPhones);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState({});

  useEffect(() => {
    setSelectedPhones(initialSelectedPhones);
  }, [initialSelectedPhones]);

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
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <div className="bg-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/phones" className="hover:text-primary">
                Mobile Phones
              </Link>
              <span>/</span>
              <span className="text-foreground">Compare products</span>
            </nav>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">
                Compare products
              </h1>
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyDifferences}
                  onChange={(e) => setShowOnlyDifferences(e.target.checked)}
                  className="w-4 h-4 rounded border-input text-primary focus:ring-ring"
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
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                {/* Product Cards Header */}
                <div className="border-b border-border p-4">
                  <div className="flex gap-4">
                    {selectedPhones.map((phone) => (
                      <div
                        key={phone.slug}
                        className="flex-1 min-w-0 relative group"
                      >
                        <button
                          type="button"
                          onClick={() => removePhone(phone.slug)}
                          className="absolute -top-1 -right-1 z-10 w-6 h-6 bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="flex flex-col items-center text-center">
                          <div className="relative w-24 h-24 mb-3 bg-background rounded-lg p-2">
                            <Image
                              src={phone.image}
                              alt={phone.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <Link
                            href={`/phones/${phone.slug}`}
                            className="text-sm font-semibold text-foreground hover:text-primary line-clamp-2"
                          >
                            {phone.name}
                          </Link>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-medium text-muted-foreground">
                              {phone.rating}
                            </span>
                          </div>
                          <div className="text-base font-bold text-foreground mt-1">
                            {formatCurrency(phone.price)}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add more phones placeholder */}
                    {selectedPhones.length < 4 && (
                      <div className="flex-1 min-w-0 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-4 min-h-[180px]">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                          <Plus className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Add product
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Specs Table */}
                <div className="divide-y divide-border">
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
                          type="button"
                          onClick={() => toggleCategory(category.name)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <span className="text-sm font-bold text-foreground">
                            {category.name}
                          </span>
                          {isCollapsed ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          )}
                        </button>

                        {/* Spec Rows */}
                        {!isCollapsed && (
                          <div className="divide-y divide-border">
                            {visibleSpecs.map((spec) => (
                              <div
                                key={spec.key}
                                className="flex hover:bg-muted/50 transition-colors"
                              >
                                <div className="w-40 shrink-0 px-4 py-3 text-sm text-muted-foreground border-r border-border">
                                  {spec.label}
                                </div>
                                <div className="flex-1 flex divide-x divide-border">
                                  {selectedPhones.map((phone) => (
                                    <div
                                      key={phone.slug}
                                      className="flex-1 px-4 py-3 text-sm text-foreground"
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
              <div className="sticky top-24 bg-card rounded-xl border border-border p-4">
                <h2 className="text-base font-bold text-foreground mb-3">
                  Add product
                </h2>

                {/* Search Input */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full pl-9 pr-3 py-2 text-sm border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>

                {/* Search Results or Suggestions */}
                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                  {(searchQuery ? searchResults : suggestedPhones).map(
                    (phone) => (
                      <button
                        type="button"
                        key={phone.slug}
                        onClick={() => addPhone(phone)}
                        disabled={selectedPhones.length >= 4}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="relative w-12 h-12 bg-background rounded-lg shrink-0 overflow-hidden">
                          <Image
                            src={phone.image}
                            alt={phone.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-foreground truncate">
                            {phone.name}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-xs text-muted-foreground">
                                {phone.rating}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm font-bold text-foreground">
                            {formatCurrency(phone.price)}
                          </div>
                        </div>
                      </button>
                    )
                  )}
                </div>

                {selectedPhones.length >= 4 && (
                  <div className="mt-3 text-xs text-center text-muted-foreground">
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

export default function ComparePage() {
  return (
    <Suspense>
      <ComparePageInner />
    </Suspense>
  );
}
