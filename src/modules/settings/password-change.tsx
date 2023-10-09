import { button } from "@/components/button";
import { card } from "@/components/card";
import { Input } from "@/components/input";
import { dict } from "@/utils/dictionary";

export const PasswordChange = () => (
  <div class={card().base()}>
    <h2 class={card().title()}>{"Cambiar " + dict.get("password")}</h2>
    <p class={card().description()}>
      Los cambios se verán reflejados la proxima vez que ingreses
    </p>

    <form
      hx-patch="/api/settings/password"
      hx-target="#notification"
      hx-target-403="#notification"
      hx-swap="none"
    >
      <div class={card().content()}>
        <Input
          name="currentPassword"
          placeholder="********"
          type="password"
          required="true"
          rt
        />
        <Input
          name="password"
          placeholder="**********"
          type="password"
          required="true"
          rb
        />
      </div>
      <div class={card().footer({ class: "justify-end bg-destructive/20" })}>
        <button class={button({ intent: "destructive", size: "sm" })}>
          {dict.get("update")} {dict.get("password")}
        </button>
      </div>
    </form>
  </div>
);
