import { ThumbsUp, ThumbsDown, Check, X } from "lucide-react";

export default function PhoneProsCons({ pros, cons }) {
  return (
    <section className="mt-8">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Pros & Cons</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            What's great and what could be better
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-slate-100">
          <ProsCard pros={pros} />
          <ConsCard cons={cons} />
        </div>
      </div>
    </section>
  );
}

function ProsCard({ pros }) {
  return (
    <div className="bg-white p-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 mb-4">
        <ThumbsUp className="h-4 w-4 text-emerald-600" />
        <span className="text-sm font-bold text-emerald-700">Pros</span>
      </div>

      <ul className="space-y-3">
        {pros.map((pro, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
            </span>
            <span className="text-sm text-slate-700">{pro}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConsCard({ cons }) {
  return (
    <div className="bg-white p-6">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-100 mb-4">
        <ThumbsDown className="h-4 w-4 text-rose-600" />
        <span className="text-sm font-bold text-rose-700">Cons</span>
      </div>

      <ul className="space-y-3">
        {cons.map((con, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100">
              <X className="h-3 w-3 text-rose-600" strokeWidth={3} />
            </span>
            <span className="text-sm text-slate-700">{con}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
