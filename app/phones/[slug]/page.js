import Link from "next/link";
import { notFound } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";
import Header from "@/components/header/Header";
import { 
  getProductBySlug, 
  getRelatedProducts,
  getProductPrices,
  getAllProducts 
} from "@/lib/supabase-queries";
import ProductDetailPage from "@/components/phones/ProductDetail/ProductDetailPage";

// Revalidate page every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function PhoneDetailsPage({ params }) {
  const resolvedParams = await params;
  const phone = await getProductBySlug(resolvedParams.slug);

  if (!phone) {
    notFound();
  }

  // Fetch related data (try 'similar' then fallback to 'alternative')
  const [relatedSimilar, relatedAlternative, prices] = await Promise.all([
    getRelatedProducts(phone.id, 'similar', 6),
    getRelatedProducts(phone.id, 'alternative', 6),
    getProductPrices(phone.id)
  ]);

  // Prefer 'similar'; if empty, use 'alternative'; else merge unique by slug
  const mergedRelated = (() => {
    const a = Array.isArray(relatedSimilar) ? relatedSimilar : [];
    const b = Array.isArray(relatedAlternative) ? relatedAlternative : [];
    if (a.length === 0 && b.length === 0) return [];
    if (a.length === 0) return b.slice(0, 6);
    if (b.length === 0) return a.slice(0, 6);
    const map = new Map();
    [...a, ...b].forEach((p) => {
      if (p && p.slug && !map.has(p.slug)) map.set(p.slug, p);
    });
    return Array.from(map.values()).slice(0, 6);
  })();

  // Add related data to phone object
  phone.relatedProducts = mergedRelated;
  phone.prices = prices;

  return (
    <>
      <ProductDetailPage phone={phone} allPhones={mergedRelated} />
    </>
  );
}
