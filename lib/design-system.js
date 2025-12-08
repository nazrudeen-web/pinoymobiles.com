// Enhanced Button Component with consistent styling
export const buttonVariants = {
  primary:
    "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/30",
  secondary:
    "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200",
  outline:
    "border-2 border-slate-200 hover:bg-slate-50 text-slate-700 hover:border-slate-300",
  ghost: "hover:bg-slate-100 text-slate-700",
  success:
    "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30",
  danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30",
};

export const buttonSizes = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2.5 text-sm rounded-lg",
  lg: "px-6 py-3 text-base rounded-xl",
  xl: "px-8 py-4 text-base rounded-xl",
};

export const buttonTransitions = "transition-all duration-200 active:scale-95";

// Consistent form input styling
export const inputStyles = `
  w-full rounded-lg border-2 border-slate-200 px-4 py-2.5 text-sm
  bg-white text-slate-900 placeholder-slate-400
  focus:border-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600/20
  hover:border-slate-300
  disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
  transition-all duration-200
`;

// Consistent card styling
export const cardStyles = `
  bg-white rounded-xl border border-slate-200/80
  shadow-sm hover:shadow-md transition-shadow duration-300
  overflow-hidden
`;

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
