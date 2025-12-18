"use client";

import { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Check,
  X,
  ExternalLink,
  Bell,
  ChevronDown,
  ChevronUp,
  Truck,
  Clock,
  Camera,
  Battery,
  Cpu,
  Monitor,
  Zap,
  Award,
  AlertCircle,
  Users,
  Star,
} from "lucide-react";
import Header from "@/components/header/Header";
import SpecTable from "./SpecTable";
import ProductHero from "./ProductHero";
import SimilarCarousel from "./SimilarCarousel";
import MobileBottomBar from "./MobileBottomBar";
import { formatCurrency } from "@/lib/format";

// ===== DETAILED PHONE ANALYSIS FUNCTIONS =====

function analyzePhone(phone) {
  const price = phone.price || 20000;
  const specs = phone.specs || {};

  const analysis = {
    camera: analyzeCamera(specs, price),
    battery: analyzeBattery(specs, price),
    performance: analyzePerformance(specs, price),
    display: analyzeDisplay(specs, price),
    value: analyzeValue(phone, price),
  };

  const scores = Object.values(analysis).map((a) => a.score);
  const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(
    1
  );
  const verdict = generateVerdict(phone, analysis, avgScore);

  return { analysis, avgScore, verdict };
}

function analyzeCamera(specs, price) {
  const camera = specs.camera || "";
  let score = 7;
  let details = [];
  let good = [];
  let bad = [];

  if (camera.includes("200MP")) {
    score = 10;
    details.push(
      "The 200MP sensor is among the best in the market, capturing incredible detail even when cropping."
    );
    good.push("Industry-leading resolution");
    good.push("Excellent zoom quality");
  } else if (camera.includes("108MP") || camera.includes("50MP")) {
    score = 9;
    details.push(
      "This high-resolution sensor produces sharp, detailed photos in good lighting conditions."
    );
    good.push("Sharp daylight photos");
    good.push("Good for social media");
  } else if (camera.includes("64MP") || camera.includes("48MP")) {
    score = 8;
    details.push(
      "A capable camera that delivers good results for everyday photography."
    );
    good.push("Reliable everyday shooter");
  } else {
    score = 6;
    details.push(
      "Basic camera setup that works for casual photos but may struggle in challenging conditions."
    );
    bad.push("Limited in low light");
  }

  if (camera.includes("OIS")) {
    score = Math.min(score + 0.5, 10);
    good.push("OIS for steady videos");
  } else if (price > 15000) {
    bad.push("No optical stabilization");
  }

  if (camera.toLowerCase().includes("ultrawide") || camera.includes("+")) {
    good.push("Multiple lens options");
  }

  return {
    score,
    label: "Camera",
    icon: Camera,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    details,
    good,
    bad,
    summary:
      score >= 9
        ? "Flagship-level photography"
        : score >= 8
        ? "Great everyday camera"
        : score >= 7
        ? "Good for casual shots"
        : "Basic camera only",
  };
}

function analyzeBattery(specs, price) {
  const battery = specs.battery || "";
  let score = 7;
  let details = [];
  let good = [];
  let bad = [];

  if (
    battery.includes("6000") ||
    battery.includes("6500") ||
    battery.includes("7000")
  ) {
    score = 10;
    details.push(
      "The massive battery ensures you can go 2 days without charging with normal usage. Perfect for heavy users and travelers."
    );
    good.push("2-day battery life");
    good.push("Worry-free usage");
  } else if (battery.includes("5000") || battery.includes("5500")) {
    score = 9;
    details.push(
      "With 5000mAh+, you'll comfortably get through a full day even with heavy usage including gaming and streaming."
    );
    good.push("All-day battery life");
    good.push("Great for heavy use");
  } else if (battery.includes("4500")) {
    score = 8;
    details.push(
      "The 4500mAh battery provides solid daily battery life for most users. Heavy users may need an evening top-up."
    );
    good.push("Reliable daily battery");
  } else if (battery.includes("4000")) {
    score = 7;
    details.push(
      "Adequate battery that handles moderate use well but power users should keep a charger handy."
    );
    bad.push("May need midday charge");
  } else {
    score = 6;
    details.push(
      "Smaller battery capacity means you'll likely need to charge during the day with regular use."
    );
    bad.push("Frequent charging needed");
    bad.push("Not for heavy users");
  }

  if (battery.includes("120W") || battery.includes("150W")) {
    score = Math.min(score + 0.5, 10);
    good.push("Ultra-fast 120W+ charging");
    details.push("Ultra-fast charging means 0-100% in about 20 minutes!");
  } else if (battery.includes("65W") || battery.includes("67W")) {
    good.push("Fast 65W charging");
  }

  return {
    score,
    label: "Battery",
    icon: Battery,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    details,
    good,
    bad,
    summary:
      score >= 9
        ? "Exceptional battery life"
        : score >= 8
        ? "All-day endurance"
        : score >= 7
        ? "Average battery"
        : "Will need frequent charging",
  };
}

