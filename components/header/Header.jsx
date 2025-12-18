import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, Search, Heart, Bell, ChevronDown, Sparkles } from "lucide-react";
import Logo from "./Logo";
import NavMenu from "./Nav-Menu";
import SearchBar from "./SearchBar";
import UAEFlag from "@/components/ui/UAEFlag";
import {
  buttonVariants,
  buttonSizes,
  buttonTransitions,
} from "@/lib/design-system";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full font-mona bg-white shadow-md">
      {/* Top Promo Bar - UAE themed */}
      <div className="hidden md:block bg-linear-to-r from-[#00843D] via-[#006B31] to-[#00843D]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-sm text-white">
          <UAEFlag className="w-5 h-4" />
          <span className="font-medium">
            Compare prices from{" "}
            <span className="text-[#EF3340] font-bold">
              6,300+ Verified UAE Sellers
            </span>
          </span>
          <span className="hidden lg:inline text-white/70 mx-2">•</span>
          <Link
            href="/compare"
            className="hidden lg:inline-flex items-center gap-1.5 font-semibold text-[#EF3340] hover:text-[#FF4D5A] underline-offset-2 transition-colors"
          >
            Compare Now
            <ChevronDown className="h-3 w-3 -rotate-90" />
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-slate-200/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Left: Mobile Menu + Logo */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-10 w-10 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 overflow-y-auto p-0 border-r-0 bg-white"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="border-b border-slate-100 px-5 py-4 bg-slate-50">
                    <Logo />
                  </div>

                  {/* Mobile Search */}
                  <div className="px-5 py-4 border-b border-slate-100">
                    <SearchBar />
                  </div>

                  {/* Mobile Navigation */}
                  <div className="px-5 py-4">
                    <NavMenu vertical />
                  </div>

                  {/* Mobile CTA */}
                  <div className="mt-auto border-t border-slate-100 px-5 py-4 bg-linear-to-r from-[#00843D]/5 to-[#EF3340]/5">
                    <p className="text-xs text-slate-600 mb-3 font-medium">
                      🔔 Subscribe to price-drop alerts
                    </p>
                    <Button
                      className="w-full rounded-lg bg-linear-to-r from-[#00843D] to-[#006B31] hover:from-[#006B31] hover:to-[#00843D] text-white font-semibold shadow-lg shadow-[#00843D]/30 px-4 py-2.5 transition-all active:scale-95"
                      size="md"
                    >
                      <Bell className="mr-2 h-4 w-4" /> Enable Alerts
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Logo />
          </div>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center">
            <NavMenu />
          </nav>

          {/* Right: Search + Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop Search */}
            <div className="hidden md:block w-56 lg:w-72">
              <SearchBar />
            </div>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex h-10 w-10 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 relative transition-colors"
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#00843D] text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                3
              </span>
            </Button>

            {/* CTA Button - Filipino Enhanced */}
            <Button className="hidden sm:inline-flex rounded-lg px-4 h-10 bg-linear-to-r from-[#00843D] to-[#006B31] hover:from-[#006B31] hover:to-[#00843D] text-sm font-semibold text-white shadow-lg shadow-[#00843D]/30 transition-all active:scale-95 uae-shine">
              <Bell className="mr-2 h-4 w-4" />
              <span className="hidden lg:inline">Price Alerts</span>
              <span className="lg:hidden">Alerts</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
