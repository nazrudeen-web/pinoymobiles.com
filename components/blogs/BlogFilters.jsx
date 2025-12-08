import { Clock, Search } from "lucide-react";

export function BlogFilters({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  categories,
  resultCount,
}) {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <div className="grid md:grid-cols-3 gap-6 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Category
            </label>
            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
              >
                {["All", ...categories].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm bg-white focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{resultCount}</span>{" "}
            articles found
          </p>
        </div>
      </div>
    </section>
  );
}
