import { Geist, Geist_Mono, Mona_Sans, Inter, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const monaSans = Poppins({
  variable: "--font-mona",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "600", "800", "900"],
});

export const metadata = {
  title: "PinoyMobiles - Compare Phone Prices in the Philippines",
  description:
    "Find the best phone deals from verified sellers across the Philippines. Compare specs, prices, and get instant notifications on price drops.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${monaSans.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
