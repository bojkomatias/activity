import { button } from "@/components/button";
import { dropdown, _trigger, _content } from "@/components/dropdown";
import { Hover } from "@/components/hover-transition";
import { dict } from "@/utils/dictionary";
import { JWTPayloadSpec } from "@elysiajs/jwt";

type User = {
  id: string;
  name: string;
  image: string | null;
  email: string;
  role: "customer" | "owner" | "admin";
} & JWTPayloadSpec;

export const UserNavigation = ({ user }: { user: User }) => {
  if (!user) return <></>;
  return (
    <div class={dropdown().base({ class: "mr-4" })}>
      <button
        class={button({
          class:
            "flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-muted/50 text-lg font-semibold uppercase text-muted-foreground ring-1 ring-border hover:bg-muted hover:text-foreground hover:ring-ring hover:ring-offset-2 hover:ring-offset-background focus:ring-offset-2 focus:ring-offset-background",
        })}
        _={_trigger}
      >
        {user.image ? (
          <img src={user.image} class="h-8 w-8" alt="User image" />
        ) : (
          <span>{user.name.substring(0, 1)}</span>
        )}
      </button>

      <div class={dropdown().content()} _={_content}>
        <div class={dropdown().header()}>
          <div class="text-sm font-semibold" safe>
            {user.name}
          </div>
          <div class="text-xs font-light leading-5 text-muted-foreground" safe>
            {user.email}
          </div>
        </div>
        <div class={dropdown().separator()} />
        <Hover>
          <Hover.Item>
            <button
              class={dropdown().item()}
              hx-get="/dashboard/settings"
              hx-push-url="true"
              hx-target="body"
              hx-swap="outerHTML"
            >
              {dict.get("settings")}
              <i class="i-lucide-settings" />
            </button>
          </Hover.Item>

          <div class={dropdown().separator()} />

          <Hover.Item>
            <button
              class={dropdown().item()}
              hx-get="/"
              hx-push-url="true"
              hx-target="body"
              hx-swap="outerHTML"
            >
              Página de inicio <i class="i-lucide-external-link" />
            </button>
          </Hover.Item>
          <Hover.Item>
            <button
              class={dropdown().item({ class: "font-bold" })}
              hx-post="/api/auth/logout"
              hx-push-url="true"
              hx-target="body"
              hx-swap="outerHTML"
            >
              {dict.get("logout")}
              <i class="i-lucide-log-out" />
            </button>
          </Hover.Item>
        </Hover>

        <div class={dropdown().separator()} />

        <button
          class={button({ intent: "primary", size: "sm", class: "m-2 w-56" })}
        >
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
};
