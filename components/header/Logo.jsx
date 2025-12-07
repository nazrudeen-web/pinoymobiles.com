import Link from "next/link";
import { Smartphone } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      {/* Logo Icon */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center justify-center w-10 h-10 bg-linear-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-xl shadow-lg">
          <Smartphone className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-slate-900">
          Pinoy<span className="text-violet-600">Mobiles</span>
        </span>
        <span className="text-[10px] font-medium text-slate-500 tracking-wide uppercase">
          Phone Comparison PH
        </span>
      </div>
    </Link>
  );
}
