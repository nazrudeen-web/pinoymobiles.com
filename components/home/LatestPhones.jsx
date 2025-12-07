import { phones } from "@/lib/data/phones";
import PhoneCarousel from "./PhoneCarousel";
import CarouselPhoneCard from "./CarouselPhoneCard";

export default function LatestPhones() {
  const latest = phones.slice(0, 6);

  return (
    <PhoneCarousel
      label="Hot & New"
      labelIcon="🔥"
      labelColor="text-orange-600"
      title="Latest Releases"
      viewAllHref="/phones"
      mobileViewAllText="View All Latest Phones"
    >
      {latest.map((phone, index) => (
        <CarouselPhoneCard
          key={phone.slug}
          phone={phone}
          index={index}
          badge="🔥 NEW"
          badgeColors="bg-orange-100 border-orange-300 text-orange-700"
          imageColors="from-orange-50 to-red-50"
          hoverColor="hover:border-orange-300 group-hover:text-orange-600"
          priceColor="text-orange-600"
          subtitle="Dec 2024"
        />
      ))}
    </PhoneCarousel>
  );
}
