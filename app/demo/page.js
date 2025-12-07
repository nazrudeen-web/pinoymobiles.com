import Header from "@/components/header/Header";
import DemoPageCard from "@/components/demo/DemoPageCard";
import DemoInfoSection from "@/components/demo/DemoInfoSection";
import DemoQuickLinks from "@/components/demo/DemoQuickLinks";
import { demoPages } from "@/lib/data/demoPages";

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            📺 PinoyMobiles - Demo Preview
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Click any page below to preview the complete UI with demo data.
            Browse through all sections to see the design in action.
          </p>
        </div>

        {/* Pages Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {demoPages.map((page) => (
            <DemoPageCard key={page.path} page={page} />
          ))}
        </div>

        <DemoInfoSection />
        <DemoQuickLinks />
      </main>
    </>
  );
}
