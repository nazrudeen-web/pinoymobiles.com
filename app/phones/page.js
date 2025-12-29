import Header from "@/components/header/Header";
import { getAllProducts, getAllBrands } from "@/lib/supabase-queries";
import PhonesPageClient from "./PhonesPageClient";

// Revalidate page every 30 minutes
export const revalidate = 1800;

export default async function PhonesPage() {
  // Fetch all products and brands from Supabase
  const [phones, brandsData] = await Promise.all([
    getAllProducts(),
    getAllBrands(),
  ]);

  // Transform data for filters
  const brands = brandsData.map((b) => b.name);
  
  // Extract unique categories from phone badges or create default ones
  const categories = ["Flagship", "Mid-range", "Budget", "Gaming"];
  
  // Extract unique OS
  const osList = ["Android", "iOS"];

  return (
    <>
      <Header />
      <PhonesPageClient 
        phones={phones} 
        brands={brands}
        categories={categories}
        osList={osList}
      />
    </>
  );
}
