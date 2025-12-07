"use client";

import PhoneCarousel from "./PhoneCarousel";
import UpcomingPhoneCard from "./UpcomingPhoneCard";
import { upcomingPhones } from "@/lib/data/phones";

export default function UpcomingPhones() {
  return (
    <PhoneCarousel
      label="Coming soon"
      labelIcon="⏰"
      labelColor="text-blue-600"
      title="Upcoming Releases"
      viewAllHref="/phones"
      viewAllText="View All"
      mobileViewAllText="View All Upcoming Phones"
    >
      {upcomingPhones.map((phone, index) => (
        <UpcomingPhoneCard key={phone.slug} phone={phone} index={index} />
      ))}
    </PhoneCarousel>
  );
}
