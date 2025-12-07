import { featuredBrands } from "@/lib/data/phones";

export default function BrandSpotlight() {
  return (
    <section id="brands" className="mx-auto mt-16 w-full max-w-6xl px-6">
      <div className="rounded-3xl bg-linear-to-r from-purple-100 via-orange-100 to-yellow-100 p-8 md:p-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
            Shop by brand
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-purple-900">
            Trusted sellers carrying global and local favorites
          </h2>
          <p className="mt-3 text-sm text-purple-800/80">
            Whether you love iOS or Android, PinoyMobiles helps you compare
            offers across the brands Pinoys rely on every day.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 md:grid-cols-6">
          {featuredBrands.map((brand) => (
            <div
              key={brand}
              className="flex h-20 items-center justify-center rounded-2xl border border-white/60 bg-white/80 text-base font-semibold text-purple-900 shadow-sm backdrop-blur"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
