"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Scale } from "lucide-react";

export default function TopBar({ compareCount = 0 }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="h-14 px-4 flex items-center justify-between max-w-2xl mx-auto w-full">
        <Link
          href="/phones"
          className="p-2 -ml-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-slate-900" />
        </Link>

        <div className="text-center">
          <span className="text-sm font-bold text-slate-900">
            UAEMobileGuide
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Search className="h-5 w-5 text-slate-600" />
          </button>
          <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Scale className="h-5 w-5 text-slate-600" />
            {compareCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
