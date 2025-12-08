import Link from "next/link";
import PhFlag from "@/components/ui/PhFlag";

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function FooterBottom() {
  return (
    <div className="flex flex-col gap-4 text-xs text-white/70">
      <div className="flex items-center gap-2">
        <PhFlag className="w-6 h-4" />
        <p className="text-sm font-medium text-white">
          Gawa ng Pinoy, para sa Pinoy. Mula sa puso!
        </p>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-white/60">
          © 2024 PinoyMobiles. Lahat ng karapatan ay nakalaan.
        </p>
        <div className="flex gap-6">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/60 hover:text-[#F9B434] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
