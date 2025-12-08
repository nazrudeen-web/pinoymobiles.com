import {
  Search,
  GitCompare,
  Bell,
  Star,
  ShoppingCart,
  Smartphone,
  Filter,
  Heart,
  TrendingUp,
} from "lucide-react";

export const howToSteps = [
  {
    step: 1,
    icon: Search,
    title: "Search for Phones",
    description:
      "Use our search bar to find any phone model. You can search by brand name, model number, or specific features like '5G phones' or 'gaming phones'.",
    tips: [
      "Try searching for specific models like 'iPhone 16 Pro'",
      "Search by feature: 'best camera phone'",
      "Filter by price range to match your budget",
    ],
  },
  {
    step: 2,
    icon: Filter,
    title: "Filter & Compare",
    description:
      "Use our powerful filters to narrow down your choices. Compare specs, prices, and reviews side by side to find the perfect phone for your needs.",
    tips: [
      "Filter by brand, price, RAM, storage, and more",
      "Compare up to 4 phones simultaneously",
      "Check the 'Show only differences' option for quick comparison",
    ],
  },
  {
    step: 3,
    icon: Star,
    title: "Read Reviews",
    description:
      "Check out expert reviews and user ratings before making your decision. Our reviews cover real-world performance, camera quality, battery life, and more.",
    tips: [
      "Look for pros and cons in each review",
      "Check user ratings from verified buyers",
      "Read our detailed camera and performance tests",
    ],
  },
  {
    step: 4,
    icon: Bell,
    title: "Set Price Alerts",
    description:
      "Found the phone you want but waiting for a better price? Set up price alerts and we'll notify you when the price drops at any of our partner stores.",
    tips: [
      "Set your target price for notifications",
      "Get alerts via email or push notification",
      "Never miss a flash sale or special promo",
    ],
  },
  {
    step: 5,
    icon: ShoppingCart,
    title: "Buy from Trusted Sellers",
    description:
      "Once you've made your choice, buy from our verified partner stores. We only work with trusted sellers to ensure you get authentic products.",
    tips: [
      "All sellers are verified for authenticity",
      "Compare prices across 6,300+ stores",
      "Check seller ratings and reviews",
    ],
  },
];

export const features = [
  {
    icon: GitCompare,
    title: "Side-by-Side Comparison",
    description: "Compare up to 4 phones with detailed spec breakdowns",
  },
  {
    icon: TrendingUp,
    title: "Price History",
    description: "See price trends over time to know when to buy",
  },
  {
    icon: Heart,
    title: "Wishlist",
    description: "Save phones you're interested in for later",
  },
  {
    icon: Smartphone,
    title: "Phone Reviews",
    description: "In-depth reviews from our expert team",
  },
  {
    icon: Bell,
    title: "Price Alerts",
    description: "Get notified when prices drop on your favorite phones",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find phones by specs, price, or features",
  },
];
