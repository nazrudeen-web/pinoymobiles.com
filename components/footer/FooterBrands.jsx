import Link from "next/link";
import { featuredBrands } from "@/lib/data/phones";

export default function FooterBrands() {
  return (
    <div>
      <h3 className="font-semibold mb-4 text-white">Top Brands</h3>
      <ul className="space-y-2 text-sm text-white/70">
        {featuredBrands.slice(0, 5).map((brand) => (
          <li key={brand}>
            <Link href="/phones" className="hover:text-white transition-colors">
              {brand}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
