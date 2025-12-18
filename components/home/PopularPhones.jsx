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
      label="💖 UAE Favorites"
      labelIcon=""
      labelColor="text-[#00843D]"
      title="Most Loved in UAE"
      viewAllHref="/phones"
      viewAllText="View All"
      mobileViewAllText="View All Favorites"
    >
      {popular.map((phone, index) => (
        <CarouselPhoneCard
          key={phone.slug}
          phone={phone}
          index={index}
          badge="💖 Favorite"
          badgeColors="bg-[#00843D]/10 border-[#00843D]/30 text-[#00843D]"
          imageColors="from-[#00843D]/5 to-[#EF3340]/5"
          hoverColor="hover:border-[#00843D]/40 group-hover:text-[#00843D]"
          priceColor="text-[#00843D]"
          subtitle="Top Choice"
          showTrustedBadge={true}
        />
      ))}
    </PhoneCarousel>
  );
}
