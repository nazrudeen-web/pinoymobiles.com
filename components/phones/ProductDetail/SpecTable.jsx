"use client";

import { useState } from "react";

export default function SpecTable({ specGroups }) {
  const [activeSection, setActiveSection] = useState(null);

  // Jump to section handler
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`spec-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Use real specs from Supabase (specGroups object with groups as keys)
  const specGroups_ = specGroups || {};

  // Preserve original UI design: ordered groups with icons
  const GROUPS = [
    { key: "Display", icon: "📺" },
    { key: "Performance", icon: "⚡" },
    { key: "Camera", icon: "📷" },
    { key: "Battery", icon: "🔋" },
    { key: "Connectivity", icon: "📡" },
    { key: "Design", icon: "📐" },
  ];

  // Only include groups that exist and have specs
  const presentGroups = GROUPS.filter(
    (g) => Array.isArray(specGroups_[g.key]) && specGroups_[g.key].length > 0
  );

  // Quick jump sections based on available groups (first 4)
  const quickJumpSections = presentGroups.slice(0, 4).map((g) => ({
    id: g.key,
    label: g.key,
    icon: g.icon,
  }));

  return (
    <div className="space-y-6">
      {/* Jump to section buttons */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-border">
        <p className="text-xs text-muted-foreground mb-2">Jump to section</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {quickJumpSections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${
                activeSection === section.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-foreground border-border hover:border-primary/50"
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {presentGroups.map((group) => (
        <div key={group.key} id={`spec-${group.key}`} className="scroll-mt-20">
          {/* Category Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{group.icon}</span>
            <h3 className="text-sm md:text-base font-semibold text-foreground">
              {group.key}
            </h3>
          </div>

          {/* Specs Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-border">
                {(specGroups_[group.key] || []).map((spec, idx) => (
                  <tr
                    key={spec.id}
                    className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}
                  >
                    <td className="px-4 py-3 text-xs md:text-sm text-muted-foreground font-medium w-1/3 md:w-2/5">
                      {spec.spec_name}
                    </td>
                    <td className="px-4 py-3 text-xs md:text-sm text-foreground font-medium">
                      {spec.spec_value || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
