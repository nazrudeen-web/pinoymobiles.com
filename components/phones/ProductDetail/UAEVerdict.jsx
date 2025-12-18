"use client";

import {
  ThumbsUp,
  ThumbsDown,
  Award,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

// Calculate UAE Score based on phone attributes
function calculateUAEScore(phone) {
  let score = 0;
  let breakdown = {
    camera: 0,
    battery: 0,
    performance: 0,
    display: 0,
    value: 0,
  };

  // Base score from rating
  score = (phone.rating || 4.0) * 10;

  // Camera score (based on MP and features)
  const cameraSpec = phone.specs?.camera || "";
  if (cameraSpec.includes("200MP")) breakdown.camera = 10;
  else if (cameraSpec.includes("108MP") || cameraSpec.includes("50MP"))
    breakdown.camera = 9;
  else if (cameraSpec.includes("48MP")) breakdown.camera = 8;
  else if (cameraSpec.includes("64MP")) breakdown.camera = 8.5;
  else breakdown.camera = 7;

  // Battery score
  const batterySpec = phone.specs?.battery || "";
  if (batterySpec.includes("6000")) breakdown.battery = 10;
  else if (batterySpec.includes("5500") || batterySpec.includes("5000"))
    breakdown.battery = 9;
  else if (batterySpec.includes("4500")) breakdown.battery = 8;
  else breakdown.battery = 7;

  // Performance score (based on processor)
  const processor = phone.specs?.processor || "";
  if (
    processor.includes("A18") ||
    processor.includes("8 Gen 3") ||
    processor.includes("Tensor G4")
  )
    breakdown.performance = 10;
  else if (
    processor.includes("8 Gen 2") ||
    processor.includes("A17") ||
    processor.includes("Dimensity 9")
  )
    breakdown.performance = 9;
  else if (processor.includes("8 Gen 1") || processor.includes("Dimensity 8"))
    breakdown.performance = 8;
  else breakdown.performance = 7;

  // Display score
  const displaySpec = phone.specs?.display || "";
  if (displaySpec.includes("120Hz") || displaySpec.includes("144Hz"))
    breakdown.display = 9;
  else if (displaySpec.includes("90Hz")) breakdown.display = 8;
  else breakdown.display = 7;

  // Value score (price vs features)
  const price = phone.price || 20000;
  if (price < 10000) breakdown.value = phone.category === "Budget" ? 9 : 8;
  else if (price < 20000)
    breakdown.value = phone.category === "Mid-Range" ? 9 : 8;
  else if (price < 40000) breakdown.value = 7.5;
  else breakdown.value = 7;

  // Calculate final score (weighted average)
  const finalScore = (
    breakdown.camera * 0.25 +
    breakdown.battery * 0.2 +
    breakdown.performance * 0.25 +
    breakdown.display * 0.15 +
    breakdown.value * 0.15
  ).toFixed(1);

  return { score: parseFloat(finalScore), breakdown };
}

// Get verdict based on score and phone attributes
function getVerdict(phone, score) {
  const price = phone.price || 20000;
  const category = phone.category || "Mid-Range";

  if (score >= 9) {
    return {
      verdict: "Highly Recommended",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      icon: Award,
      message: `One of the best ${category.toLowerCase()} phones you can buy in the UAE right now.`,
    };
  } else if (score >= 8) {
    return {
      verdict: "Worth Buying",
      color: "text-[#00843D]",
      bgColor: "bg-[#00843D]/5",
      borderColor: "border-[#00843D]/20",
      icon: ThumbsUp,
      message: `A solid choice for your budget. Great ${
        price < 20000 ? "value for money" : "flagship experience"
      }.`,
    };
  } else if (score >= 7) {
    return {
      verdict: "Good Option",
      color: "text-[#EF3340]",
      bgColor: "bg-[#EF3340]/10",
      borderColor: "border-[#EF3340]/30",
      icon: TrendingUp,
      message: `Decent phone with some trade-offs. Consider comparing with alternatives.`,
    };
  } else {
    return {
      verdict: "Consider Alternatives",
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
      icon: AlertCircle,
      message: `There may be better options in this price range. Check our recommendations.`,
    };
  }
}

export default function UAEVerdict({ phone }) {
  const { score, breakdown } = calculateUAEScore(phone);
  const verdictData = getVerdict(phone, score);
  const VerdictIcon = verdictData.icon;

  const scoreCategories = [
    { label: "Camera", value: breakdown.camera, color: "bg-[#00843D]" },
    { label: "Battery", value: breakdown.battery, color: "bg-[#008B8B]" },
    {
      label: "Performance",
      value: breakdown.performance,
      color: "bg-[#EF3340]",
    },
    { label: "Display", value: breakdown.display, color: "bg-blue-500" },
    { label: "Value", value: breakdown.value, color: "bg-emerald-500" },
  ];

  return (
    <div
      className={`rounded-2xl border-2 ${verdictData.borderColor} ${verdictData.bgColor} p-5 md:p-6`}
    >
      {/* Header with Score */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <VerdictIcon className={`h-5 w-5 ${verdictData.color}`} />
            <span
              className={`text-sm font-bold uppercase tracking-wide ${verdictData.color}`}
            >
              {verdictData.verdict}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
            Should you buy the {phone.name}?
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {verdictData.message}
          </p>
        </div>

        {/* UAE Score Badge */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#00843D] to-[#006B31] flex items-center justify-center shadow-lg">
              <span className="text-xl md:text-2xl font-bold text-white">
                {score}
              </span>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#EF3340] text-[10px] font-bold text-white px-2 py-0.5 rounded-full whitespace-nowrap">
              UAE SCORE
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-5 gap-2 mt-6 pt-4 border-t border-slate-200/50">
        {scoreCategories.map((cat) => (
          <div key={cat.label} className="text-center">
            <div className="text-xs text-slate-500 mb-1">{cat.label}</div>
            <div
              className={`mx-auto w-8 h-8 rounded-full ${cat.color} flex items-center justify-center`}
            >
              <span className="text-xs font-bold text-white">{cat.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pros & Cons Quick View */}
      {(phone.pros?.length > 0 || phone.cons?.length > 0) && (
        <div className="grid md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-200/50">
          {/* Pros */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <ThumbsUp className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-600">
                What's Good
              </span>
            </div>
            <ul className="space-y-1">
              {(phone.pros || []).slice(0, 3).map((pro, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-600 flex items-start gap-2"
                >
                  <span className="text-emerald-500 mt-1">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <ThumbsDown className="h-4 w-4 text-red-500" />
              <span className="text-sm font-semibold text-red-500">
                What's Not
              </span>
            </div>
            <ul className="space-y-1">
              {(phone.cons || []).slice(0, 3).map((con, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-600 flex items-start gap-2"
                >
                  <span className="text-red-400 mt-1">−</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// Export score calculation for use in other components
export { calculateUAEScore };
