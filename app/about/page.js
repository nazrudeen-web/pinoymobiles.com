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
  title: "About Us | UAEMobileGuide",
  description:
    "Learn about UAEMobileGuide - a trusted mobile phone comparison platform for the UAE.",
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
      "Every feature we build is designed with UAE shoppers in mind, making comparisons easy.",
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
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Helping UAE Shoppers Find the Perfect Phone
              </h1>
              <p className="mt-6 text-lg text-white/90 leading-relaxed">
                UAEMobileGuide is a mobile phone comparison platform for the
                UAE. Compare prices, specs, and reviews to find the best deals
                from trusted sellers.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
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
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  <Target className="w-4 h-4" />
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                  Making Phone Shopping Simple
                </h2>
                <p className="mt-4 text-foreground leading-relaxed">
                  We believe everyone deserves access to transparent pricing and
                  honest reviews. Our mission is to eliminate the confusion from
                  phone shopping by providing a single platform where you can
                  compare everything that matters.
                </p>
                <p className="mt-4 text-foreground leading-relaxed">
                  From budget-friendly options to flagship devices, we cover
                  phones available in the UAE market with accurate, up-to-date
                  information.
                </p>
              </div>
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Our Team</h3>
                    <p className="text-sm text-muted-foreground">
                      Mobile enthusiasts & tech experts
                    </p>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed">
                  Our team consists of passionate mobile technology experts,
                  developers, and customer experience specialists dedicated to
                  providing you with the best phone comparison experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do at UAEMobileGuide
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-card rounded-xl p-6 border border-border shadow-sm"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
                      <span>hello@uaemobileguide.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-violet-400" />
                      <span>+971 50 123 4567</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-violet-400" />
                      <span>Dubai, United Arab Emirates</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Link
                    href="mailto:hello@uaemobileguide.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors shadow-lg"
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
