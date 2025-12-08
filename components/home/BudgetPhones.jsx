import { phones } from "@/lib/data/phones";
import PhoneCarousel from "./PhoneCarousel";
import CarouselPhoneCard from "./CarouselPhoneCard";

export default function BudgetPhones() {
  const budget = phones.filter((p) => p.price <= 25000).slice(0, 6);

  return (
    <PhoneCarousel
      label="💰 Sulit Picks"
      labelIcon=""
      labelColor="text-[#4CB9A8]"
      title="Sulit Phones Under ₱10K"
      viewAllHref="/phones"
      mobileViewAllText="Tingnan Lahat ng Sulit Phones"
    >
      {budget.map((phone, index) => (
        <CarouselPhoneCard
          key={phone.slug}
          phone={phone}
          index={index}
          badge="💰 SULIT"
          badgeColors="bg-[#4CB9A8]/10 border-[#4CB9A8]/30 text-[#4CB9A8]"
          imageColors="from-[#4CB9A8]/5 to-emerald-50"
          hoverColor="hover:border-[#4CB9A8]/40 group-hover:text-[#4CB9A8]"
          priceColor="text-[#4CB9A8]"
          subtitle="Best value"
          showSulitBadge={true}
        />
      ))}
    </PhoneCarousel>
  );
}
