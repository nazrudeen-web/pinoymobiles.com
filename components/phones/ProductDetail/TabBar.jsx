"use client";

import { useEffect, useState } from "react";

const tabs = [
  { id: "prices", label: "Prices" },
  { id: "reviews", label: "Reviews" },
  { id: "history", label: "Price History" },
  { id: "details", label: "Product Details" },
  { id: "specs", label: "Specifications" },
  { id: "compare", label: "Compare" },
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
    <div className="sticky top-[64px] md:top-[104px] bg-white border-b border-slate-200 z-40">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex min-w-min">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`relative px-4 md:px-6 py-3 md:py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  currentSection === tab.id
                    ? "text-violet-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
                {currentSection === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
