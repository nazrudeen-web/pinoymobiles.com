import Header from "@/components/header/Header";
import Hero from "@/components/header/Hero";
import PopularPhones from "@/components/home/PopularPhones";
import LatestPhones from "@/components/home/LatestPhones";
import UpcomingPhones from "@/components/home/UpcomingPhones";
import BudgetPhones from "@/components/home/BudgetPhones";
import BrandsSection from "@/components/home/BrandsSection";
import ComparisonPromo from "@/components/home/ComparisonPromo";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-20 font-mona">
        <Hero />
        <PopularPhones />
        <LatestPhones />
        <BudgetPhones />
        <UpcomingPhones />
        <BrandsSection />
        <ComparisonPromo />
      </main>
    </>
  );
}
