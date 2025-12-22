"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SpecTable from "../SpecTable";

export default function SpecificationsSection({ phone }) {
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Specifications</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Quick view first. Expand for full details.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowSpecs((v) => !v)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary shrink-0"
        >
          {showSpecs ? "Hide full" : "Show full"}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${showSpecs ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="p-4">
            <p className="text-[11px] font-semibold text-muted-foreground mb-1">
              Display
            </p>
            <p className="text-sm font-semibold text-foreground">
              {phone?.specs?.display || "—"}
            </p>
          </div>
          <div className="p-4">
            <p className="text-[11px] font-semibold text-muted-foreground mb-1">
              Processor
            </p>
            <p className="text-sm font-semibold text-foreground">
              {phone?.specs?.processor || "—"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border border-t border-border">
          <div className="p-4">
            <p className="text-[11px] font-semibold text-muted-foreground mb-1">
              Camera
            </p>
            <p className="text-sm font-semibold text-foreground">
              {phone?.specs?.camera || "—"}
            </p>
          </div>
          <div className="p-4">
            <p className="text-[11px] font-semibold text-muted-foreground mb-1">
              Battery
            </p>
            <p className="text-sm font-semibold text-foreground">
              {phone?.specs?.battery || "—"}
            </p>
          </div>
        </div>

        {!showSpecs && (
          <div className="px-4 py-3 text-xs text-muted-foreground bg-muted/20 border-t border-border">
            Showing 4 key specs. Click “Show full” for complete specifications.
          </div>
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
