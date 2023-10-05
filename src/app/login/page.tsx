import { randomBytes } from "crypto";
import Elysia from "elysia";
import { AuthForm } from "@/modules/auth/auth-form";
import authApi from "@/routes/auth";
import { BaseLayout } from "../layout";

const hasher = new Bun.CryptoHasher("sha256");

const loginPage = new Elysia({ name: "login-page" })
  .use(authApi)
  .get("/login", async ({ setCookie, headers, token, set }) => {
    // If already logged in kick
    if (token) return (set.redirect = "/");

    /** Implements double submit cookies method for protection against CSRF */
    hasher.update(randomBytes(100));
    const csrfToken = hasher.digest("base64");
    setCookie("csrfToken", csrfToken, {
      secure: true,
      sameSite: true,
    });

    return headers["hx-request"] ? (
      <AuthForm csrfToken={csrfToken} />
    ) : (
      <BaseLayout>
        <AuthForm csrfToken={csrfToken} />
      </BaseLayout>
    );
  });

export default loginPage;
