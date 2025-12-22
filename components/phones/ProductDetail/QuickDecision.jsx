"use client";

import {
  Camera,
  Battery,
  Gamepad2,
  Briefcase,
  Video,
  Music,
  MapPin,
  GraduationCap,
  Check,
  X,
} from "lucide-react";

const useCases = [
  {
    id: "camera",
    label: "Photography",
    icon: Camera,
    keywords: ["camera", "48MP", "50MP", "64MP", "108MP", "200MP"],
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: Gamepad2,
    keywords: [
      "gaming",
      "snapdragon 8",
      "dimensity 9",
      "a18",
      "120hz",
      "144hz",
    ],
  },
  {
    id: "battery",
    label: "Long Battery",
    icon: Battery,
    keywords: ["5000", "5500", "6000", "mah"],
  },
  {
    id: "work",
    label: "Work/Business",
    icon: Briefcase,
    keywords: ["stylus", "s pen", "multitasking"],
  },
  {
    id: "video",
    label: "Video Creation",
    icon: Video,
    keywords: ["4k", "8k", "ois", "stabilization"],
  },
  {
    id: "student",
    label: "Students",
    icon: GraduationCap,
    keywords: ["budget", "mid-range", "value"],
  },
];

function checkSuitability(phone, useCase) {
  const allSpecs = JSON.stringify(phone.specs || {}).toLowerCase();
  const highlights = (phone.highlights || []).join(" ").toLowerCase();
  const category = (phone.category || "").toLowerCase();
  const combined = `${allSpecs} ${highlights} ${category}`;

  const matchCount = useCase.keywords.filter((keyword) =>
    combined.includes(keyword.toLowerCase())
  ).length;

  return matchCount >= 1;
}

export default function QuickDecision({ phone }) {
  const suitableFor = useCases.filter((uc) => checkSuitability(phone, uc));
  const notSuitableFor = useCases.filter((uc) => !checkSuitability(phone, uc));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6">
      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-4">
        🎯 Best For
      </h3>

      <div className="space-y-4">
        {/* Suitable For */}
        <div className="flex flex-wrap gap-2">
          {suitableFor.map((uc) => (
            <div
              key={uc.id}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-accent/10 border border-accent/20"
            >
              <uc.icon className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                {uc.label}
              </span>
              <Check className="h-3.5 w-3.5 text-accent" />
            </div>
          ))}
        </div>

        {/* Not Ideal For (show only if there are items) */}
        {notSuitableFor.length > 0 &&
          notSuitableFor.length < useCases.length && (
            <div>
              <p className="text-xs text-slate-400 mb-2">
                May not be ideal for:
              </p>
              <div className="flex flex-wrap gap-2">
                {notSuitableFor.slice(0, 3).map((uc) => (
                  <div
                    key={uc.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200"
                  >
                    <uc.icon className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">{uc.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* Who Should Buy */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">
          Perfect if you want:
        </h4>
        <ul className="space-y-1.5">
          {(phone.highlights || []).slice(0, 3).map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-slate-600"
            >
              <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
