import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, Search, Heart, Bell, ChevronDown, Sparkles } from "lucide-react";
import Logo from "./Logo";
import NavMenu from "./Nav-Menu";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full font-mona">
      {/* Top Promo Bar */}
      <div className="hidden md:block bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-sm text-white">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">
            Compare prices from 6,300+ trusted Philippine sellers
          </span>
          <span className="hidden lg:inline text-white/70">•</span>
          <Link
            href="/compare"
            className="hidden lg:inline-flex items-center gap-1.5 font-semibold hover:underline underline-offset-2"
          >
            Quick Compare
            <ChevronDown className="h-3 w-3 -rotate-90" />
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Left: Mobile Menu + Logo */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-10 w-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100"
                >
                  <Menu className="h-5 w-5 text-slate-700" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 overflow-y-auto p-0 border-r-0"
              >
                <div className="flex flex-col">
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
                  <div className="mt-auto border-t border-slate-100 px-5 py-4 bg-linear-to-r from-violet-50 to-purple-50">
                    <p className="text-xs text-slate-600 mb-3">
                      🔔 Get instant price-drop alerts from trusted shops
                    </p>
                    <Button
                      className="w-full rounded-xl bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-md"
                      size="lg"
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
              className="md:hidden h-10 w-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100"
            >
              <Search className="h-5 w-5 text-slate-700" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex h-10 w-10 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 relative"
            >
              <Heart className="h-5 w-5 text-slate-700" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-violet-600 text-[10px] font-bold text-white flex items-center justify-center">
                3
              </span>
            </Button>

            {/* CTA Button */}
            <Button className="hidden sm:inline-flex rounded-xl px-4 h-10 bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-sm font-semibold shadow-md shadow-violet-500/25">
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
