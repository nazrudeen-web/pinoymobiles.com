"use client";

import PhoneCarousel from "./PhoneCarousel";
import UpcomingPhoneCard from "./UpcomingPhoneCard";
import { upcomingPhones } from "@/lib/data/phones";

export default function UpcomingPhones() {
  return (
    <PhoneCarousel
      label="⏰ Abangan!"
      labelIcon=""
      labelColor="text-[#0D1B2A]"
      title="Mga Paparating na Phones"
      viewAllHref="/phones"
      viewAllText="Tingnan Lahat"
      mobileViewAllText="Tingnan Lahat ng Paparating"
    >
      {upcomingPhones.map((phone, index) => (
        <UpcomingPhoneCard key={phone.slug} phone={phone} index={index} />
      ))}
    </PhoneCarousel>
  );
}
