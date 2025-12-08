import { Bell } from "lucide-react";

export function PriceAlertBox() {
  return (
    <div className="mt-6 md:mt-8 bg-linear-to-r from-violet-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-violet-100">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="h-5 w-5 text-violet-600" />
            <h3 className="font-bold text-slate-900">Price Drop Alert</h3>
          </div>
          <p className="text-sm text-slate-600">
            Get notified when the price drops. We'll email you!
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 md:w-64 border border-violet-200 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 bg-white"
          />
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 md:px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shrink-0">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}
