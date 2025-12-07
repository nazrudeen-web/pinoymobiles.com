import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DemoPageCard({ page }) {
  return (
    <Link
      href={page.path}
      className="group block rounded-2xl border border-border/40 bg-white p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">{page.icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {page.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {page.description}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
            View page
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
