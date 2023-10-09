import { dict } from "@/utils/dictionary";
import { button } from "./button";

export const BackButton = () => (
  <button
    _="on click go back"
    class={button({ intent: "ghost", size: "sm", class: "mb-2" })}
  >
    <i class="i-lucide-chevron-left" />
    {dict.get("back")}
  </button>
);