function analyzePerformance(specs, price) {
  const processor = (specs.processor || "").toLowerCase();
  const ram = specs.ram || "";
  let score = 7;
  let details = [];
  let good = [];
  let bad = [];

  if (
    processor.includes("a18") ||
    processor.includes("a17") ||
    processor.includes("8 gen 3") ||
    processor.includes("tensor")
  ) {
    score = 10;
    details.push(
      "This flagship processor handles everything from intensive gaming to professional video editing. Future-proof for 4-5 years of updates."
    );
    good.push("Top-tier performance");
    good.push("Future-proof for years");
    good.push("Max graphics gaming");
  } else if (processor.includes("8 gen 2") || processor.includes("8 gen 1")) {
    score = 9;
    details.push(
      "High-end processor that runs all games smoothly and handles multitasking without breaking a sweat."
    );
    good.push("Excellent gaming");
    good.push("Smooth multitasking");
  } else if (
    processor.includes("dimensity 9") ||
    processor.includes("dimensity 8")
  ) {
    score = 8.5;
    details.push(
      "MediaTek's flagship chips offer flagship-level performance with excellent power efficiency."
    );
    good.push("Great price-to-performance");
    good.push("Power efficient");
  } else if (
    processor.includes("snapdragon 7") ||
    processor.includes("dimensity 7")
  ) {
    score = 7.5;
    details.push(
      "Mid-range processor that handles everyday tasks well and can run most games at medium settings."
    );
    good.push("Good daily performance");
    bad.push("May struggle with heavy games");
  } else if (
    processor.includes("snapdragon 6") ||
    processor.includes("dimensity 6") ||
    processor.includes("helio")
  ) {
    score = 6.5;
    details.push(
      "Budget processor suitable for basic tasks like browsing, social media, and light gaming."
    );
    bad.push("Limited gaming capability");
    bad.push("May slow down over time");
  } else {
    score = 6;
    details.push(
      "Entry-level processor for basic smartphone usage. Best for calls, messaging, and simple apps."
    );
    bad.push("Basic tasks only");
  }

  if (ram.includes("12") || ram.includes("16")) {
    good.push(ram + " for heavy multitasking");
  } else if (ram.includes("4") || ram.includes("6")) {
    if (price > 15000) bad.push("Limited RAM for multitasking");
  }

  return {
    score,
    label: "Performance",
    icon: Cpu,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    details,
    good,
    bad,
    summary:
      score >= 9
        ? "Blazing fast flagship"
        : score >= 8
        ? "Powerful performer"
        : score >= 7
        ? "Smooth daily use"
        : "Basic performance",
  };
}

