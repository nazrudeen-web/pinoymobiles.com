import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SpecAccordion({ specs }) {
  const [expanded, setExpanded] = useState({});

  const categories = {
    display: { name: "Display", icon: "📺" },
    processor: { name: "Processor", icon: "⚙️" },
    memory: { name: "Memory", icon: "💾" },
    camera: { name: "Camera", icon: "📸" },
    battery: { name: "Battery", icon: "🔋" },
    network: { name: "Network", icon: "📡" },
  };

  const toggleCategory = (category) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="space-y-2">
      {Object.entries(categories).map(([key, cat]) => (
        <div
          key={key}
          className="border border-slate-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleCategory(key)}
            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{cat.icon}</span>
              <span className="font-semibold text-slate-900">{cat.name}</span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-slate-600 transition-transform ${
                expanded[key] ? "rotate-180" : ""
              }`}
            />
          </button>

          {expanded[key] && (
            <div className="bg-white divide-y divide-slate-100">
              {Object.entries(specs).map(([specKey, specValue]) => {
                if (specKey.toLowerCase().includes(key) || specKey === key) {
                  return (
                    <div
                      key={specKey}
                      className="px-4 py-3 grid grid-cols-[150px,1fr] gap-4"
                    >
                      <dt className="text-sm font-medium text-slate-600 capitalize">
                        {specKey.replace(/([A-Z])/g, " $1").trim()}
                      </dt>
                      <dd className="text-sm text-slate-900 font-medium">
                        {specValue}
                      </dd>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
