import Link from "next/link";
import Header from "@/components/header/Header";
import {
  Search,
  GitCompare,
  Bell,
  Star,
  ShoppingCart,
  ChevronRight,
  Smartphone,
  Filter,
  Heart,
  TrendingUp,
} from "lucide-react";

export const metadata = {
  title: "How to Use | PinoyMobiles",
  description:
    "Learn how to use PinoyMobiles to find and compare the best phone deals in the Philippines.",
};

const steps = [
  {
    step: 1,
    icon: Search,
    title: "Search for Phones",
    description:
      "Use our search bar to find any phone model. You can search by brand name, model number, or specific features like '5G phones' or 'gaming phones'.",
    tips: [
      "Try searching for specific models like 'iPhone 16 Pro'",
      "Search by feature: 'best camera phone'",
      "Filter by price range to match your budget",
    ],
  },
  {
    step: 2,
    icon: Filter,
    title: "Filter & Compare",
    description:
      "Use our powerful filters to narrow down your choices. Compare specs, prices, and reviews side by side to find the perfect phone for your needs.",
    tips: [
      "Filter by brand, price, RAM, storage, and more",
      "Compare up to 4 phones simultaneously",
      "Check the 'Show only differences' option for quick comparison",
    ],
  },
  {
    step: 3,
    icon: Star,
    title: "Read Reviews",
    description:
      "Check out expert reviews and user ratings before making your decision. Our reviews cover real-world performance, camera quality, battery life, and more.",
    tips: [
      "Look for pros and cons in each review",
      "Check user ratings from verified buyers",
      "Read our detailed camera and performance tests",
    ],
  },
  {
    step: 4,
    icon: Bell,
    title: "Set Price Alerts",
    description:
      "Found the phone you want but waiting for a better price? Set up price alerts and we'll notify you when the price drops at any of our partner stores.",
    tips: [
      "Set your target price for notifications",
      "Get alerts via email or push notification",
      "Never miss a flash sale or special promo",
    ],
  },
  {
    step: 5,
    icon: ShoppingCart,
    title: "Buy from Trusted Sellers",
    description:
      "Once you've made your choice, buy from our verified partner stores. We only work with trusted sellers to ensure you get authentic products.",
    tips: [
      "All sellers are verified for authenticity",
      "Compare prices across 6,300+ stores",
      "Check seller ratings and reviews",
    ],
  },
];

const features = [
  {
    icon: GitCompare,
    title: "Side-by-Side Comparison",
    description: "Compare up to 4 phones with detailed spec breakdowns",
  },
  {
    icon: TrendingUp,
    title: "Price History",
    description: "See price trends over time to know when to buy",
  },
  {
    icon: Heart,
    title: "Wishlist",
    description: "Save phones you're interested in for later",
  },
  {
    icon: Smartphone,
    title: "2,500+ Phones",
    description: "Comprehensive database of all phones in the Philippines",
  },
];

export default function HowToUsePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-slate-900 to-slate-800 text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                How to Use PinoyMobiles
              </h1>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                Finding the perfect phone at the best price is easy with
                PinoyMobiles. Follow our simple guide to start comparing and
                saving on your next mobile phone purchase.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="space-y-12">
              {steps.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 1;
                return (
                  <div
                    key={item.step}
                    className={`grid md:grid-cols-2 gap-8 items-center ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={isEven ? "md:order-2" : ""}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                          {item.step}
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">
                          {item.title}
                        </h2>
                      </div>
                      <p className="text-slate-600 leading-relaxed mb-6">
                        {item.description}
                      </p>
                      <div className="space-y-3">
                        {item.tips.map((tip, tipIndex) => (
                          <div
                            key={tipIndex}
                            className="flex items-start gap-3"
                          >
                            <ChevronRight className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-600">
                              {tip}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`bg-slate-100 rounded-2xl p-8 flex items-center justify-center min-h-[250px] ${
                        isEven ? "md:order-1" : ""
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <p className="text-slate-500 font-medium">
                          Step {item.step}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">
                Powerful Features
              </h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                Everything you need to make smart phone buying decisions
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="bg-white rounded-xl p-6 border border-slate-200 text-center"
                  >
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-violet-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="bg-linear-to-r from-violet-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Find Your Perfect Phone?
              </h2>
              <p className="text-violet-100 mb-8 max-w-2xl mx-auto">
                Start comparing prices and specs from thousands of phones
                available in the Philippines.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/phones"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <Smartphone className="w-5 h-5" />
                  Browse Phones
                </Link>
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-violet-700 text-white font-semibold rounded-xl hover:bg-violet-800 transition-colors"
                >
                  <GitCompare className="w-5 h-5" />
                  Compare Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
