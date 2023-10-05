import { dashboardNav } from "@/config/dashboard";
import { Role } from "@/db/schema/user";
import { dict } from "@/utils/dictionary";
import { BaseLayout } from "../layout";
import { Hover } from "../../components/hover-transition";
import { Button } from "../../components/button";
import { UserNavigation } from "@/modules/auth/user-nav";
import { JWTPayloadSpec } from "@elysiajs/jwt";

type User = {
  id: string;
  name: string;
  image: string | null;
  email: string;
  role: "customer" | "owner" | "admin";
} & JWTPayloadSpec;

export const DashboardLayout = ({
  token,
  children,
}: {
  token: User;
  children?: any;
}) => (
  <BaseLayout>
    <header class="flex flex-col items-end border-b border-border pt-2">
      <UserNavigation user={token} />
      <Tabs role={token.role} />
    </header>

    <main id="dashboard-content" class="min-h-screen pb-8">
      {children}
    </main>
  </BaseLayout>
);

const Tabs = ({ role }: { role: Role }) => (
  <nav class="w-full self-start overflow-x-auto rounded-lg px-1 lg:px-8">
    <Hover class="flex gap-x-1 rounded-lg text-muted-foreground">
      {dashboardNav
        .filter((link) => link.clearance?.includes(role))
        .map((item) => (
          <Hover.Item class="relative mb-1.5 hover:text-accent-foreground">
            <Button
              hx-get={item.href}
              hx-push-url="true"
              hx-target="#dashboard-content"
              hx-swap="innerHTML"
              size="sm"
              _="init if window.location.pathname contains @hx-get then add .navigation-indicator end
              on htmx:afterOnLoad tell the target take .navigation-indicator"
            >
              <i class={item.icon} aria-hidden="true" />
              {dict.get(item.name)}
            </Button>
          </Hover.Item>
        ))}
    </Hover>
  </nav>
);
