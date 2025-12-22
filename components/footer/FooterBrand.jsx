import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import UAEFlag from "@/components/ui/UAEFlag";

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
          {/* Mini UAE Logo */}
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true">
              <circle cx="20" cy="8" r="2" opacity="0.9" />
              <circle cx="8" cy="20" r="2" opacity="0.9" />
              <circle cx="32" cy="20" r="2" opacity="0.9" />
              <circle cx="20" cy="32" r="2" opacity="0.9" />
              <rect x="14" y="12" width="12" height="18" rx="2" opacity="0.95" />
              <rect x="16" y="14" width="8" height="10" rx="1" fill="currentColor" opacity="0.35" />
              <circle cx="20" cy="27" r="1.5" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
          <div className="flex flex-col -space-y-0.5">
            <span className="text-lg font-bold text-foreground">UAEMobileGuide</span>
            <div className="flex items-center gap-1">
              <UAEFlag className="w-3 h-2" />
              <span className="text-[8px] font-bold text-primary tracking-widest">
                BEST DEALS
              </span>
            </div>
          </div>
        </Link>
      </div>
      <p className="text-sm text-muted-foreground">
          Find the best phone deals across stores in the UAE.
      </p>
      <div className="mt-4 flex gap-3">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
