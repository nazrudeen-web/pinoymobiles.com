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
      label="Loved"
      labelIcon="💖"
      labelColor="text-pink-600"
      title="Popular Mobiles Filipino Buyers Love"
      viewAllHref="/phones"
      viewAllText="View All"
      mobileViewAllText="View All Popular Phones"
    >
      {popular.map((phone, index) => (
        <CarouselPhoneCard
          key={phone.slug}
          phone={phone}
          index={index}
          badge="💖 Loved"
          badgeColors="bg-pink-100 border-pink-300 text-pink-700"
          imageColors="from-pink-50 to-rose-50"
          hoverColor="hover:border-pink-300 group-hover:text-pink-600"
          priceColor="text-pink-600"
          subtitle="Popular choice"
        />
      ))}
    </PhoneCarousel>
  );
}
