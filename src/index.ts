import { Elysia } from "elysia";
import staticPlugin from "@elysiajs/static";
import marketing from "./app/page";
import settings from "./app/dashboard/settings/page";
import login from "./app/login/page";
import parallel from "./app/parallel/page";
import intercepted from "./app/intercepted/page";

const app = new Elysia()
  .use(staticPlugin())
  .use(marketing)
  .use(parallel)
  .use(intercepted)
  .use(login)
  .use(settings)
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
