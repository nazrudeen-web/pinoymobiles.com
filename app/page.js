import Header from "@/components/header/Header";
import Hero from "@/components/header/Hero";
import PopularPhones from "@/components/home/PopularPhones";
import LatestPhones from "@/components/home/LatestPhones";
import UpcomingPhones from "@/components/home/UpcomingPhones";
import BudgetPhones from "@/components/home/BudgetPhones";
import BrandsSection from "@/components/home/BrandsSection";
import ComparisonPromo from "@/components/home/ComparisonPromo";
import {
  getLatestProducts,
  getPopularProducts,
  getUpcomingProducts,
  getBudgetPhones as fetchBudgetPhones,
  getAllBrands,
} from "@/lib/supabase-queries";

// Revalidate page every hour
export const revalidate = 3600;

export default async function Home() {
  // Fetch all data in parallel for better performance
  const [popularPhones, budgetPhones, latestPhones, upcomingPhones, brands] =
    await Promise.all([
      getPopularProducts(10),
      fetchBudgetPhones(20000, 8),
      getLatestProducts(12),
      getUpcomingProducts(6),
      getAllBrands(),
    ]);

  return (
    <>
      <Header />
      <main className="pb-20 font-mona">
        <Hero />
        <PopularPhones phones={popularPhones} />
        <BudgetPhones phones={budgetPhones} />
        <LatestPhones phones={latestPhones} />
        <UpcomingPhones phones={upcomingPhones} />
        <BrandsSection brands={brands} />
        <ComparisonPromo />
      </main>
    </>
  );
}
