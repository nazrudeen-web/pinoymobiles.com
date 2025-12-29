import Image from "next/image";
import { Clock, Bell } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function UpcomingPhoneCard({ phone, index = 0 }) {
  return (
    <div className="shrink-0 w-[calc(100%-32px)] md:w-[calc(33.333%-11px)] snap-start">
      <div className="relative bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full uae-card-hover">
        {/* Countdown badge removed */}

        <div className="flex gap-4">
          {/* Phone Image */}
          <div className="shrink-0 w-24 h-32 relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl overflow-hidden">
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
              <span className="text-[10px] font-semibold text-muted-foreground uppercase">
                {typeof phone.brand === 'string' ? phone.brand : (phone.brand?.name || '')}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2">
              {phone.name}
            </h3>

            <p className="text-[10px] text-muted-foreground mb-3">
              Expected: {phone.launchDate}
            </p>

            <div className="space-y-1">
              {phone.highlights.slice(0, 2).map((highlight, idx) => (
                <p
                  key={idx}
                  className="text-[10px] text-muted-foreground flex items-start gap-1.5"
                >
                  <span className="mt-1 h-1 w-1 rounded-full bg-primary shrink-0" />
                  <span className="line-clamp-1">{highlight}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Price Footer */}
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground">Expected price</p>
            <p className="text-base font-bold text-foreground">
              {formatCurrency(phone.best_price ?? phone.price ?? 0)}
            </p>
          </div>
          <button className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary/80 border border-primary/30 hover:border-primary/50 px-3 py-1.5 rounded-lg transition-colors">
            <Bell className="h-3 w-3" />
            Notify me
          </button>
        </div>
      </div>
    </div>
  );
}
