import { ChevronRight } from "lucide-react";

export function HowToStep({ step }) {
  const Icon = step.icon;
  return (
    <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 p-6 md:p-8 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100">
            <Icon className="h-6 w-6 text-violet-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
            {step.step}. {step.title}
          </h3>
          <p className="text-slate-600 text-sm md:text-base mb-4">
            {step.description}
          </p>
          <ul className="space-y-2">
            {step.tips.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-slate-600"
              >
                <ChevronRight className="h-4 w-4 text-violet-600 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
