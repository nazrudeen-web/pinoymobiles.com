import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export default function CarouselPhoneCard({
  phone,
  index = 0,
  badge,
  badgeColors = "bg-orange-100 border-orange-300 text-orange-700",
  imageColors = "from-orange-50 to-red-50",
  hoverColor = "hover:border-orange-300 group-hover:text-orange-600",
  priceColor = "text-orange-600",
  subtitle,
}) {
  return (
    <Link
      href={`/phones/${phone.slug}`}
      className="shrink-0 w-[calc(50%-8px)] md:w-[calc(20%-13px)] group snap-start"
    >
      <div
        className={`relative bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg ${
          hoverColor.split(" ")[0]
        } transition-all duration-300`}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute top-2 right-2 z-10">
            <span
              className={`inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-bold ${badgeColors}`}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Phone Image */}
        <div
          className={`relative h-40 md:h-48 flex items-center justify-center bg-linear-to-br ${imageColors} rounded-xl mb-3 overflow-hidden`}
        >
          <Image
            src={`/mobile${(index % 5) + 1}.jpg`}
            alt={phone.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 160px, 200px"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase">
              {phone.brand}
            </span>
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] font-semibold text-slate-700">
                {phone.rating}
              </span>
            </div>
          </div>

          <h3
            className={`text-sm font-semibold text-slate-900 line-clamp-2 ${
              hoverColor.split(" ")[1] || ""
            } transition-colors min-h-10`}
          >
            {phone.name}
          </h3>

          <div className="pt-2 border-t border-slate-100">
            <p className={`text-lg font-bold ${priceColor}`}>
              {formatCurrency(phone.price)}
            </p>
            {subtitle && (
              <p className="text-[10px] text-slate-500">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
