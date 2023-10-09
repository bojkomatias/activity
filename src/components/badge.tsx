import { tv } from "tailwind-variants";

export const badge = tv({
  base: "inline-flex items-center whitespace-nowrap rounded-lg border-border px-2.5 text-xs font-semibold leading-relaxed transition-colors focus:outline-none",
  variants: {
    intent: {
      primary: "bg-primary text-primary-foreground shadow hover:bg-primary/80",
      muted: "bg-muted/60 hover:bg-muted/80",
      destructive:
        "bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
    },
  },
  defaultVariants: { intent: "primary" },
});
