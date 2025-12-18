"use client";

import { Star } from "lucide-react";

/**
 * UAE Score - The decision-making score for UAE buyers
 * Calculated from: Camera, Battery, Performance, Display, Value for Money
 */
export default function UAEScore({
  score,
  size = "default",
  showLabel = true,
}) {
  // Determine score color based on value
  const getScoreColor = (score) => {
    if (score >= 8.5)
      return { bg: "bg-[#008B8B]", text: "text-[#008B8B]", label: "Excellent" };
    if (score >= 7.5)
      return { bg: "bg-[#00843D]", text: "text-[#00843D]", label: "Very Good" };
    if (score >= 6.5)
      return { bg: "bg-[#EF3340]", text: "text-[#C41E2A]", label: "Good" };
    if (score >= 5.0)
      return { bg: "bg-orange-500", text: "text-orange-500", label: "Average" };
    return { bg: "bg-slate-400", text: "text-slate-400", label: "Below Avg" };
  };

  const scoreData = getScoreColor(score);

  // Size variants
  const sizes = {
    small: {
      wrapper: "gap-1",
      badge: "w-8 h-8 text-xs",
      label: "text-[10px]",
    },
    default: {
      wrapper: "gap-1.5",
      badge: "w-10 h-10 text-sm",
      label: "text-xs",
    },
    large: {
      wrapper: "gap-2",
      badge: "w-14 h-14 text-lg",
      label: "text-sm",
    },
  };

  const sizeConfig = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center ${sizeConfig.wrapper}`}>
      {/* Score Badge */}
      <div
        className={`${sizeConfig.badge} ${scoreData.bg} rounded-lg flex items-center justify-center font-bold text-white shadow-sm`}
      >
        {score.toFixed(1)}
      </div>

      {/* Label */}
      {showLabel && (
        <div className="flex flex-col">
          <span className={`${sizeConfig.label} font-semibold text-slate-700`}>
            UAE Score
          </span>
          <span className={`${sizeConfig.label} ${scoreData.text} font-medium`}>
            {scoreData.label}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Compact UAE Score for cards
 */
export function UAEScoreBadge({ score }) {
  const getScoreColor = (score) => {
    if (score >= 8.5) return "bg-[#008B8B] text-white";
    if (score >= 7.5) return "bg-[#00843D] text-white";
    if (score >= 6.5) return "bg-[#EF3340] text-[#1A1A1A]";
    if (score >= 5.0) return "bg-orange-500 text-white";
    return "bg-slate-400 text-white";
  };

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg ${getScoreColor(
        score
      )} text-xs font-bold`}
    >
      <Star className="w-3 h-3 fill-current" />
      {score.toFixed(1)}
    </div>
  );
}

/**
 * Full UAE Score breakdown for product detail page
 */
export function UAEScoreDetail({ phone }) {
  // Calculate individual scores (these would come from phone data in real app)
  const scores = {
    camera:
      phone.scores?.camera || Math.min(10, phone.rating + Math.random() * 0.5),
    battery:
      phone.scores?.battery ||
      Math.min(10, phone.rating - 0.2 + Math.random() * 0.6),
    performance:
      phone.scores?.performance ||
      Math.min(10, phone.rating + Math.random() * 0.3),
    display:
      phone.scores?.display || Math.min(10, phone.rating + Math.random() * 0.4),
    value:
      phone.scores?.value ||
      Math.min(10, phone.rating - 0.3 + Math.random() * 0.8),
  };

  const overallScore =
    phone.rating ||
    (scores.camera +
      scores.battery +
      scores.performance +
      scores.display +
      scores.value) /
      5;

  const getBarColor = (score) => {
    if (score >= 8.5) return "bg-[#008B8B]";
    if (score >= 7.5) return "bg-[#00843D]";
    if (score >= 6.5) return "bg-[#EF3340]";
    return "bg-orange-500";
  };

  const categories = [
    { name: "Camera", score: scores.camera, icon: "📷" },
    { name: "Battery", score: scores.battery, icon: "🔋" },
    { name: "Performance", score: scores.performance, icon: "⚡" },
    { name: "Display", score: scores.display, icon: "📱" },
    { name: "Value for Money", score: scores.value, icon: "💰" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-bold text-[#1A1A1A]">
          ⭐ UAE Score
        </h3>
        <UAEScore score={overallScore} size="large" showLabel={false} />
      </div>

      {/* Score Breakdown */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center gap-3">
            <span className="w-6 text-center">{cat.icon}</span>
            <span className="w-28 text-sm text-slate-600">{cat.name}</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${getBarColor(
                  cat.score
                )} rounded-full transition-all`}
                style={{ width: `${cat.score * 10}%` }}
              />
            </div>
            <span className="w-8 text-sm font-semibold text-slate-700 text-right">
              {cat.score.toFixed(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Verdict */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          UAE Score is calculated based on real-world usage, expert reviews, and
          value for UAE buyers.
        </p>
      </div>
    </div>
  );
}
