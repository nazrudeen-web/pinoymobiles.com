"use client";

import { useEffect, useState } from "react";

const tabs = [
  { id: "prices", label: "💰 Prices" },
  { id: "verdict", label: "🎯 Verdict" },
  { id: "history", label: "📈 History" },
  { id: "details", label: "📝 Details" },
  { id: "specs", label: "📋 Specs" },
  { id: "compare", label: "⚖️ Compare" },
];

export default function TabBar({ activeSection }) {
  const [currentSection, setCurrentSection] = useState("prices");

  useEffect(() => {
    if (activeSection) {
      setCurrentSection(activeSection);
    }
  }, [activeSection]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-[64px] md:top-[104px] bg-white border-b border-slate-200 z-40 shadow-sm">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex min-w-min">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`relative px-4 md:px-6 py-3 md:py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  currentSection === tab.id
                    ? "text-[#00843D]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
                {currentSection === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00843D]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
