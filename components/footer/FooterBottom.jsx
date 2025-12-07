import Link from "next/link";

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function FooterBottom() {
  return (
    <div className="flex flex-col gap-4 text-xs text-white/70">
      <p className="text-sm font-medium text-white/90">
        Made for Filipinos, by Filipinos. 🇵🇭
      </p>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>© 2024 PinoyMobiles. All rights reserved.</p>
        <div className="flex gap-6">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
