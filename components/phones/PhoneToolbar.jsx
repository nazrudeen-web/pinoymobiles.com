import { SlidersHorizontal, X } from "lucide-react";

export default function PhoneToolbar({
  setShowFilters,
  filteredCount,
  totalCount,
  sortBy,
  setSortBy,
  selectedBrands,
  selectedCategories,
  selectedOS,
  toggleFilter,
}) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">
              {filteredCount}
            </span>{" "}
            products
          </p>
        </div>

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

      {(selectedBrands.length > 0 ||
        selectedCategories.length > 0 ||
        selectedOS.length > 0) && (
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
    </>
  );
}
