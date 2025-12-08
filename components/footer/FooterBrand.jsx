import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import PhFlag from "@/components/ui/PhFlag";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function FooterBrand() {
  return (
    <div className="md:col-span-1">
      <div className="mb-4">
        <Link href="/" className="inline-flex items-center gap-2">
          {/* Mini Filipino Logo */}
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-[#6C2BD9] to-[#5521B0] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="white">
              <polygon points="20,2 18,8 22,8" opacity="0.9" />
              <polygon points="20,38 18,32 22,32" opacity="0.9" />
              <polygon points="2,20 8,18 8,22" opacity="0.9" />
              <polygon points="38,20 32,18 32,22" opacity="0.9" />
              <rect x="14" y="12" width="12" height="18" rx="2" />
              <rect x="16" y="14" width="8" height="10" rx="1" fill="#6C2BD9" />
              <circle cx="20" cy="27" r="1.5" fill="#F9B434" />
            </svg>
          </div>
          <div className="flex flex-col -space-y-0.5">
            <span className="text-lg font-bold text-white">PinoyMobiles</span>
            <div className="flex items-center gap-1">
              <PhFlag className="w-3 h-2" />
              <span className="text-[8px] font-bold text-[#F9B434] tracking-widest">
                SULIT DEALS
              </span>
            </div>
          </div>
        </Link>
      </div>
      <p className="text-sm text-white/70">
        Hanapin ang pinakasulit na phone deals mula sa verified sellers sa buong
        Pilipinas.
      </p>
      <div className="mt-4 flex gap-3">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#6C2BD9]/50 transition-colors"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
