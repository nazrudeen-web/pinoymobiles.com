import { phones } from "@/lib/data/phones";
import { PhoneMainImage, PhoneThumbnails } from "./PhoneImageGallery";
import PhoneInfoSection from "./PhoneInfoSection";

export default function PhoneHeroSection({ phone }) {
  const phoneIndex = phones.findIndex((p) => p.slug === phone.slug);

  return (
    <section className="mt-6">
      <div className="grid gap-6 lg:grid-cols-[1fr,1.5fr] items-start">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <PhoneMainImage phoneIndex={phoneIndex} phoneName={phone.name} />
          <PhoneThumbnails phoneIndex={phoneIndex} phoneName={phone.name} />
        </div>

        {/* Right: Phone Info */}
        <div>
          <PhoneInfoSection phone={phone} />
        </div>
      </div>
    </section>
  );
}
