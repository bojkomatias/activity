import { Button } from "@/components/ui/button";
import { dashboardNav } from "@/config/dashboard";
import { cx } from "@/utils/cx";
import { JWTPayloadSpec } from "@elysiajs/jwt";

type User =
  | ({
      id: string;
      name: string;
      image: string | null;
      email: string;
      role: "customer" | "owner" | "admin";
    } & JWTPayloadSpec)
  | null;

export const UserNavigation = ({ user }: { user: User }) => {
  if (!user) return <></>;
  return (
    <div
      id="menu"
      class="relative inline-block text-left"
      hx-target="body"
      hx-swap="innerHTML"
    >
      <Button
        _="on click halt 
        on click send change to #dropdown end
        on keyup
         if the event's key is 'Escape'
           add .hidden to #dropdown
           trigger keyup
        end"
        class="rounded-full p-0"
      >
        {user.image ? (
          <img
            src={user.image}
            class="h-8 w-8 overflow-hidden rounded-full"
            alt="User image"
          />
        ) : (
          <i class="i-lucide-user-circle-2 h-8 w-8 overflow-hidden rounded-full opacity-80 hover:opacity-100" />
        )}
      </Button>

      <div
        id="dropdown"
        role="menu"
        class="dropdown absolute right-0 z-10 mt-1 hidden w-56 origin-top-right scale-95 divide-y divide-gray-100 rounded-md bg-white opacity-0 shadow-lg ring-1 ring-gray-200 transition duration-150 ease-in-out focus:outline-none dark:divide-gray-800 dark:bg-gray-950 dark:shadow-black dark:ring-gray-800"
        _="on change 
        if @class contains 'hidden' 
          then toggle .hidden on me wait
            then toggle .opacity-0 .scale-95 on me
        else toggle .opacity-0 .scale-95 on me settle then add .hidden to me"
      >
        <div class="px-4 py-3">
          <div class="text-sm font-semibold leading-loose">{user.name}</div>
          <span class="text-xs font-light text-gray-500">{user.email}</span>
        </div>
        <nav class="py-1">
          {dashboardNav
            .filter((link) => link.clearance?.includes(user.role))
            .map((item) => (
              <button
                hx-get={item.href}
                hx-push-url="true"
                hx-target="main"
                hx-swap="innerHTML"
                class="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-gray-400/10"
              >
                <i class={cx(item.icon, "h-4 w-4 text-gray-500")} />
                {item.name}
              </button>
            ))}
        </nav>
        <button
          hx-post="/auth/logout"
          hx-push-url="true"
          class="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold hover:bg-gray-400/10"
          tabindex="-1"
        >
          <i class="i-lucide-log-out h-4 w-4 text-gray-500" />
          Logout
        </button>
      </div>
    </div>
  );
};
