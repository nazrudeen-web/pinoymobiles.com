import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";

// Poppins - Modern, friendly, highly legible
const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// JetBrains Mono for code/specs
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "UAEMobileGuide - Compare Phone Prices in UAE",
  description:
    "Find the best phone deals from verified sellers across the UAE. Compare specs, prices, and get instant notifications on price drops.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
