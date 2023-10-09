import { tv } from "tailwind-variants";

export const card = tv({
  slots: {
    base: "rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden",
    title: " pt-5 px-6 font-semibold leading-loose tracking-tight",
    description: " px-6 text-sm leading-5 text-muted-foreground/70",
    content: "p-6",
    footer: "flex items-center p-6",
  },
});
