import Link from "next/link";
import Header from "@/components/header/Header";
import { howToSteps, features } from "@/lib/data/howToUseData";
import { HowToStep } from "@/components/how-to-use/HowToStep";
import { FeatureGrid } from "@/components/how-to-use/FeatureGrid";

export const metadata = {
  title: "How to Use | UAEMobileGuide",
  description:
    "Learn how to use UAEMobileGuide to find and compare the best phone deals in the UAE.",
};

export default function HowToUsePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="bg-background border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground">How to Use</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How to Use UAEMobileGuide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              Your complete guide to finding, comparing, and buying the perfect
              phone at the best price.
            </p>
          </div>
        </div>

        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="space-y-6">
              {howToSteps.map((step) => (
                <HowToStep key={step.step} step={step} />
              ))}
            </div>
          </div>
        </section>

        <FeatureGrid features={features} />

        <section className="py-12 md:py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Perfect Phone?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Start exploring thousands of phones, compare prices from trusted
              sellers, and find the best deals.
            </p>
            <Link
              href="/phones"
              className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
            >
              Browse Phones
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
