import Elysia, { t } from "elysia";
import { MarketingLayout } from "../marketing-layout";

const interceptedPage = new Elysia({ name: "intercepted-page" }).get(
  "/intercepted",
  async () => {
    return (
      <div class="rounded-lg border border-border">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore optio
        accusamus debitis earum? Maiores reprehenderit voluptates numquam atque,
        saepe culpa doloremque perspiciatis recusandae similique! Quidem, est
        cumque. Rem, quo voluptates!
      </div>
    );
  },
  {
    afterHandle: ({ headers, set, response }) => {
      set.headers["Vary"] = "hx-request";

      if (!headers["hx-request"]) {
        return <MarketingLayout>{response}</MarketingLayout>;
      } else
        return (
          <div
            class="fixed inset-0 bg-accent/20 backdrop-blur-md"
            _="on click go back"
          >
            <div class="m-48" _="on click halt bubbling">
              {response}
            </div>
          </div>
        );
    },
    response: t.String(),
  },
);

export default interceptedPage;
