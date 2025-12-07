import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

export default function SimilarPhones({ similarPhones, brand }) {
  if (similarPhones.length === 0) return null;

  return (
    <section className="mt-8">
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Related {brand} Phones
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">You might also like</p>
          </div>
          <Button
            asChild
            variant="ghost"
            className="gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Link href="/phones">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 p-6">
          {similarPhones.map((similar, index) => (
            <SimilarPhoneCard
              key={similar.slug}
              phone={similar}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SimilarPhoneCard({ phone, index }) {
  return (
    <Link
      href={`/phones/${phone.slug}`}
      className="group relative rounded-2xl bg-white border border-slate-200/60 p-4 hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-36 rounded-xl bg-slate-50 flex items-center justify-center mb-4 overflow-hidden">
        <Image
          src={`/mobile${(index % 5) + 1}.jpg`}
          alt={phone.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="200px"
        />
      </div>

      {/* Content */}
      <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
        {phone.name}
      </h3>

      <div className="mt-2 flex items-center gap-2">
        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-slate-700">
            {phone.rating}
          </span>
        </div>
      </div>

      <p className="mt-2 text-lg font-bold text-slate-900">
        {formatCurrency(phone.price)}
      </p>
    </Link>
  );
}
