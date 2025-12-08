import Link from "next/link";
import PhFlag from "@/components/ui/PhFlag";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* Filipino-Modern Logo Icon with Sun Rays */}
      <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-linear-to-br from-[#6C2BD9] to-[#5521B0] shadow-lg shadow-[#6C2BD9]/30 group-hover:shadow-[#6C2BD9]/50 transition-all duration-300">
        <svg
          width="28"
          height="28"
          viewBox="0 0 40 40"
          className="text-white"
          fill="currentColor"
        >
          {/* Philippine Sun Rays - 8 rays like PH flag */}
          <g opacity="0.9">
            {/* Main sun rays */}
            <polygon points="20,2 18,8 22,8" /> {/* Top */}
            <polygon points="20,38 18,32 22,32" /> {/* Bottom */}
            <polygon points="2,20 8,18 8,22" /> {/* Left */}
            <polygon points="38,20 32,18 32,22" /> {/* Right */}
            {/* Diagonal rays */}
            <polygon points="7,7 11,10 10,11" />
            <polygon points="33,7 29,10 30,11" />
            <polygon points="7,33 11,30 10,29" />
            <polygon points="33,33 29,30 30,29" />
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
          <rect x="16" y="14" width="8" height="10" rx="1" fill="#6C2BD9" />
          <circle cx="20" cy="27" r="1.5" fill="#F9B434" />{" "}
          {/* Mango gold home button */}
        </svg>
      </div>

      {/* Logo Wordmark - Filipino Modern */}
      <div className="flex flex-col leading-tight -space-y-0.5">
        <div className="flex items-center">
          <span className="text-base font-bold text-[#1F2A44]">Pinoy</span>
          <span className="text-base font-bold text-[#6C2BD9]">Mobiles</span>
        </div>
        <div className="flex items-center gap-1">
          <PhFlag className="w-3 h-2" />
          <span className="text-[8px] font-bold text-[#F9B434] tracking-widest uppercase">
            Sulit Deals
          </span>
        </div>
      </div>
    </Link>
  );
}
