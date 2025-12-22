import { Check } from "lucide-react";

export default function ProductDetails({ phone, detailsRef }) {
  return (
    <section
      id="details"
      ref={detailsRef}
      className="scroll-mt-32 md:scroll-mt-36"
    >
      <h2 className="text-base md:text-xl font-bold text-slate-900 mb-3 md:mb-5">
        Product Details
      </h2>
      <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 p-4 md:p-6">
        <div className="prose prose-sm max-w-none text-slate-600">
          <p className="text-sm leading-relaxed">
            The {phone.name} is a powerful smartphone that combines cutting-edge
            technology with elegant design. Featuring{" "}
            {phone.specs?.display || "a stunning display"}, this device delivers
            an immersive visual experience perfect for gaming, streaming, and
            everyday use.
          </p>
          <p className="text-sm leading-relaxed mt-3">
            Powered by {phone.specs?.processor || "a powerful processor"} and
            equipped with {phone.specs?.ram || "8GB"}
            of RAM, the {phone.name} ensures smooth performance even with the
            most demanding applications. With {phone.specs?.storage || "256GB"}{" "}
            of storage, you'll have plenty of space for all your apps, photos,
            and files.
          </p>
          <p className="text-sm leading-relaxed mt-3">
            The camera system features{" "}
            {phone.specs?.mainCamera || "advanced optics"} that captures
            stunning photos and videos in any lighting condition. The{" "}
            {phone.specs?.battery || "5000mAh"} battery keeps you powered
            throughout the day, and with fast charging support, you'll be back
            to 100% in no time.
          </p>
        </div>
        {phone.highlights && phone.highlights.length > 0 && (
          <div className="mt-5 pt-5 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Key Highlights
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {phone.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
