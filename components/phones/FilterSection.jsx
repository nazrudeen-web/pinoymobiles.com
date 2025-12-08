import { ChevronUp, ChevronDown, Check } from "lucide-react";

export default function FilterSection({
  title,
  filterKey,
  items,
  selected,
  onToggle,
  expandedFilters,
  setExpandedFilters,
}) {
  return (
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
}
