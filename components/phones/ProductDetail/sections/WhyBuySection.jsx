import {
  Battery,
  Camera,
  Check,
  ChevronDown,
  Cpu,
  Monitor,
  Signal,
  Plug,
  ShieldCheck,
  ThermometerSun,
  X,
} from "lucide-react";

const ICONS = {
  Camera,
  Battery,
  Performance: Cpu,
  Display: Monitor,
};

export default function WhyBuySection({ phone, analysis, avgScore }) {
  const scoreNumber = Number(avgScore);
  const isTopPick = scoreNumber >= 8.8;
  const isGoodPick = scoreNumber >= 7.6;

  const verdictLabel = isTopPick
    ? "Top pick"
    : isGoodPick
      ? "Good choice"
      : "Consider alternatives";

  const uaeBuyingInfo = [
    {
      icon: Signal,
      label: "5G support in UAE",
      value: String(phone.specs?.network || "").toUpperCase().includes("5G")
        ? "Yes (Etisalat / du)"
        : "Check variant/specs",
    },
    {
      icon: Plug,
      label: "Charger in box",
      value: "Depends on seller",
    },
    {
      icon: ShieldCheck,
      label: "Warranty",
      value: "Depends on seller",
    },
    {
      icon: ThermometerSun,
      label: "Heat management",
      value:
        (analysis?.performance?.score || 0) >= 8.5
          ? "Good for daily use"
          : "May warm under heavy gaming",
    },
  ];

  const toStars = (scoreOutOf10) => {
    const stars = Math.max(0, Math.min(5, Math.round((scoreOutOf10 / 10) * 5)));
    return { filled: stars, empty: 5 - stars };
  };

  return (
    <section className="pb-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Expert rating (UAE)
          </p>
          <h2 className="mt-1 text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Why you should buy this (UAE)
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {verdictLabel} • Based on price, performance & availability in UAE
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl md:text-3xl font-bold text-foreground">
            {avgScore}
          </div>
          <div className="text-xs text-muted-foreground">Overall</div>
        </div>
      </div>

      <div className="mt-4 divide-y divide-border rounded-xl border border-border">
        {Object.values(analysis || {}).map((item) => {
          const { filled, empty } = toStars(item.score);
          const Icon = ICONS[item.label] || ICONS[item.label?.trim?.()] || Camera;

          return (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {item.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.summary}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-sm text-muted-foreground"
                  aria-hidden="true"
                >
                  {"★".repeat(filled)}{"☆".repeat(empty)}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {item.score.toFixed(1)}/10
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        <details className="group rounded-xl border border-border">
          <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              UAE buying info
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-4 pb-4 pt-1 text-sm text-muted-foreground">
            <div className="grid gap-2 md:grid-cols-2">
              {uaeBuyingInfo.map((row) => (
                <div key={row.label} className="flex items-start gap-2">
                  <row.icon className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-xs">{row.label}</div>
                    <div className="text-sm font-semibold text-foreground">
                      {row.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </details>

        <details className="group rounded-xl border border-border">
          <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              Detailed breakdown
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <div className="px-4 pb-4 pt-1 space-y-4">
            {Object.values(analysis || {}).map((item) => (
              <div key={item.label} className="text-sm">
                <div className="font-semibold text-foreground">
                  {item.label}
                </div>
                {item.good?.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {item.good.slice(0, 3).map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {item.bad?.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {item.bad.slice(0, 2).map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <X className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
