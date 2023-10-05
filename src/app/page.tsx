import Elysia from "elysia";
import { MarketingLayout } from "@/app/marketing-layout";
import setup from "@/routes/(setup)";

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
        return <MarketingLayout>Hi</MarketingLayout>;
      }),
  );

export default marketingPage;
