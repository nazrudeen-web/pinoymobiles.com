"use client";

import { useState } from "react";
import { ChevronDown, Monitor, Cpu, Camera, Battery, Zap } from "lucide-react";
import SpecTable from "../SpecTable";

const SPEC_CONFIG = [
  { key: "display", label: "Display", icon: Monitor },
  { key: "processor", label: "Processor", icon: Cpu },
  { key: "camera", label: "Camera", icon: Camera },
  { key: "battery", label: "Battery", icon: Battery },
];

export default function SpecificationsSection({ phone }) {
  const [showSpecs, setShowSpecs] = useState(false);

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

        {/* Specs Grid */}
        <div className="p-4 grid gap-3 grid-cols-2 lg:grid-cols-4">
          {SPEC_CONFIG.map((spec) => {
            const Icon = spec.icon;
            const value = phone?.specs?.[spec.key] || "—";
            return (
              <div
                key={spec.key}
                className="rounded-xl border border-border bg-muted/30 p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {spec.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground line-clamp-2">
                  {value}
                </p>
              </div>
            );
          })}
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
          <SpecTable specs={phone.specs} />
        </div>
      )}
    </section>
  );
}
