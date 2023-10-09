import { tv } from "tailwind-variants";

export const button = tv(
  {
    base: "text-card-foreground group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors first-letter:capitalize focus-visible:outline focus-visible:outline-offset-1 focus-visible:outline-border disabled:pointer-events-none disabled:opacity-50 active:opacity-80",
    variants: {
      intent: {
        primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
        secondary:
          "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
        accent: "bg-accent hover:bg-accent/90 text-accent-foreground",
        outline:
          "bg-transparent ring-1 ring-inset ring-border hover:bg-muted/50 hover:ring-ring/30",
        ghost: "bg-transparent hover:bg-muted/50",
        link: "!p-0 font-medium decoration-2 underline-offset-2 hover:underline-offset-4 underline hover:decoration-accent",
        destructive:
          "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
      },
      size: {
        xs: "px-2 h-6 text-xs",
        sm: "px-2.5 h-8 text-xs",
        base: "px-4 h-9 text-sm",
        lg: "px-5 h-11 text-base rounded-lg",
        icon: "h-9 w-9 p-0",
        "icon-xs": "h-6 w-6 p-0",
      },
    },
    defaultVariants: { intent: "ghost", size: "base" },
  },
  {
    responsiveVariants: ["sm", "md", "lg"],
  },
);
