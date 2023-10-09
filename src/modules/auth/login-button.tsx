import { button } from "@/components/button";
import { dict } from "@/utils/dictionary";

export const LoginButton = () => (
  <button
    hx-get="/login"
    hx-target="#page-content"
    hx-swap="innerHTML"
    hx-push-url="true"
    class={button({ intent: "primary" })}
  >
    {dict.get("login")}
  </button>
);
