import Elysia from "elysia";
import { MarketingLayout } from "@/app/marketing-layout";
import setup from "@/config/setup";
import { button } from "@/components/button";
import { card } from "@/components/card";

const { base, title, description, footer, content } = card();
const marketingPage = new Elysia({
  name: "marketing-page",
})
  .use(setup)
  .guard(
    {
      beforeHandle: ({ set }) => {
        /** Uncomment the following if this plugins starts pushing-urls */
        set.headers["Vary"] = "hx-request";
        set.headers["Cache-Control"] =
          "public, max-age=900, must-revalidate, stale-while-revalidate=120";
      },
    },
    (app) =>
      app.get("/", async () => {
        return (
          <MarketingLayout>
            <button
              hx-get="/dashboard/settings"
              hx-push-url="true"
              hx-target="body"
              hx-swap="outerHTML"
            >
              Settings
            </button>

            <button
              hx-get="/intercepted"
              hx-target="#sape"
              hx-swap="outerHTML"
              hx-push-url="true"
            >
              Get Intercepted Routes
            </button>
            <div id="sape" />

            <div class="mx-auto max-w-6xl">
              <div class={base()}>
                <h2 class={title()}>Activity</h2>
                <h3 class={description()}>Add your activity</h3>
                <div class={content()}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis quo quibusdam suscipit voluptatum earum totam rerum
                  modi expedita omnis laborum accusamus ipsum placeat
                  consectetur doloremque perspiciatis molestias consequuntur,
                  voluptas porro?
                </div>
                <div class={footer()}>
                  <button class={button()}>Sape</button>
                </div>
              </div>
              <div class="space-x-4">
                <button class={button({ intent: "outline", size: "sm" })}>
                  Click me
                </button>
                <button class={button({ intent: "primary" })}>Click me</button>
                <button class={button({ intent: "secondary", size: "xs" })}>
                  Click me
                </button>
                <button class={button({ intent: "destructive" })}>
                  Click me
                </button>
                <button class={button({ intent: "accent" })}>Click me</button>
              </div>
            </div>
          </MarketingLayout>
        );
      }),
  );

export default marketingPage;
