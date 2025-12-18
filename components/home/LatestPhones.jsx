import { phones } from "@/lib/data/phones";
import PhoneCarousel from "./PhoneCarousel";
import CarouselPhoneCard from "./CarouselPhoneCard";

export default function LatestPhones() {
  const latest = phones.slice(0, 6);

  return (
    <PhoneCarousel
      label="🔥 Hot sa TikTok"
      labelIcon=""
      labelColor="text-[#CC0000]"
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
          badgeColors="bg-linear-to-r from-[#CC0000]/10 to-orange-100 border-[#CC0000]/30 text-[#CC0000]"
          imageColors="from-orange-50 to-red-50"
          hoverColor="hover:border-[#CC0000]/40 group-hover:text-[#CC0000]"
          priceColor="text-[#CC0000]"
          subtitle="Dec 2024"
        />
      ))}
    </PhoneCarousel>
  );
}
