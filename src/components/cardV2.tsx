import { tv } from "tailwind-variants";

export const card = tv({
  slots: {
    base: "rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden",
    header: "flex flex-col p-6",
    title: "font-semibold leading-loose tracking-tight",
    description: "text-sm leading-5 text-muted-foreground",
    content: "p-6 pt-0",
    footer: "flex items-center p-6",
  },
});
