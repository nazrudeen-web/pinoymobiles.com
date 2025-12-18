import Link from "next/link";
import UAEFlag from "@/components/ui/UAEFlag";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* UAE-Modern Logo Icon */}
      <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-linear-to-br from-[#00843D] to-[#006B31] shadow-lg shadow-[#00843D]/30 group-hover:shadow-[#00843D]/50 transition-all duration-300">
        <svg
          width="28"
          height="28"
          viewBox="0 0 40 40"
          className="text-white"
          fill="currentColor"
        >
          {/* Modern Phone Icon */}
          <g opacity="0.9">
            {/* Decorative elements */}
            <circle cx="20" cy="8" r="2" />
            <circle cx="8" cy="20" r="2" />
            <circle cx="32" cy="20" r="2" />
            <circle cx="20" cy="32" r="2" />
          </g>
          {/* Central Phone Icon */}
          <rect
            x="14"
            y="12"
            width="12"
            height="18"
            rx="2"
            fill="currentColor"
          />
          <rect x="16" y="14" width="8" height="10" rx="1" fill="#00843D" />
          <circle cx="20" cy="27" r="1.5" fill="#EF3340" />{" "}
          {/* Gold home button */}
        </svg>
      </div>

      {/* Logo Wordmark - UAE Modern */}
      <div className="flex flex-col leading-tight -space-y-0.5">
        <div className="flex items-center">
          <span className="text-base font-bold text-[#1A1A1A]">UAE</span>
          <span className="text-base font-bold text-[#00843D]">
            MobileGuide
          </span>
        </div>
        <div className="flex items-center gap-1">
          {/* <UAEFlag className="w-3 h-2" /> */}
          <span className="text-[8px] font-bold text-[#EF3340] tracking-widest uppercase">
            Choose smart. Buy right.
          </span>
        </div>
      </div>
    </Link>
  );
}
