import { Elysia } from "elysia";

import setup from "./handlers/setup";
import auth from "./handlers/auth";
import dashboard from "./handlers/dashboard";

import { Notification } from "./components/ui/notification";
import { Layout } from "./components/layout";
import { LandingPage } from "./components/landing-page";

const app = new Elysia()
  // type Setup passed to the rest of modules for inference
  .use(setup)
  .onError(({ code, error }) => {
    console.log(error.message);
    if (code === "VALIDATION")
      return (
        <Notification
          title={error.name}
          description={error.all.map((e) => e.schema.error).join("<br/>")}
          icon="i-lucide-x-circle text-red-500"
        />
      );
  });
// Handler modules
app
  .get("/", ({ user }) => (
    <Layout isAuth={!!user}>
      <LandingPage />
    </Layout>
  ))
  .use(auth)
  .use(dashboard)

  .get("/styles.css", () => Bun.file("./src/output.css"))
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
