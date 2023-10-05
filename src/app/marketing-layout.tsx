import { siteConfig } from "@/config/site";
import { BaseLayout } from "@/app/layout";

export function MarketingLayout({ children }: { children: any }) {
  return (
    <BaseLayout>
      <header class="flex h-12 items-center justify-between pt-2">
        <a
          href="/"
          class="ml-3 font-black hover:text-accent-foreground sm:ml-6"
          tabindex="-1"
        >
          {siteConfig.name}
        </a>
        <div hx-get="/auth/status" hx-trigger="load" hx-swap="outerHTML" />
      </header>
      <main class="min-h-screen pb-8">{children}</main>
    </BaseLayout>
  );
}
