import Link from "next/link";
import { notFound } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { phones } from "@/lib/data/phones";
import ProductDetailPage from "@/components/phones/ProductDetail/ProductDetailPage";

export function generateStaticParams() {
  return phones.map((phone) => ({ slug: phone.slug }));
}

export default async function PhoneDetailsPage({ params }) {
  const resolvedParams = await params;
  const phone = phones.find((item) => item.slug === resolvedParams.slug);

  if (!phone) {
    notFound();
  }

  return (
    <>
      <ProductDetailPage phone={phone} allPhones={phones} />
      <Footer />
    </>
  );
}
