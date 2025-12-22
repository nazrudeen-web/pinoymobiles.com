import Link from "next/link";

export default function PhonePageHeader() {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900">Mobile Phones</span>
        </nav>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Mobile Phones
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-3xl">
          Looking for the right mobile phone? Compare specs, prices, and reviews
          across stores in the UAE. Use our filters to find the perfect match
          for your needs.
        </p>
      </div>
    </div>
  );
}