function analyzeDisplay(specs, price) {
  const display = (specs.display || "").toLowerCase();
  let score = 7;
  let details = [];
  let good = [];
  let bad = [];

  if (
    display.includes("amoled") ||
    display.includes("oled") ||
    display.includes("super retina")
  ) {
    score += 1.5;
    details.push(
      "AMOLED technology delivers vibrant colors, perfect blacks, and excellent contrast. Great for watching videos and gaming."
    );
    good.push("Vibrant AMOLED colors");
    good.push("Perfect black levels");
  } else if (display.includes("lcd") || display.includes("ips")) {
    details.push(
      "IPS LCD display offers good viewing angles and color accuracy, though blacks aren't as deep as AMOLED."
    );
    if (price > 20000) bad.push("LCD instead of AMOLED");
  }

  if (
    display.includes("120hz") ||
    display.includes("144hz") ||
    display.includes("165hz")
  ) {
    score += 1.5;
    good.push("Smooth 120Hz+ scrolling");
    good.push("Better gaming response");
    details.push(
      "High refresh rate makes everything feel buttery smooth - from scrolling feeds to competitive gaming."
    );
  } else if (display.includes("90hz")) {
    score += 0.5;
    good.push("Smooth 90Hz display");
  } else {
    if (price > 15000) bad.push("Standard 60Hz only");
  }

  if (display.includes("ltpo")) {
    good.push("LTPO saves battery");
  }

  if (display.includes("1440") || display.includes("qhd")) {
    good.push("Sharp QHD+ resolution");
  }

  if (display.includes("hdr") || display.includes("dolby")) {
    good.push("HDR video support");
  }

  return {
    score: Math.min(score, 10),
    label: "Display",
    icon: Monitor,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    details,
    good,
    bad,
    summary:
      score >= 9
        ? "Stunning visual experience"
        : score >= 8
        ? "Great display quality"
        : score >= 7
        ? "Good screen"
        : "Basic display",
  };
}

function analyzeValue(phone, price) {
  let score = 7;
  let details = [];
  let good = [];
  let bad = [];

  if (price < 500) {
    score = 9;
    details.push(
      "At under AED 500, this phone offers essential smartphone features at an affordable price. Best for first-time smartphone users or as a backup device."
    );
    good.push("Very affordable");
    good.push("Great starter phone");
  } else if (price < 1000) {
    score = 8.5;
    details.push(
      "This price range often offers the best value in the UAE market - you get capable specs without overpaying for flagship features you might not need."
    );
    good.push("Sweet spot pricing");
    good.push("Best value segment");
  } else if (price < 1500) {
    score = 7.5;
    details.push(
      "Mid-range pricing that delivers premium features without the flagship tax. Good for users who want quality without spending too much."
    );
    good.push("Balanced investment");
  } else if (price < 2500) {
    score = 7;
    details.push(
      "Near-flagship pricing where you get most high-end features. Consider carefully if you'll use all the premium capabilities."
    );
    bad.push("Significant investment");
  } else {
    score = 6;
    details.push(
      "Flagship pricing means you're paying for the absolute best. Worth it if you'll maximize all features, otherwise consider alternatives."
    );
    bad.push("Premium flagship price");
    bad.push("Many alternatives cheaper");
  }

  if (phone.brand === "Samsung" || phone.brand === "Apple") {
    good.push("Strong resale value");
    good.push("Reliable software updates");
  }

  return {
    score,
    label: "Value",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    details,
    good,
    bad,
    summary:
      score >= 8
        ? "Excellent bang for buck"
        : score >= 7
        ? "Fair pricing"
        : "Consider alternatives",
  };
}

