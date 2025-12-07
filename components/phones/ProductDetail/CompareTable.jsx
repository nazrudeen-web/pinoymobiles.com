"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function CompareTable({ phone, allPhones }) {
  const [selectedPhones, setSelectedPhones] = useState([phone.slug]);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef(null);
  const filteredPhones = allPhones.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedPhones.includes(p.slug)
  );

  const getPhoneData = (phoneSlug) =>
    allPhones.find((p) => p.slug === phoneSlug);

  const specs = [
    { label: "Price", key: "price" },
    { label: "Screen", key: "display" },
    { label: "Processor", key: "processor" },
    { label: "RAM", key: "ram" },
    { label: "Storage", key: "storage" },
    { label: "Camera", key: "camera" },
    { label: "Battery", key: "battery" },
    { label: "Rating", key: "rating" },
  ];

  return (
    <div className="space-y-4">
      {/* Add Phone */}
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <input
          type="text"
          placeholder="Search phones to compare..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-3 outline-none focus:border-blue-500"
        />

        <div className="grid grid-cols-2 gap-2">
          {filteredPhones.slice(0, 4).map((p) => (
            <button
              key={p.slug}
              onClick={() => setSelectedPhones((prev) => [...prev, p.slug])}
              className="flex items-center gap-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-left text-sm"
            >
              <Plus className="h-4 w-4 text-slate-400" />
              <span className="text-slate-700 truncate">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      {selectedPhones.length >= 2 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 sticky left-0 bg-slate-50 w-32">
                    Specs
                  </th>
                  {selectedPhones.map((phoneSlug) => {
                    const p = getPhoneData(phoneSlug);
                    return (
                      <th
                        key={phoneSlug}
                        className="px-4 py-3 text-center text-sm font-semibold text-slate-900 min-w-[140px]"
                      >
                        <div className="text-center">
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {formatCurrency(p.price)}
                          </p>
                          <button
                            onClick={() =>
                              setSelectedPhones((prev) =>
                                prev.filter((s) => s !== phoneSlug)
                              )
                            }
                            className="mt-2 text-xs text-red-600 hover:text-red-700 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {specs.map((spec, i) => (
                  <tr
                    key={spec.key}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-slate-900 sticky left-0 bg-inherit w-32">
                      {spec.label}
                    </td>
                    {selectedPhones.map((phoneSlug) => {
                      const p = getPhoneData(phoneSlug);
                      const value = p.specs[spec.key] || "—";
                      return (
                        <td
                          key={phoneSlug}
                          className="px-4 py-3 text-sm text-slate-700 text-center min-w-[140px]"
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedPhones.length < 2 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <p className="text-sm text-blue-900">
            Select at least 2 phones to compare
          </p>
        </div>
      )}
    </div>
  );
}
