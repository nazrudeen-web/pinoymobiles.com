import { ChevronUp, ChevronDown } from "lucide-react";

export default function DesktopFilterSidebar({
  hasActiveFilters,
  clearAllFilters,
  brands,
  categories,
  osList,
  selectedBrands,
  selectedCategories,
  selectedOS,
  toggleFilter,
  priceRange,
  setPriceRange,
  expandedFilters,
  setExpandedFilters,
  FilterSection,
}) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900">Filters</h2>
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
          expandedFilters={expandedFilters}
          setExpandedFilters={setExpandedFilters}
        />

        <FilterSection
          title="Category"
          filterKey="category"
          items={categories}
          selected={selectedCategories}
          onToggle={toggleFilter}
          expandedFilters={expandedFilters}
          setExpandedFilters={setExpandedFilters}
        />

        <FilterSection
          title="Operating System"
          filterKey="os"
          items={osList}
          selected={selectedOS}
          onToggle={toggleFilter}
          expandedFilters={expandedFilters}
          setExpandedFilters={setExpandedFilters}
        />

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
                    setPriceRange([Number(e.target.value) || 0, priceRange[1]])
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
  );
}
