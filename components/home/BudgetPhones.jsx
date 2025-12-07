import { phones } from "@/lib/data/phones";
import PhoneCarousel from "./PhoneCarousel";
import CarouselPhoneCard from "./CarouselPhoneCard";

export default function BudgetPhones() {
  const budget = phones.filter((p) => p.price <= 25000).slice(0, 6);

  return (
    <PhoneCarousel
      label="Best value"
      labelIcon="💰"
      labelColor="text-emerald-600"
      title="Budget Phones"
      viewAllHref="/phones"
      mobileViewAllText="View All Budget Phones"
    >
      {budget.map((phone, index) => (
        <CarouselPhoneCard
          key={phone.slug}
          phone={phone}
          index={index}
          badge="💰 Budget"
          badgeColors="bg-emerald-100 border-emerald-300 text-emerald-700"
          imageColors="from-emerald-50 to-green-50"
          hoverColor="hover:border-emerald-300 group-hover:text-emerald-600"
          priceColor="text-emerald-600"
          subtitle="Best value"
        />
      ))}
    </PhoneCarousel>
  );
}
