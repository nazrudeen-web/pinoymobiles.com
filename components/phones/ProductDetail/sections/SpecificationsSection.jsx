"use client";

import { useState } from "react";
import { ChevronDown, Monitor, Cpu, Camera, Battery, Zap } from "lucide-react";
import SpecTable from "../SpecTable";

const SPEC_CONFIG = [
  { key: "display", label: "Display", icon: Monitor, highlight: true, color: "text-blue-500" },
  { key: "processor", label: "Processor", icon: Cpu, highlight: true, color: "text-orange-500" },
  { key: "camera", label: "Camera", icon: Camera, highlight: false, color: "text-muted-foreground" },
  { key: "battery", label: "Battery", icon: Battery, highlight: true, color: "text-green-500" },
];

export default function SpecificationsSection({ phone }) {
  const [showSpecs, setShowSpecs] = useState(false);

  // Use key_specifications from Supabase (sorted by sort_order)
  const keySpecs = Array.isArray(phone?.key_specifications) ? phone.key_specifications : [];

  return (
    <section>
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            Key Specifications
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Quick overview of main features
          </p>
        </div>

        {/* Specs Grid - Use real data from key_specifications */}
        <div className="p-4 grid gap-3 grid-cols-2 lg:grid-cols-4">
          {keySpecs.length > 0 ? (
            keySpecs.map((spec) => {
              const Icon = SPEC_CONFIG.find(s => s.label.toLowerCase().includes(spec.title?.toLowerCase() || ''))?.icon || Monitor;
              const color = SPEC_CONFIG.find(s => s.label.toLowerCase().includes(spec.title?.toLowerCase() || ''))?.color || 'text-muted-foreground';
              const highlight = SPEC_CONFIG.find(s => s.label.toLowerCase().includes(spec.title?.toLowerCase() || ''))?.highlight || false;
              
              return (
                <div
                  key={spec.id}
                  className={`rounded-xl border p-4 ${highlight ? "border-border bg-muted/50" : "border-border bg-muted/30"}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className={`text-xs font-medium ${highlight ? "text-foreground" : "text-muted-foreground"}`}>
                      {spec.title}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground line-clamp-2">
                    {spec.value}
                  </p>
                </div>
              );
            })
          ) : (
            // Fallback if no key specs
            SPEC_CONFIG.map((spec) => (
              <div
                key={spec.key}
                className={`rounded-xl border p-4 ${spec.highlight ? "border-border bg-muted/50" : "border-border bg-muted/30"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <spec.icon className={`h-4 w-4 ${spec.color}`} />
                  <span className={`text-xs font-medium ${spec.highlight ? "text-foreground" : "text-muted-foreground"}`}>
                    {spec.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground line-clamp-2">
                  —
                </p>
              </div>
            ))
          )}
        </div>

        {!showSpecs && (
          <button
            type="button"
            onClick={() => setShowSpecs(true)}
            className="w-full py-3.5 text-sm font-semibold text-primary hover:bg-primary/5 flex items-center justify-center gap-2 border-t border-border transition-colors"
          >
            <span>View Full Specifications</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        )}

        {showSpecs && (
          <button
            type="button"
            onClick={() => setShowSpecs(false)}
            className="w-full py-3.5 text-sm font-semibold text-primary hover:bg-primary/5 flex items-center justify-center gap-2 border-t border-border transition-colors"
          >
            <span>Hide Full Specifications</span>
            <ChevronDown className="h-4 w-4 rotate-180" />
          </button>
        )}
      </div>

      {showSpecs && (
        <div className="mt-4">
          <SpecTable specGroups={phone.specifications_grouped} />
        </div>
      )}
    </section>
  );
}
