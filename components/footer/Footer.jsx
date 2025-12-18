import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterBrands from "./FooterBrands";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white border-t border-slate-700/50 relative">
      {/* Subtle banig pattern overlay */}
      <div className="absolute inset-0 footer-arabic pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        {/* Top Section */}
        <div className="grid gap-10 md:gap-12 md:grid-cols-5 mb-10 pb-10 border-b border-white/10">
          <FooterBrand />
          <FooterLinks />
          <FooterBrands />
        </div>

        {/* Bottom Section */}
        <FooterBottom />
      </div>
    </footer>
  );
}
