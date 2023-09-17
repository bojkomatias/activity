import Elysia, { t } from "elysia";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import html from "@elysiajs/html";
import { db } from "@/db";

if (Bun.env.JWT_SECRET === undefined)
  throw "Missing secret add JWT_SECRET to .env file";

/**
 * Can re-use the setup plugin, even if duplicated (used only for typing)
 * Elysia has plugin checksum allowing to de-duplicate plugins on runtime
 * Here is the stuff reusable throughout the app, JWT, Cookie, Model, DB connection.
 */
const setup = new Elysia({ name: "setup" })
  .use(html())
  .use(cookie())
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECRET,
      schema: t.Object({
        id: t.String(),
        email: t.String(),
        image: t.Union([t.String(), t.Null()]),
        name: t.String(),
        role: t.Required(
          t.Union([
            t.Literal("customer"),
            t.Literal("owner"),
            t.Literal("admin"),
          ]),
        ),
      }),
    }),
  )
  .model({
    auth: t.Object({
      email: t.String({
        minLength: 6,
        error: "Email has to be at least 6 characters long",
      }),
      password: t.String({
        minLength: 4,
        error: "Password has to be al least 4 characters long",
      }),
      csrfToken: t.String(),
    }),
    tag: t.Object({
      name: t.String(),
    }),
  })
  // Pass DB connection
  .state("db", db)
  // Derive user verification
  .derive(async ({ jwt, cookie }) => {
    const u = await jwt.verify(cookie.auth);
    return { user: u ? u : null };
  });

export default setup;
export type Setup = typeof setup;
