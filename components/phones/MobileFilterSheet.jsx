import { X } from "lucide-react";
import FilterSection from "./FilterSection";

export default function MobileFilterSheet({
  showFilters,
  setShowFilters,
  brands,
  categories,
  osList,
  selectedBrands,
  selectedCategories,
  selectedOS,
  toggleFilter,
  clearAllFilters,
  filteredCount,
  expandedFilters,
  setExpandedFilters,
}) {
  if (!showFilters) return null;

  return (
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
            Show {filteredCount} results
          </button>
        </div>
      </div>
    </div>
  );
}
