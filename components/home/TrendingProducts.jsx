"use client";

import PhoneCarousel from "./PhoneCarousel";
import TrendingPhoneCard from "./TrendingPhoneCard";
import { phones } from "@/lib/data/phones";

const trending = phones.slice(0, 6);

export default function TrendingProducts() {
  return (
    <PhoneCarousel
      label="🔥 Trending Ngayon"
      labelIcon=""
      labelColor="text-[#6C2BD9]"
      title="Mga Sikat na Phones"
      viewAllHref="/phones"
      viewAllText="Tingnan Lahat"
      mobileViewAllText="Tingnan Lahat ng Phones"
    >
      {trending.map((phone, index) => (
        <TrendingPhoneCard key={phone.slug} phone={phone} index={index} />
      ))}
    </PhoneCarousel>
  );
}
