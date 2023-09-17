import { randomBytes } from "crypto";
import { user } from "@/db/schema/user";
import { and, eq } from "drizzle-orm";
import { Setup } from "../setup";
import { SignInForm } from "./components/form";
import { UserNavigation } from "./components/user-navigation";
import { Notification } from "@/components/ui/notification";
import OAuth2 from "@/utils/oauth2";

if (Bun.env.GOOGLE_CLIENT_ID === undefined)
  throw "Missing secret add CLIENT_ID to .env file";

if (Bun.env.GOOGLE_CLIENT_SECRET === undefined)
  throw "Missing secret add CLIENT_SECRET to .env file";

const hasher = new Bun.CryptoHasher("sha256");

const auth = (app: Setup) =>
  app.group("/auth", (app) =>
    app

      /** Get auth form */
      .get("/form", async ({ setCookie }) => {
        /** Implements double submit cookies method for protection against CSRF */
        hasher.update(randomBytes(100));
        const csrfToken = hasher.digest("base64");
        setCookie("csrfToken", csrfToken, {
          secure: true,
          sameSite: true,
        });

        return <SignInForm csrfToken={csrfToken} />;
      })
      .post(
        "/login",
        async ({ jwt, cookie, setCookie, body, set, store: { db } }) => {
          // Catch CSRF attack
          if (cookie.csrfToken !== body.csrfToken) return (set.status = 403);

          // Check if credentials match
          const [result] = await db
            .select({
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
            })
            .from(user)
            .where(
              and(eq(user.email, body.email), eq(user.password, body.password)),
            )
            .limit(1);

          // Handle incorrect username or password
          if (!result) {
            set.status = 404;
            return (
              <Notification
                title={"Error"}
                description={"Incorrect username or password"}
                icon="i-lucide-x-circle text-red-500"
              />
            );
          }

          setCookie(
            "auth",
            await jwt.sign({
              id: String(result.id),
              name: result.name,
              email: result.email,
              image: result.image,
              role: result.role,
            }),
            {
              httpOnly: true,
              maxAge: 7 * 86400,
            },
          );

          set.redirect = "/";
        },
        { body: "auth" },
      )
      .get(
        "/callback/google",
        async ({ query, setCookie, jwt, set, store: { db } }) => {
          const oauth_user = await OAuth2(query["code"] as string);

          console.log(oauth_user);
          // Check if user exists in DB
          let r = await db
            .select()
            .from(user)
            .where(eq(user.email, oauth_user.email));

          // If not create it
          if (r.length === 0) {
            r = await db
              .insert(user)
              .values({ ...oauth_user, image: oauth_user.picture })
              .returning();
          }
          // Set cookie
          setCookie(
            "auth",
            await jwt.sign({
              id: r[0].id.toString(),
              name: r[0].name,
              email: r[0].email,
              image: r[0].image,
              role: r[0].role,
            }),
            {
              httpOnly: true,
              maxAge: 7 * 86400,
            },
          );

          set.redirect = "/";
        },
      )
      .get("/navigation", ({ user }) => <UserNavigation user={user} />, {
        beforeHandle: ({ user, set }) => {
          if (!user) {
            set.status = 401;
            return "Unauthorized";
          }
        },
      })
      .post("/logout", ({ setCookie, set }) => {
        // Remove cookie not working
        setCookie("auth", "");
        return (set.redirect = "/");
      }),
  );

export default auth;
