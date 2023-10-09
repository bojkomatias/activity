import { tv } from "tailwind-variants";

export const details = tv({
  slots: {
    dl: "divide-y divide-border",
    item: "p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
    dt: "text-sm font-medium text-foreground",
    dd: "mt-1 flex items-center justify-between text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0",
  },
});
