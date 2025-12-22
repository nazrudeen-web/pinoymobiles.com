// This file is DEPRECATED for colors.
// Colors are now defined in app/globals.css using Tailwind v4 CSS variables.
// Use standard Tailwind utility classes (e.g., bg-primary, text-accent) instead of these objects.

// Modern Button Variants using semantic colors
export const buttonVariants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  success:
    "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20",
  danger:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/30",
  accent:
    "bg-accent text-accent-foreground font-semibold shadow-lg shadow-accent/20",
};

export const buttonSizes = {
  sm: "px-3 py-1.5 text-sm rounded-sm",
  md: "px-4 py-2.5 text-sm rounded-md",
  lg: "px-6 py-3 text-base rounded-lg",
  xl: "px-8 py-4 text-base rounded-xl",
};

export const buttonTransitions = "transition-colors duration-200 active:scale-95";

// Consistent form input styling
export const inputStyles = `
  w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm
  placeholder:text-muted-foreground
  focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring
  disabled:cursor-not-allowed disabled:opacity-50
`;

// Consistent card styling
export const cardStyles = `
  bg-card text-card-foreground rounded-xl border border-border
  shadow-sm hover:shadow-md transition-shadow duration-300
`;

// Themed badge styles
export const badgeStyles = {
  uaeVerified: "bg-primary text-primary-foreground",
  bestDeal: "bg-destructive text-destructive-foreground",
  hotTrending: "bg-accent text-accent-foreground",
  uaeChoice: "bg-secondary text-secondary-foreground",
  loved: "bg-pink-500 text-white",
  new: "bg-orange-500 text-white",
  budget: "bg-accent text-accent-foreground",
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