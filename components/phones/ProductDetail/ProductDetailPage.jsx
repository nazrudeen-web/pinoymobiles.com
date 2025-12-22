"use client";

import { useState } from "react";
import {
  AlertCircle,
  Award,
  Battery,
  Camera,
  Check,
  Cpu,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Truck,
  Clock,
  Monitor,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import Header from "@/components/header/Header";
import SpecTable from "./SpecTable";
import ProductHero from "./ProductHero";
import SimilarCarousel from "./SimilarCarousel";
import MobileBottomBar from "./MobileBottomBar";
import { formatCurrency } from "@/lib/format";

function analyzePhone(phone) {
  const price = phone.price || 2000;
  const specs = phone.specs || {};

  const analysis = {
    camera: analyzeCamera(specs, price),
    battery: analyzeBattery(specs, price),
    performance: analyzePerformance(specs, price),
    display: analyzeDisplay(specs, price),
  };

  const scores = Object.values(analysis).map((a) => a.score);
  const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(
    1
  );

  return { analysis, avgScore };
}

function tokenizedCard(score) {
  if (score >= 9) {
    return {
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    };
  }
  if (score >= 7.5) {
    return {
      color: "text-primary",
      bgColor: "bg-muted/40",
      borderColor: "border-border",
    };
  }
  return {
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
  };
}

function analyzeCamera(specs, price) {
  const camera = String(specs.camera || "");
  let score = 7;
  const details = [];
  const good = [];
  const bad = [];

  if (camera.includes("200MP")) {
    score = 9.5;
    good.push("High-resolution main camera");
    details.push(
      "A high-resolution main sensor can capture more detail in good light."
    );
  } else if (camera.includes("108MP") || camera.includes("50MP")) {
    score = 8.8;
    good.push("Strong main camera for everyday shots");
  } else if (camera.includes("64MP") || camera.includes("48MP")) {
    score = 8;
    good.push("Solid camera for the price");
  } else {
    score = 6.5;
    bad.push("Basic camera setup");
  }

  if (camera.toUpperCase().includes("OIS")) {
    score = Math.min(score + 0.4, 10);
    good.push("OIS helps with low-light and video stability");
  } else if (price > 1200) {
    bad.push("No OIS listed");
  }

  if (camera.toLowerCase().includes("ultrawide") || camera.includes("+")) {
    good.push("Extra lens options (ultrawide/secondary)");
  }

  const tokens = tokenizedCard(score);

  return {
    score,
    label: "Camera",
    icon: Camera,
    ...tokens,
    details,
    good,
    bad,
    summary:
      score >= 9
        ? "Excellent camera"
        : score >= 8
        ? "Good everyday camera"
        : "Basic camera",
  };
}

function analyzeBattery(specs, price) {
  const battery = String(specs.battery || "");
  let score = 7;
  const details = [];
  const good = [];
  const bad = [];

  if (battery.includes("6000") || battery.includes("6500") || battery.includes("7000")) {
    score = 9.5;
    good.push("Large battery capacity");
  } else if (battery.includes("5000") || battery.includes("5500")) {
    score = 8.8;
    good.push("All-day battery for most users");
  } else if (battery.includes("4500")) {
    score = 8;
    good.push("Decent daily battery");
  } else if (battery.includes("4000")) {
    score = 7;
  } else {
    score = 6.5;
    bad.push("Smaller battery capacity");
  }

  if (battery.includes("120W") || battery.includes("150W")) {
    score = Math.min(score + 0.4, 10);
    good.push("Very fast charging");
    details.push("Fast charging can greatly reduce time plugged in.");
  } else if (battery.includes("65W") || battery.includes("67W")) {
    score = Math.min(score + 0.2, 10);
    good.push("Fast charging");
  }

  const tokens = tokenizedCard(score);

  return {
    score,
    label: "Battery",
    icon: Battery,
    ...tokens,
    details,
    good,
    bad,
    summary:
      score >= 9
        ? "Excellent battery"
        : score >= 8
        ? "All-day battery"
        : "Average battery",
  };
}

function analyzePerformance(specs, price) {
  const processor = String(specs.processor || "").toLowerCase();
  const ram = String(specs.ram || "");
  let score = 7;
  const details = [];
  const good = [];
  const bad = [];

  if (
    processor.includes("a18") ||
    processor.includes("a17") ||
    processor.includes("8 gen 3") ||
    processor.includes("8 gen 2")
  ) {
    score = 9.5;
    good.push("High-end performance");
  } else if (processor.includes("tensor") || processor.includes("dimensity 9")) {
    score = 9;
    good.push("Strong performance");
  } else if (processor.includes("snapdragon 7") || processor.includes("dimensity 7")) {
    score = 8;
    good.push("Good daily performance");
  } else if (
    processor.includes("snapdragon 6") ||
    processor.includes("dimensity 6") ||
    processor.includes("helio")
  ) {
    score = 6.8;
    bad.push("Best for basic use");
  } else {
    score = 6.5;
  }

  if (ram.includes("12") || ram.includes("16")) {
    good.push("Plenty of RAM for multitasking");
  } else if ((ram.includes("4") || ram.includes("6")) && price > 1200) {
    bad.push("Limited RAM for heavy multitasking");
  }

  const tokens = tokenizedCard(score);

  return {
    score,
    label: "Performance",
    icon: Cpu,
    ...tokens,
    details,
    good,
    bad,
    summary:
      score >= 9
        ? "Excellent performance"
        : score >= 8
        ? "Smooth daily use"
        : "Basic performance",
  };
}

function analyzeDisplay(specs, price) {
  const display = String(specs.display || "").toLowerCase();
  let score = 7;
  const details = [];
  const good = [];
  const bad = [];

  if (display.includes("amoled") || display.includes("oled")) {
    score += 1.2;
    good.push("OLED/AMOLED display");
  } else if (display.includes("lcd") || display.includes("ips")) {
    if (price > 1500) bad.push("LCD at this price");
  }

  if (display.includes("120hz") || display.includes("144hz") || display.includes("165hz")) {
    score += 1.2;
    good.push("High refresh rate");
    details.push("High refresh rate makes scrolling feel smoother.");
  } else if (display.includes("90hz")) {
    score += 0.4;
    good.push("90Hz refresh rate");
  } else {
    if (price > 1200) bad.push("Standard 60Hz");
  }

  const tokens = tokenizedCard(score);

  return {
    score: Math.min(score, 10),
    label: "Display",
    icon: Monitor,
    ...tokens,
    details,
    good,
    bad,
    summary:
      score >= 9
        ? "Excellent display"
        : score >= 8
        ? "Good display"
        : "Basic display",
  };
}

// ===== RETAILERS DATA =====
const getRetailers = (basePrice) => [
  {
    id: "kimstore",
    name: "Kimstore",
    logo: "🏪",
    price: Math.round(basePrice * 0.95),
    badge: "Best Price",
    badgeColor: "bg-primary",
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
    badgeColor: "bg-secondary",
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

  const { analysis, avgScore } = analyzePhone(phone);
  const scoreNumber = Number(avgScore);
  const isTopPick = scoreNumber >= 8.8;
  const isGoodPick = scoreNumber >= 7.6;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <ProductHero
        phone={phone}
        lowestPrice={lowestPrice}
        highestPrice={retailers[retailers.length - 1].price}
        retailersCount={retailers.length}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8 pb-24 md:pb-10">
        <div className="space-y-6">
          {/* Mobile Score */}
          <section className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="px-5 py-5 bg-gradient-to-r from-primary to-primary/80">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {isTopPick ? (
                      <Award className="h-5 w-5 text-yellow-300" />
                    ) : isGoodPick ? (
                      <ThumbsUp className="h-5 w-5 text-white/90" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-white/80" />
                    )}
                    <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                      Mobile Score
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {isTopPick
                      ? "Top pick"
                      : isGoodPick
                      ? "Good choice"
                      : "Consider alternatives"}
                  </h2>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Breakdown based on listed specs and price segment.
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
                    Overall
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap gap-3">
                {Object.values(analysis).map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full ${item.bgColor} border ${item.borderColor}`}
                  >
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.label}
                    </span>
                    <span className={`text-xs font-bold ${item.color}`}>
                      {item.score.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why it's good (details) */}
          <section className="bg-card rounded-2xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">
                Why it's good
              </h2>
              <span className="text-xs text-muted-foreground">Tap to expand</span>
            </div>

            <div className="space-y-3">
              {Object.values(analysis).map((item) => (
                <div
                  key={item.label}
                  className={`rounded-xl border overflow-hidden transition-all ${
                    expandedAnalysis === item.label
                      ? `${item.borderColor} ${item.bgColor}`
                      : "border-border hover:bg-muted/30"
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
                        <div className="font-semibold text-foreground">
                          {item.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.summary}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`min-w-[52px] text-center px-3 py-1.5 rounded-full ${item.bgColor}`}
                      >
                        <span className={`font-bold ${item.color}`}>
                          {item.score.toFixed(1)}/10
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground transition-transform ${
                          expandedAnalysis === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {expandedAnalysis === item.label && (
                    <div className="px-4 pb-4 border-t border-border pt-4">
                      {item.details.length > 0 && (
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {item.details[0]}
                        </p>
                      )}

                      {item.good.length > 0 && (
                        <div className="mb-3">
                          <span className="text-xs font-bold text-primary uppercase tracking-wide">
                            What's good
                          </span>
                          <ul className="mt-2 space-y-1.5">
                            {item.good.map((point, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2 text-sm text-foreground"
                              >
                                <Check className="h-4 w-4 text-primary shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.bad.length > 0 && (
                        <div>
                          <span className="text-xs font-bold text-destructive uppercase tracking-wide">
                            Could be better
                          </span>
                          <ul className="mt-2 space-y-1.5">
                            {item.bad.map((point, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2 text-sm text-foreground"
                              >
                                <X className="h-4 w-4 text-destructive shrink-0" />
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

          {/* Compare Prices */}
          <section className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="px-5 py-4 bg-primary/5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">
                    Compare Prices
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">
                    {formatCurrency(lowestPrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground font-medium">
                    Save up to
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(
                      retailers[retailers.length - 1].price - lowestPrice
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-border">
              {displayedRetailers.map((retailer, idx) => (
                <div
                  key={retailer.id}
                  className={`flex items-center justify-between p-4 ${
                    idx === 0 ? "bg-muted/30" : "hover:bg-muted/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{retailer.logo}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">
                          {retailer.name}
                        </span>
                        {retailer.badge && (
                          <span
                            className={`text-[10px] font-bold text-secondary-foreground px-1.5 py-0.5 rounded ${retailer.badgeColor}`}
                          >
                            {retailer.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
                        idx === 0 ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {formatCurrency(retailer.price)}
                    </span>
                    <a
                      href="#"
                      className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 ${
                        idx === 0
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-muted/60 text-foreground hover:bg-muted"
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
                className="w-full py-3 text-sm font-medium text-primary hover:bg-primary/5 flex items-center justify-center gap-1 border-t border-border"
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

            <p className="text-[10px] text-muted-foreground text-center py-2 bg-muted/30 border-t border-border">
              💡 Prices may vary • Updated today
            </p>
          </section>

          {/* Full Specifications */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">
              Specifications
            </h2>
            <SpecTable specs={phone.specs} />
          </section>
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
