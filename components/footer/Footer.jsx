import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterBrands from "./FooterBrands";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-slate-950 to-[#0A0A0B] text-white border-t border-slate-800/50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
        {/* Top Section */}
        <div className="grid gap-10 md:gap-12 md:grid-cols-5 mb-10 pb-10 border-b border-slate-800/30">
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
