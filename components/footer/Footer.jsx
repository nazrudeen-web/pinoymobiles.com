import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterBrands from "./FooterBrands";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0B] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-5 mb-8 pb-8 border-b border-white/10">
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
