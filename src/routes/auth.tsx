import setup from "@/routes/(setup)";
import OAuth2 from "@/utils/oauth2";
import Elysia from "elysia";
import { Notification } from "@/components/notification";
import {
  createUser,
  getUserByEmail,
  userMatchCredentials,
} from "@/services/user";
import { UserNavigation } from "@/modules/auth/user-nav";
import { LoginButton } from "@/modules/auth/login-button";

const authApi = new Elysia({ name: "auth", prefix: "/api/auth" })
  .use(setup)
  .post(
    "/login",
    async ({ jwt, cookie, setCookie, body, set }) => {
      // Catch CSRF attack
      if (cookie.csrfToken !== body.csrfToken) return (set.status = 403);

      const user = await userMatchCredentials(body.email, body.password);

      // Handle incorrect username or password
      if (!user) {
        set.status = 404;
        return (
          <Notification
            title={"Error"}
            description={"Incorrect username or password"}
            isError
          />
        );
      }

      setCookie(
        "auth",
        await jwt.sign({
          id: String(user.id),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }),
        {
          httpOnly: true,
        },
      );

      set.redirect = "/";
    },
    { body: "auth" },
  )
  .get("/callback/google", async ({ query, setCookie, jwt, set }) => {
    const oauth_user = await OAuth2(query["code"] as string);

    // Check if user exists in DB
    let user = await getUserByEmail(oauth_user.email);

    // If not create it
    if (!user) {
      user = await createUser({ ...oauth_user, image: oauth_user.picture });
    }
    // Set cookie
    setCookie(
      "auth",
      await jwt.sign({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      }),
      {
        httpOnly: true,
      },
    );

    set.redirect = "/";
  })
  .get("/status", ({ token, set }) => {
    if (token) return (set.redirect = "/auth/navigation");
    return <LoginButton />;
  })
  .get("/navigation", ({ token }) => <UserNavigation user={token} />, {
    beforeHandle: ({ token, set }) => {
      if (!token) {
        set.status = 401;
        return "Unauthorized";
      }
    },
  })
  .post("/logout", ({ setCookie, set }) => {
    // Remove cookie not working
    setCookie("auth", "");
    set.redirect = "/";
  });

export default authApi;
