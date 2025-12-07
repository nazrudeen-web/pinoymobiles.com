import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DemoQuickLinks() {
  const links = [
    { href: "/", label: "Home", variant: "default" },
    { href: "/phones", label: "All Phones", variant: "secondary" },
    {
      href: "/phones/iphone-16-pro",
      label: "iPhone Details",
      variant: "secondary",
    },
    {
      href: "/phones/samsung-galaxy-a25",
      label: "Budget Phone",
      variant: "secondary",
    },
  ];

  return (
    <div className="mt-8 p-6 rounded-2xl border border-border/40 bg-white">
      <h3 className="font-semibold text-foreground mb-4">Quick Navigation</h3>
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Button key={link.href} asChild size="sm" variant={link.variant}>
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
