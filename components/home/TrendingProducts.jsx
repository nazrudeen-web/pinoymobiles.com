"use client";

import PhoneCarousel from "./PhoneCarousel";
import TrendingPhoneCard from "./TrendingPhoneCard";
import { phones } from "@/lib/data/phones";

const trending = phones.slice(0, 6);

export default function TrendingProducts() {
  return (
    <PhoneCarousel
      label="Trending this week"
      labelIcon="🔥"
      labelColor="text-violet-600"
      title="Most Popular Phones"
      viewAllHref="/phones"
      viewAllText="View All"
      mobileViewAllText="View All Phones"
    >
      {trending.map((phone, index) => (
        <TrendingPhoneCard key={phone.slug} phone={phone} index={index} />
      ))}
    </PhoneCarousel>
  );
}
