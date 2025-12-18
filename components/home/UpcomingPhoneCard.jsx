import Image from "next/image";
import { Clock, Bell } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function UpcomingPhoneCard({ phone, index = 0 }) {
  return (
    <div className="shrink-0 w-[calc(100%-32px)] md:w-[calc(33.333%-11px)] snap-start">
      <div className="relative bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-[#1A1A1A]/30 transition-all duration-300 h-full uae-card-hover">
        {/* Countdown Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 rounded-full bg-[#1A1A1A] px-2.5 py-1 text-[10px] font-bold text-white">
            <Clock className="h-3 w-3" />
            <span>15 araw</span>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Phone Image */}
          <div className="shrink-0 w-24 h-32 relative bg-linear-to-br from-[#00843D]/5 to-[#EF3340]/5 rounded-xl overflow-hidden">
            <Image
              src={`/mobile${(index % 5) + 1}.jpg`}
              alt={phone.name}
              fill
              className="object-contain p-2"
              sizes="96px"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-semibold text-slate-500 uppercase">
                {phone.brand}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 mb-2">
              {phone.name}
            </h3>

            <p className="text-[10px] text-slate-500 mb-3">
              Inaasahan: {phone.launchDate}
            </p>

            <div className="space-y-1">
              {phone.highlights.slice(0, 2).map((highlight, idx) => (
                <p
                  key={idx}
                  className="text-[10px] text-slate-600 flex items-start gap-1.5"
                >
                  <span className="mt-1 h-1 w-1 rounded-full bg-[#00843D] shrink-0" />
                  <span className="line-clamp-1">{highlight}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Price Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500">Inaasahang Presyo</p>
            <p className="text-base font-bold text-[#1A1A1A]">
              {formatCurrency(phone.price)}
            </p>
          </div>
          <button className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00843D] hover:text-[#006B31] border border-[#00843D]/30 hover:border-[#00843D]/50 px-3 py-1.5 rounded-lg transition-colors sari-sari-glow">
            <Bell className="h-3 w-3" />
            Abisuhan ako
          </button>
        </div>
      </div>
    </div>
  );
}
