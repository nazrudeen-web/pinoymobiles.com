import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

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
        <Link href="/" className="inline-block">
          <span className="text-xl font-bold text-white">PinoyMobiles</span>
        </Link>
      </div>
      <p className="text-sm text-white/70">
        Find the best phone deals from verified sellers across the Philippines.
      </p>
      <div className="mt-4 flex gap-3">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
