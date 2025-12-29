"use client";

import { useState } from "react";
import {
  Battery,
  Camera,
  Check,
  Cpu,
  Monitor,
  X,
  Award,
  ThumbsUp,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

const ICONS = {
  Camera,
  Battery,
  Performance: Cpu,
  Display: Monitor,
};

export default function WhyBuySection({ phone, analysis, avgScore }) {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (label) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Helper to convert various data formats to array of strings
  const toArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value
        .map(v => {
          if (typeof v === 'string') return v;
          if (typeof v === 'object' && v !== null) {
            // Try to extract text from object
            if (v.details) return String(v.details);
            if (v.text) return String(v.text);
            if (v.value) return String(v.value);
            return '';
          }
          return String(v);
        })
        .filter(s => s && s.trim());
    }
    if (typeof value === 'string') {
      return value.split('\n').map(s => s.trim()).filter(s => s);
    }
    if (typeof value === 'object' && value !== null) {
      // If it's an object, try to extract text from common keys
      if (value.details) return toArray(value.details);
      if (value.text) return toArray(value.text);
      if (value.value) return toArray(value.value);
      return [];
    }
    return [];
  };

  // Use real expert_rating data from Supabase if available
  const expertRating = phone?.expert_rating;
  const overallScore = Number(expertRating?.overall_score || avgScore || 0);
  
  // Build analysis from expert_rating fields
  const categories = [];
  
  if (expertRating?.display_score) {
    categories.push({
      label: 'Display',
      score: Number(expertRating.display_score),
      summary: typeof expertRating.display_details === 'string' ? expertRating.display_details : 'Display quality and performance',
      good: toArray(expertRating.display_pros),
      bad: toArray(expertRating.display_cons),
    });
  }
  
  if (expertRating?.camera_score) {
    categories.push({
      label: 'Camera',
      score: Number(expertRating.camera_score),
      summary: typeof expertRating.camera_details === 'string' ? expertRating.camera_details : 'Camera quality and features',
      good: toArray(expertRating.camera_pros),
      bad: toArray(expertRating.camera_cons),
    });
  }
  
  if (expertRating?.performance_score) {
    categories.push({
      label: 'Performance',
      score: Number(expertRating.performance_score),
      summary: typeof expertRating.performance_details === 'string' ? expertRating.performance_details : 'Processing power and speed',
      good: toArray(expertRating.performance_pros),
      bad: toArray(expertRating.performance_cons),
    });
  }
  
  if (expertRating?.battery_score) {
    categories.push({
      label: 'Battery',
      score: Number(expertRating.battery_score),
      summary: typeof expertRating.battery_details === 'string' ? expertRating.battery_details : 'Battery life and charging',
      good: toArray(expertRating.battery_pros),
      bad: toArray(expertRating.battery_cons),
    });
  }

  // Fallback to analysis if expert_rating categories are empty
  const displayedCategories = categories.length > 0 ? categories : (Object.values(analysis || {}) || []);

  const scoreNumber = Number(overallScore);
  const isTopPick = scoreNumber >= 8.8;
  const isGoodPick = scoreNumber >= 7.6;

  const verdictLabel = isTopPick
    ? "Top pick"
    : isGoodPick
      ? "Good choice"
      : "Consider alternatives";

  const VerdictIcon = isTopPick ? Award : isGoodPick ? ThumbsUp : AlertCircle;

  const toStars = (scoreOutOf10) => {
    const stars = Math.max(0, Math.min(5, Math.round((scoreOutOf10 / 10) * 5)));
    return { filled: stars, empty: 5 - stars };
  };

  return (
    <section>
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs font-semibold">
                  <VerdictIcon className="h-3.5 w-3.5" />
                  {verdictLabel}
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground">
                Expert Rating
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Based on price, performance & availability in UAE
              </p>
            </div>

            {/* Score */}
            <div className="shrink-0 text-right">
              <div className="text-3xl font-bold text-primary">
                {overallScore}
              </div>
              <div className="text-xs text-muted-foreground">
                out of 10
              </div>
            </div>
          </div>
        </div>

        {/* Category ratings */}
        <div className="divide-y divide-border">
          {displayedCategories.map((item) => {
            const { filled, empty } = toStars(item.score);
            const Icon = ICONS[item.label] || ICONS[item.label?.trim?.()] || Camera;
            const hasDetails = (Array.isArray(item.good) && item.good.length > 0) || (Array.isArray(item.bad) && item.bad.length > 0);
            const isExpanded = expandedCategories[item.label];

            return (
              <div key={item.label} className="px-5 py-4">
                {/* Category header - clickable if has details */}
                <button
                  type="button"
                  onClick={() => hasDetails && toggleCategory(item.label)}
                  className={`w-full flex items-start justify-between gap-4 ${hasDetails ? "cursor-pointer" : "cursor-default"}`}
                  disabled={!hasDetails}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-foreground">
                        {item.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {typeof item.summary === 'string' ? item.summary : (item.summary?.details || item.summary?.text || 'No details')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">
                        {item.score.toFixed(1)}/10
                      </div>
                      <div className="text-xs">
                        <span className="text-primary">{"★".repeat(filled)}</span>
                        <span className="text-muted-foreground">{"☆".repeat(empty)}</span>
                      </div>
                    </div>
                    {hasDetails && (
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </button>

                {/* Breakdown points - hidden by default, shown on expand */}
                {hasDetails && isExpanded && (
                  <div className="space-y-1.5 pl-11 mt-3 pt-3 border-t border-border/50">
                    {item.good?.map((point, idx) => {
                      const pointText = typeof point === 'string' ? point : (point?.details || point?.text || JSON.stringify(point) || '');
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <Check className="h-3.5 w-3.5 text-green-600 mt-0.5 shrink-0" />
                          <span>{pointText}</span>
                        </div>
                      );
                    })}
                    {item.bad?.map((point, idx) => {
                      const pointText = typeof point === 'string' ? point : (point?.details || point?.text || JSON.stringify(point) || '');
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <X className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
                          <span>{pointText}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
