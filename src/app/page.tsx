import Elysia from "elysia";
import { MarketingLayout } from "@/app/marketing-layout";
import setup from "@/config/setup";
import { Button } from "@/components/button";
import { button } from "@/components/buttonV2";
import { card } from "@/components/cardV2";

const { base, header, title, description, footer, content } = card();
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
            <Button
              hx-get="/dashboard/settings"
              hx-push-url="true"
              hx-target="body"
              hx-swap="outerHTML"
            >
              Settings
            </Button>
            <Button hx-get="/parallel" hx-swap="none">
              Get Parallel Routes
            </Button>
            <Button
              hx-get="/intercepted"
              hx-target="#sape"
              hx-swap="outerHTML"
              hx-push-url="true"
            >
              Get Intercepted Routes
            </Button>
            <div id="sape" />
            <div class="mx-auto mt-20 grid max-w-4xl grid-cols-2">
              <div id="parallel-1" />
              <div id="parallel-2" />
            </div>
            <div class="mx-auto max-w-6xl">
              <div class={base()}>
                <div class={header()}>
                  <h2 class={title()}>Activity</h2>
                  <h3 class={description()}>Add your activity</h3>
                </div>
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
            </div>
          </MarketingLayout>
        );
      }),
  );

export default marketingPage;