function generateVerdict(phone, analysis, avgScore) {
  const score = parseFloat(avgScore);

  let verdict = {
    rating: "",
    headline: "",
    explanation: "",
    buyIf: [],
    avoidIf: [],
    idealFor: [],
  };

  if (score >= 8.5) {
    verdict.rating = "Highly Recommended";
    verdict.headline = "The " + phone.name + " is a top pick!";
    verdict.explanation =
      "This is one of the best phones you can buy in its price segment. It excels across the board with strong camera, battery, and performance. If your budget allows, this is a safe and rewarding choice.";
  } else if (score >= 7.5) {
    verdict.rating = "Recommended";
    verdict.headline = "The " + phone.name + " is a solid choice";
    verdict.explanation =
      "A well-rounded phone that delivers good value for your peso. While not perfect, it handles most tasks well and offers reliable daily performance. Worth considering if it fits your budget.";
  } else if (score >= 6.5) {
    verdict.rating = "Consider Carefully";
    verdict.headline = "The " + phone.name + " has trade-offs";
    verdict.explanation =
      "This phone has some good points but also notable weaknesses. Make sure its strengths match your priorities, or explore other options in this price range.";
  } else {
    verdict.rating = "Look for Alternatives";
    verdict.headline = "Better options may exist";
    verdict.explanation =
      "At this price point, there may be better alternatives available. Consider other phones unless this specific model has features you specifically need.";
  }

  // Generate buyIf based on high-scoring areas
  if (analysis.camera.score >= 8)
    verdict.buyIf.push("📸 You love taking photos and videos");
  if (analysis.battery.score >= 8.5)
    verdict.buyIf.push("🔋 You need reliable all-day battery");
  if (analysis.performance.score >= 8.5)
    verdict.buyIf.push("🎮 You play games or multitask heavily");
  if (analysis.display.score >= 8)
    verdict.buyIf.push("📺 You watch lots of videos and content");
  if (analysis.value.score >= 8)
    verdict.buyIf.push("💰 You want maximum value for your budget");

  // Generate avoidIf based on low-scoring areas
  if (analysis.camera.score < 7)
    verdict.avoidIf.push("📸 Camera quality is your top priority");
  if (analysis.battery.score < 7)
    verdict.avoidIf.push("🔋 You need long battery life");
  if (analysis.performance.score < 7)
    verdict.avoidIf.push("🎮 You play demanding games");
  if (analysis.display.score < 7.5)
    verdict.avoidIf.push("📺 Display quality matters to you");
  if (analysis.value.score < 7)
    verdict.avoidIf.push("💰 You're on a tight budget");

  // Ideal use cases
  if (analysis.camera.score >= 8.5) verdict.idealFor.push("Photography");
  if (analysis.performance.score >= 9) verdict.idealFor.push("Gaming");
  if (analysis.battery.score >= 9) verdict.idealFor.push("Heavy Usage");
  if (analysis.value.score >= 8) verdict.idealFor.push("Budget-Conscious");
  if (analysis.display.score >= 8.5) verdict.idealFor.push("Entertainment");

  // Ensure minimums
  if (verdict.buyIf.length === 0)
    verdict.buyIf.push("✅ You want a reliable everyday phone");
  if (verdict.avoidIf.length === 0)
    verdict.avoidIf.push("⚠️ You need the absolute best specs");
  if (verdict.idealFor.length === 0) verdict.idealFor.push("Daily Use");

  return verdict;
}

// ===== RETAILERS DATA =====
const getRetailers = (basePrice) => [
  {
    id: "kimstore",
    name: "Kimstore",
    logo: "🏪",
    price: Math.round(basePrice * 0.95),
    badge: "Best Price",
    badgeColor: "bg-emerald-500",
    freeShipping: true,
    days: "2-4",
  },
  {
    id: "shopee",
    name: "Shopee",
    logo: "🛒",
    price: Math.round(basePrice * 0.98),
    badge: null,
    freeShipping: false,
    days: "3-7",
  },
  {
    id: "lazada",
    name: "Lazada",
    logo: "🛍️",
    price: basePrice,
    badge: "Official",
    badgeColor: "bg-[#00843D]",
    freeShipping: true,
    days: "2-5",
  },
  {
    id: "abenson",
    name: "Abenson",
    logo: "🏬",
    price: Math.round(basePrice * 1.02),
    badge: null,
    freeShipping: false,
    days: "1-3",
  },
  {
    id: "sm",
    name: "SM Appliance",
    logo: "🏢",
    price: Math.round(basePrice * 1.05),
    badge: null,
    freeShipping: true,
    days: "3-5",
  },
];

