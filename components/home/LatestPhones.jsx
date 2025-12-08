import { phones } from "@/lib/data/phones";
import PhoneCarousel from "./PhoneCarousel";
import CarouselPhoneCard from "./CarouselPhoneCard";

export default function LatestPhones() {
  const latest = phones.slice(0, 6);

  return (
    <PhoneCarousel
      label="🔥 Hot sa TikTok"
      labelIcon=""
      labelColor="text-[#DC2626]"
      title="Bagong Labas na Phones"
      viewAllHref="/phones"
      mobileViewAllText="Tingnan Lahat ng Bago"
    >
      {latest.map((phone, index) => (
        <CarouselPhoneCard
          key={phone.slug}
          phone={phone}
          index={index}
          badge="🔥 BAGO"
          badgeColors="bg-linear-to-r from-[#DC2626]/10 to-orange-100 border-[#DC2626]/30 text-[#DC2626]"
          imageColors="from-orange-50 to-red-50"
          hoverColor="hover:border-[#DC2626]/40 group-hover:text-[#DC2626]"
          priceColor="text-[#DC2626]"
          subtitle="Dec 2024"
        />
      ))}
    </PhoneCarousel>
  );
}
