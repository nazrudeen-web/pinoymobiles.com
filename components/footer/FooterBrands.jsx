import Link from "next/link";
import { featuredBrands } from "@/lib/data/phones";

export default function FooterBrands() {
  return (
    <div>
      <h3 className="font-semibold mb-4 text-foreground">Top Brands</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {featuredBrands.slice(0, 5).map((brand) => (
          <li key={brand}>
            <Link href="/phones" className="hover:text-foreground transition-colors">
              {brand}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
