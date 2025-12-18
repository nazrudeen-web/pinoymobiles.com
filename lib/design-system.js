// �🇪 Premium UAE Color Palette
export const uaeColors = {
  // Primary Colors - Dubai Blue
  // ...existing code...

  // Tertiary - Arabian Teal
  arabianTeal: "#008B8B", // Coastal Teal - success/verified
  arabianTealLight: "#00A8A8",
  arabianTealDark: "#006B6B",

  // Neutral Dark
  emiratiNavy: "#0D1B2A", // Deep Navy - dark text
  emiratiNavyLight: "#1B2838",

  // Backgrounds
  pearlWhite: "#FAFBFC", // Pearl White - backgrounds
  sandBeige: "#F5F0E8", // Sand Beige - subtle accents

  // Alert Colors
  burjRed: "#CC0000", // Burj Red - hot/trending

  // Pure
  pureWhite: "#FFFFFF",
};

// Enhanced Button Component with UAE flag-inspired styling
export const buttonVariants = {
  primary:
    "bg-[#00843D] hover:bg-[#006B31] text-white shadow-lg shadow-[#00843D]/30 uae-shine",
  secondary:
    "bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#1A1A1A] border border-[#E5E7EB]",
  outline:
    "border-2 border-[#00843D]/20 hover:bg-[#00843D]/5 text-[#00843D] hover:border-[#00843D]/40",
  ghost: "hover:bg-[#F5F5F5] text-[#1A1A1A]",
  success:
    "bg-[#10B981] hover:bg-[#059669] text-white shadow-lg shadow-[#10B981]/30",
  danger:
    "bg-[#EF3340] hover:bg-[#C41E2A] text-white shadow-lg shadow-[#EF3340]/30",
  accent:
    "bg-gradient-to-r from-[#EF3340] to-[#C41E2A] hover:from-[#FF4D5A] hover:to-[#EF3340] text-white font-semibold shadow-lg shadow-[#EF3340]/30",
  uaeGradient:
    "bg-gradient-to-r from-[#00843D] to-[#00A550] hover:from-[#006B31] hover:to-[#00843D] text-white shadow-lg shadow-[#00843D]/40",
};

export const buttonSizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2.5 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-xl",
  xl: "px-8 py-4 text-base rounded-xl",
};

export const buttonTransitions = "transition-all duration-200 active:scale-95";

// Consistent form input styling with UAE accent
export const inputStyles = `
  w-full rounded-lg border-2 border-slate-200 px-4 py-2.5 text-sm
  bg-white text-slate-900 placeholder-slate-400
  focus:border-[#00843D] focus:outline-none focus:ring-2 focus:ring-[#00843D]/20
  hover:border-[#00843D]/30
  disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
  transition-all duration-200
`;

// Consistent card styling with UAE hover effect
export const cardStyles = `
  bg-white rounded-xl border border-slate-200/80
  shadow-sm hover:shadow-md transition-all duration-300
  overflow-hidden uae-card-hover
`;

// UAE-themed badge styles
export const badgeStyles = {
  uaeVerified: "bg-gradient-to-r from-[#00843D] to-[#006B31] text-white",
  bestDeal: "bg-gradient-to-r from-[#EF3340] to-[#C41E2A] text-white",
  hotTrending: "bg-gradient-to-r from-[#EF3340] to-[#FF4D5A] text-white",
  uaeChoice: "bg-gradient-to-r from-[#00843D] to-[#00A550] text-white",
  loved: "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
  new: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
  budget: "bg-gradient-to-r from-[#10B981] to-emerald-500 text-white",
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
