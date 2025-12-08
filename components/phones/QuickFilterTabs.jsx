export default function QuickFilterTabs({
  activeTab,
  setActiveTab,
  brands,
  seriesOptions,
  storageOptions,
  selectedBrands,
  selectedCategories,
  toggleFilter,
  productsCount,
}) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-4">
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
          <div className="shrink-0">
            <span className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">
                {productsCount > 1000 ? "1000" : productsCount}
              </span>
              + products
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
