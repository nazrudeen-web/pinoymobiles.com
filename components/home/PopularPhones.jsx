"use client";

import PhoneCarousel from "./PhoneCarousel";
import CarouselPhoneCard from "./CarouselPhoneCard";
import { phones } from "@/lib/data/phones";

export default function PopularPhones() {
  const popular = phones
    .filter((p) => ["Flagship", "Mid-Range"].includes(p.category))
    .slice(0, 6);

  return (
    <PhoneCarousel
      label="💖 Pinoy Favorites"
      labelIcon=""
      labelColor="text-[#6C2BD9]"
      title="Most Loved sa Pilipinas"
      viewAllHref="/phones"
      viewAllText="Tingnan Lahat"
      mobileViewAllText="Tingnan Lahat ng Paborito"
    >
      {popular.map((phone, index) => (
        <CarouselPhoneCard
          key={phone.slug}
          phone={phone}
          index={index}
          badge="💖 Paborito"
          badgeColors="bg-[#6C2BD9]/10 border-[#6C2BD9]/30 text-[#6C2BD9]"
          imageColors="from-[#6C2BD9]/5 to-[#F9B434]/5"
          hoverColor="hover:border-[#6C2BD9]/40 group-hover:text-[#6C2BD9]"
          priceColor="text-[#6C2BD9]"
          subtitle="Pinoy Choice"
          showTrustedBadge={true}
        />
      ))}
    </PhoneCarousel>
  );
}