// ===== MAIN COMPONENT =====
export default function ProductDetailPage({ phone, allPhones }) {
  const [showAllPrices, setShowAllPrices] = useState(false);
  const [expandedAnalysis, setExpandedAnalysis] = useState(null);

  const retailers = getRetailers(phone.price);
  const lowestPrice = Math.min(...retailers.map((r) => r.price));
  const displayedRetailers = showAllPrices ? retailers : retailers.slice(0, 3);

  // Get detailed analysis
  const { analysis, avgScore, verdict } = analyzePhone(phone);
  const isHighlyRec = verdict.rating === "Highly Recommended";
  const isRecommended = verdict.rating.includes("Recommended");

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <ProductHero
        phone={phone}
        lowestPrice={lowestPrice}
        highestPrice={retailers[retailers.length - 1].price}
        retailersCount={retailers.length}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8 pb-24 md:pb-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* ===== SECTION 1: UAE VERDICT ===== */}
            <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {/* Verdict Header */}
              <div
                className={`px-5 py-5 ${
                  isHighlyRec
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                    : isRecommended
                    ? "bg-gradient-to-r from-[#00843D] to-[#006B31]"
                    : "bg-gradient-to-r from-slate-500 to-slate-600"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {isHighlyRec ? (
                        <Award className="h-5 w-5 text-yellow-300" />
                      ) : isRecommended ? (
                        <ThumbsUp className="h-5 w-5 text-white/90" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-white/80" />
                      )}
                      <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                        UAE Verdict
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {verdict.rating}
                    </h2>
                    <p className="text-sm text-white/90 leading-relaxed">
                      {verdict.headline}
                    </p>
                  </div>
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                      <div className="text-center">
                        <span className="text-2xl md:text-3xl font-bold text-white">
                          {avgScore}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-white/70 mt-1.5 uppercase tracking-wide">
                      UAE Score
                    </span>
                  </div>
                </div>
              </div>

              {/* Verdict Content */}
              <div className="p-5">
                {/* Expert Summary */}
                <div className="mb-5 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {verdict.explanation}
                  </p>
                </div>

                {/* Score Breakdown Mini */}
                <div className="flex flex-wrap gap-3 mb-5">
                  {Object.values(analysis).map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full ${item.bgColor} border ${item.borderColor}`}
                    >
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span className="text-xs font-medium text-slate-700">
                        {item.label}
                      </span>
                      <span className={`text-xs font-bold ${item.color}`}>
                        {item.score}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Buy If / Avoid If */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                        <ThumbsUp className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="font-bold text-emerald-800">
                        Buy This If...
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {verdict.buyIf.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-emerald-700"
                        >
                          <Check className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
                        <ThumbsDown className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="font-bold text-red-800">
                        Skip This If...
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {verdict.avoidIf.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-red-700"
                        >
                          <X className="h-4 w-4 mt-0.5 shrink-0 text-red-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* ===== SECTION 2: WHY WE SCORED IT THIS WAY ===== */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  📊 Why We Scored It This Way
                </h2>
                <span className="text-xs text-slate-500">Tap to expand</span>
              </div>

              <div className="space-y-3">
                {Object.values(analysis).map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl border overflow-hidden transition-all ${
                      expandedAnalysis === item.label
                        ? `${item.borderColor} ${item.bgColor}`
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <button
                      onClick={() =>
                        setExpandedAnalysis(
                          expandedAnalysis === item.label ? null : item.label
                        )
                      }
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center border ${item.borderColor}`}
                        >
                          <item.icon className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            {item.label}
                          </div>
                          <div className="text-xs text-slate-500">
                            {item.summary}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`min-w-[52px] text-center px-3 py-1.5 rounded-full ${item.bgColor}`}
                        >
                          <span className={`font-bold ${item.color}`}>
                            {item.score}/10
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-slate-400 transition-transform ${
                            expandedAnalysis === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {expandedAnalysis === item.label && (
                      <div className="px-4 pb-4 border-t border-slate-100 pt-4">
                        {/* Detailed Explanation */}
                        {item.details.length > 0 && (
                          <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                            {item.details[0]}
                          </p>
                        )}

                        {/* Good Points */}
                        {item.good.length > 0 && (
                          <div className="mb-3">
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">
                              What is Good
                            </span>
                            <ul className="mt-2 space-y-1.5">
                              {item.good.map((point, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 text-sm text-slate-700"
                                >
                                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Bad Points */}
                        {item.bad.length > 0 && (
                          <div>
                            <span className="text-xs font-bold text-red-500 uppercase tracking-wide">
                              What Could Be Better
                            </span>
                            <ul className="mt-2 space-y-1.5">
                              {item.bad.map((point, i) => (
                                <li
                                  key={i}
                                  className="flex items-center gap-2 text-sm text-slate-700"
                                >
                                  <X className="h-4 w-4 text-red-500 shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ===== SECTION 3: COMPARE PRICES ===== */}
            <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-[#00843D] to-[#006B31] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/80 font-medium mb-1">
                      💰 Best Price Today
                    </p>
                    <p className="text-2xl md:text-3xl font-bold text-white">
                      {formatCurrency(lowestPrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-emerald-300 font-medium">
                      Compare & save
                    </p>
                    <p className="text-lg font-bold text-emerald-300">
                      up to{" "}
                      {formatCurrency(
                        retailers[retailers.length - 1].price - lowestPrice
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {displayedRetailers.map((retailer, idx) => (
                  <div
                    key={retailer.id}
                    className={`flex items-center justify-between p-4 ${
                      idx === 0 ? "bg-emerald-50/50" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{retailer.logo}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">
                            {retailer.name}
                          </span>
                          {retailer.badge && (
                            <span
                              className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded ${retailer.badgeColor}`}
                            >
                              {retailer.badge}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Truck className="h-3 w-3" />
                            {retailer.freeShipping ? "Free" : "AED 10-20"}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {retailer.days} days
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-lg font-bold ${
                          idx === 0 ? "text-emerald-600" : "text-slate-900"
                        }`}
                      >
                        {formatCurrency(retailer.price)}
                      </span>
                      <a
                        href="#"
                        className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 ${
                          idx === 0
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Buy <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {retailers.length > 3 && (
                <button
                  onClick={() => setShowAllPrices(!showAllPrices)}
                  className="w-full py-3 text-sm font-medium text-[#00843D] hover:bg-[#00843D]/5 flex items-center justify-center gap-1 border-t border-slate-100"
                >
                  {showAllPrices ? (
                    <>
                      Show Less <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Show {retailers.length - 3} More Stores{" "}
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}

              <p className="text-[10px] text-slate-400 text-center py-2 bg-slate-50 border-t border-slate-100">
                💡 Prices may vary • Updated today
              </p>
            </section>

            {/* ===== SECTION 4: FULL SPECIFICATIONS ===== */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                📋 Full Specifications
              </h2>
              <SpecTable specs={phone.specs} />
            </section>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* Quick Score Summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-[#EF3340]" />
                Score Breakdown
              </h3>
              <div className="space-y-3">
                {Object.values(analysis).map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-600">
                        {item.label}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {item.score}/10
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${item.color.replace(
                          "text-",
                          "bg-"
                        )}`}
                        style={{ width: item.score * 10 + "%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  Overall Score
                </span>
                <span className="text-lg font-bold text-[#00843D]">
                  {avgScore}/10
                </span>
              </div>
            </div>

            {/* Ideal For */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-[#00843D]" />
                Ideal For
              </h3>
              <div className="flex flex-wrap gap-2">
                {verdict.idealFor.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-[#00843D]/10 text-[#00843D] text-xs font-semibold"
                  >
                    {item}
                  </span>
                ))}
                {phone.highlights?.slice(0, 2).map((h, i) => (
                  <span
                    key={"h-" + i}
                    className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Specs */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                ⚡ Key Specs
              </h3>
              <div className="space-y-2.5">
                {[
                  {
                    label: "Display",
                    value: phone.specs?.display?.split(",")[0],
                  },
                  { label: "Processor", value: phone.specs?.processor },
                  { label: "RAM", value: phone.specs?.ram },
                  { label: "Storage", value: phone.specs?.storage },
                  {
                    label: "Battery",
                    value: phone.specs?.battery?.split(",")[0],
                  },
                  {
                    label: "Camera",
                    value: phone.specs?.camera
                      ?.split("|")[0]
                      ?.split("+")[0]
                      ?.trim(),
                  },
                ]
                  .filter((s) => s.value)
                  .map((spec, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-slate-500">{spec.label}</span>
                      <span className="font-medium text-slate-900 text-right truncate max-w-[55%]">
                        {spec.value}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Price Alert */}
            <div className="bg-gradient-to-br from-[#EF3340]/10 to-[#FF4D5A]/5 rounded-xl border border-[#EF3340]/20 p-4">
              <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
                <Bell className="h-4 w-4 text-[#EF3340]" />
                Price Drop Alert
              </h3>
              <p className="text-xs text-slate-600 mb-3">
                Get notified when price drops
              </p>
              <button className="w-full bg-[#EF3340] hover:bg-[#C41E2A] text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors">
                Set Alert
              </button>
            </div>
          </div>
        </div>

        {/* Similar Phones */}
        <div className="mt-8">
          <SimilarCarousel currentPhone={phone} allPhones={allPhones} />
        </div>
      </div>

      <MobileBottomBar
        lowestPrice={lowestPrice}
        retailersCount={retailers.length}
      />
    </div>
  );
}
