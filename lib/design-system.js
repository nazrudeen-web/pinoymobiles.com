// 🇵🇭 Premium Filipino Color Palette
export const filipinoColors = {
  // Primary Colors
  pinoyPurple: "#6C2BD9", // Royal Filipino Purple - like GCash
  pinoyPurpleDark: "#5521B0",
  pinoyPurpleLight: "#8B5CF6",
  mangoGold: "#F9B434", // Ripe Mango Gold - accents
  mangoGoldDark: "#E5A020",
  mangoGoldLight: "#FCD34D",
  bayanihanBlue: "#1F2A44", // Deep Bayanihan Blue

  // Secondary Colors
  tahoCream: "#FAF6ED", // Taho Cream - backgrounds
  banigBeige: "#EFE5D0", // Banig Beige - subtle accents
  pacificGreen: "#4CB9A8", // Pacific Green - success/verified
  pacificGreenDark: "#3B9C8D",
  arawRed: "#DC2626", // Araw Red - hot/trending
  sampaguitaWhite: "#FEFEFE",
};

// Enhanced Button Component with Filipino-inspired styling
export const buttonVariants = {
  primary:
    "bg-[#6C2BD9] hover:bg-[#5521B0] text-white shadow-lg shadow-[#6C2BD9]/30 jeepney-shine",
  secondary:
    "bg-[#FAF6ED] hover:bg-[#EFE5D0] text-[#1F2A44] border border-[#EFE5D0]",
  outline:
    "border-2 border-[#6C2BD9]/20 hover:bg-[#6C2BD9]/5 text-[#6C2BD9] hover:border-[#6C2BD9]/40",
  ghost: "hover:bg-[#FAF6ED] text-[#1F2A44]",
  success:
    "bg-[#4CB9A8] hover:bg-[#3B9C8D] text-white shadow-lg shadow-[#4CB9A8]/30",
  danger:
    "bg-[#DC2626] hover:bg-red-700 text-white shadow-lg shadow-red-600/30",
  mango:
    "bg-gradient-to-r from-[#F9B434] to-[#E5A020] hover:from-[#FCD34D] hover:to-[#F9B434] text-[#1F2A44] font-semibold shadow-lg shadow-[#F9B434]/30",
  pinoyGradient:
    "bg-gradient-to-r from-[#6C2BD9] to-[#8B5CF6] hover:from-[#5521B0] hover:to-[#6C2BD9] text-white shadow-lg shadow-[#6C2BD9]/40",
};

export const buttonSizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2.5 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-xl",
  xl: "px-8 py-4 text-base rounded-xl",
};

export const buttonTransitions = "transition-all duration-200 active:scale-95";

// Consistent form input styling with Filipino accent
export const inputStyles = `
  w-full rounded-lg border-2 border-slate-200 px-4 py-2.5 text-sm
  bg-white text-slate-900 placeholder-slate-400
  focus:border-[#6C2BD9] focus:outline-none focus:ring-2 focus:ring-[#6C2BD9]/20
  hover:border-[#6C2BD9]/30
  disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
  transition-all duration-200
`;

// Consistent card styling with Filipino hover effect
export const cardStyles = `
  bg-white rounded-xl border border-slate-200/80
  shadow-sm hover:shadow-md transition-all duration-300
  overflow-hidden pinoy-card-hover
`;

// Filipino-themed badge styles
export const badgeStyles = {
  pinoyVerified: "bg-gradient-to-r from-[#4CB9A8] to-[#3B9C8D] text-white",
  sulit: "bg-gradient-to-r from-[#F9B434] to-[#E5A020] text-[#1F2A44]",
  hotTiktok: "bg-gradient-to-r from-[#6C2BD9] to-[#DC2626] text-white",
  pinoyChoice: "bg-gradient-to-r from-[#6C2BD9] to-[#8B5CF6] text-white",
  loved: "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
  new: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
  budget: "bg-gradient-to-r from-[#4CB9A8] to-emerald-500 text-white",
};

// Consistent spacing scale
export const spacing = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  "3xl": "32px",
  "4xl": "48px",
};
