import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* Professional Enterprise Logo Icon */}
      <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-lg">
        {/* Modern abstract geometric logo icon */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 40 40"
          className="text-violet-600 group-hover:text-violet-700 transition-colors duration-200"
          fill="currentColor"
        >
          {/* Top left triangle - upward motion */}
          <polygon points="20,8 12,20 28,20" />

          {/* Bottom left curve - tech flow */}
          <path d="M 12 22 Q 8 26 10 32 Q 12 28 16 28 Z" />

          {/* Bottom right curve - tech flow */}
          <path d="M 28 22 Q 32 26 30 32 Q 28 28 24 28 Z" />

          {/* Center dot - focal point */}
          <circle cx="20" cy="26" r="2" />
        </svg>
      </div>

      {/* Logo Wordmark - Clean and Professional */}
      <div className="flex flex-col leading-tight -space-y-1">
        <div className="flex items-center gap-1">
          <span className="text-base font-bold text-slate-900">Pinoy</span>
          <span className="text-base font-bold text-violet-600">Mobiles</span>
        </div>
        <span className="text-[8px] font-semibold text-violet-600/70 tracking-widest uppercase">
          Philippines
        </span>
      </div>
    </Link>
  );
}
