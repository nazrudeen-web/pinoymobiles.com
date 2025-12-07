import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function MobileViewLink({
  href = "/phones",
  text = "View All",
  color = "text-primary",
}) {
  return (
    <Link
      href={href}
      className={`mt-4 flex md:hidden items-center justify-center gap-1 text-sm font-medium ${color} hover:opacity-80`}
    >
      {text}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
