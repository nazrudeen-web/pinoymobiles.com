import Link from "next/link";
import Header from "@/components/header/Header";
import {
  Users,
  Target,
  Shield,
  Zap,
  Heart,
  Award,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export const metadata = {
  title: "About Us | PinoyMobiles",
  description:
    "Learn about PinoyMobiles - the Philippines' trusted mobile phone comparison platform.",
};

const stats = [
  { label: "Phones Listed", value: "2,500+" },
  { label: "Trusted Sellers", value: "6,300+" },
  { label: "Daily Users", value: "50K+" },
  { label: "Price Comparisons", value: "1M+" },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description:
      "We only partner with verified sellers to ensure you get authentic products at fair prices.",
  },
  {
    icon: Zap,
    title: "Speed & Accuracy",
    description:
      "Our prices are updated in real-time so you never miss a deal or overpay for your phone.",
  },
  {
    icon: Heart,
    title: "User-First Approach",
    description:
      "Every feature we build is designed with Filipino consumers in mind, making comparisons easy.",
  },
  {
    icon: Award,
    title: "Expert Reviews",
    description:
      "Our team of mobile experts provides unbiased reviews to help you make informed decisions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Helping Filipinos Find the Perfect Phone
              </h1>
              <p className="mt-6 text-lg text-white/90 leading-relaxed">
                PinoyMobiles is the Philippines' leading mobile phone comparison
                platform. We help millions of Filipinos compare prices, specs,
                and reviews to find the best deals from trusted sellers
                nationwide.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-violet-600">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium mb-4">
                  <Target className="w-4 h-4" />
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold text-slate-900">
                  Making Phone Shopping Simple
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  We believe every Filipino deserves access to transparent
                  pricing and honest reviews. Our mission is to eliminate the
                  confusion from phone shopping by providing a single platform
                  where you can compare everything that matters.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  From budget-friendly options to flagship devices, we cover
                  every phone available in the Philippine market with accurate,
                  up-to-date information.
                </p>
              </div>
              <div className="bg-slate-100 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-violet-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Our Team</h3>
                    <p className="text-sm text-slate-600">
                      Mobile enthusiasts & tech experts
                    </p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Our team consists of passionate mobile technology experts,
                  developers, and customer experience specialists dedicated to
                  providing you with the best phone comparison experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Our Values</h2>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                These core values guide everything we do at PinoyMobiles
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-white rounded-xl p-6 border border-slate-200"
                  >
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-violet-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                  <p className="text-slate-300 mb-6">
                    Have questions or feedback? We'd love to hear from you.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-violet-400" />
                      <span>hello@pinoymobiles.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-violet-400" />
                      <span>+63 2 8888 9999</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-violet-400" />
                      <span>Makati City, Philippines</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    href="mailto:hello@pinoymobiles.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Send us a Message
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
