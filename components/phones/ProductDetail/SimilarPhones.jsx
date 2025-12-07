"use client";

import PhoneCarousel from "@/components/home/PhoneCarousel";
import CarouselPhoneCard from "@/components/home/CarouselPhoneCard";

export default function SimilarPhones({ currentPhone, allPhones }) {
  const similar = allPhones
    .filter((p) =>
      currentPhone.brand
        ? p.brand === currentPhone.brand && p.slug !== currentPhone.slug
        : p.category === currentPhone.category && p.slug !== currentPhone.slug
    )
    .slice(0, 8);

  if (!similar.length) return null;

  return (
    <section className="mt-12">
      <PhoneCarousel
        label="Similar"
        labelIcon="📱"
        labelColor="text-violet-600"
        title="Similar Phones Filipino Buyers Compare"
        viewAllHref={`/phones?brand=${currentPhone.brand}`}
        viewAllText="View All from this Brand"
        mobileViewAllText="More similar phones"
      >
        {similar.map((phone, index) => (
          <CarouselPhoneCard
            key={phone.slug}
            phone={phone}
            index={index}
            badge="🔍 Similar"
            badgeColors="bg-violet-100 border-violet-300 text-violet-700"
            imageColors="from-violet-50 to-blue-50"
            hoverColor="hover:border-violet-300 group-hover:text-violet-600"
            priceColor="text-violet-600"
            subtitle="Often compared"
          />
        ))}
      </PhoneCarousel>
    </section>
  );
}
