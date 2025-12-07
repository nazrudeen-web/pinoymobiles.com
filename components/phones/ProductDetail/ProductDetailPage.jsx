"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import Header from "@/components/header/Header";
import TabBar from "./TabBar";
import ReviewBlock from "./ReviewBlock";
import SpecTable from "./SpecTable";
import PriceHistoryChart from "./PriceHistoryChart";
import ProductHero from "./ProductHero";
import PricesSection from "./PricesSection";
import ProductDetails from "./ProductDetails";
import CompareCarousel from "./CompareCarousel";
import SimilarCarousel from "./SimilarCarousel";
import MobileBottomBar from "./MobileBottomBar";

export default function ProductDetailPage({ phone, allPhones }) {
  const [activeSection, setActiveSection] = useState("prices");

  const pricesRef = useRef(null);
  const reviewsRef = useRef(null);
  const historyRef = useRef(null);
  const detailsRef = useRef(null);
  const specsRef = useRef(null);
  const compareRef = useRef(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = [
        { id: "prices", ref: pricesRef },
        { id: "reviews", ref: reviewsRef },
        { id: "history", ref: historyRef },
        { id: "details", ref: detailsRef },
        { id: "specs", ref: specsRef },
        { id: "compare", ref: compareRef },
      ];

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const retailers = [
    { id: 1, price: phone.price },
    { id: 2, price: phone.price * 0.98 },
    { id: 3, price: phone.price * 1.02 },
    { id: 4, price: phone.price * 1.05 },
    { id: 5, price: phone.price * 0.95 },
  ];

  const lowestPrice = Math.min(...retailers.map((r) => r.price));
  const highestPrice = Math.max(...retailers.map((r) => r.price));

  return (
    <div className="min-h-screen bg-slate-50 font-mona">
      <Header />

      <ProductHero
        phone={phone}
        lowestPrice={lowestPrice}
        highestPrice={highestPrice}
        retailersCount={retailers.length}
      />

      <TabBar activeSection={activeSection} />

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-10 pb-24 md:pb-10 space-y-8 md:space-y-12">
        <PricesSection phone={phone} pricesRef={pricesRef} />

        <section
          id="reviews"
          ref={reviewsRef}
          className="scroll-mt-32 md:scroll-mt-36"
        >
          <div className="flex items-center justify-between mb-3 md:mb-5">
            <h2 className="text-base md:text-xl font-bold text-slate-900">
              Reviews & Ratings
            </h2>
            <Link
              href="#"
              className="text-sm text-violet-600 hover:underline font-medium"
            >
              See all reviews
            </Link>
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 p-4 md:p-6">
            <ReviewBlock phone={phone} />
          </div>
        </section>

        <section
          id="history"
          ref={historyRef}
          className="scroll-mt-32 md:scroll-mt-36"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-5">
            <h2 className="text-base md:text-xl font-bold text-slate-900">
              Price History
            </h2>
            <Info className="h-4 w-4 text-slate-400" />
          </div>
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 p-4 md:p-6">
            <PriceHistoryChart phone={phone} />
          </div>
        </section>

        <ProductDetails phone={phone} detailsRef={detailsRef} />

        <section
          id="specs"
          ref={specsRef}
          className="scroll-mt-32 md:scroll-mt-36"
        >
          <h2 className="text-base md:text-xl font-bold text-slate-900 mb-3 md:mb-5">
            Specifications
          </h2>
          <SpecTable specs={phone.specs} />
        </section>

        <CompareCarousel
          currentPhone={phone}
          allPhones={allPhones}
          compareRef={compareRef}
        />
        <SimilarCarousel currentPhone={phone} allPhones={allPhones} />
      </div>

      <MobileBottomBar
        lowestPrice={lowestPrice}
        retailersCount={retailers.length}
      />
    </div>
  );
}
