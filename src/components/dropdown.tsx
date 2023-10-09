import { button } from "./button";
import { tv } from "tailwind-variants";

export const dropdown = tv({
  slots: {
    base: "relative inline-block text-left",
    header: "px-3 py-2",
    content:
      "dropdown absolute z-10 w-64 -translate-y-1 scale-95 rounded-xl bg-card p-2 opacity-0 shadow ring-1 ring-border",
    separator: "my-1 h-0 border-t border-border",
    item: [
      button(),
      "h-11 w-full justify-between font-normal text-muted-foreground",
    ],
  },
  variants: {
    position: {
      "top-left": { content: "left-0 mt-2 origin-top-left" },
      "top-right": { content: "right-0 mt-2 origin-top-right" },
      "right-top": { content: "right-full top-0 mr-1 origin-top-right" },
    },
  },
  defaultVariants: { position: "top-right" },
});

export const _trigger =
  "on click halt bubbling end on click send toggle to next .dropdown end";

export const _content =
  "on click halt bubbling end on toggle if @class contains 'dropdown-visible' send close to me else send open to me end on open take .dropdown-visible wait then remove .opacity-0 .scale-95 .-translate-y-1 end on close wait then add .opacity-0 .scale-95 .-translate-y-1 wait 0.05s then remove .dropdown-visible end";
