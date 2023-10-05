import Elysia, { t } from "elysia";
import { DashboardLayout } from "../layout";
import { getUserById } from "@/services/user";
import settingsApi from "@/routes/dashboard/settings";
import { DashboardHeading } from "@/components/dashboard/heading";
import { DashboardContent } from "@/components/dashboard/wrapper";
import { PasswordChange } from "@/modules/settings/password-change";
import { dict } from "@/utils/dictionary";
import Profile from "@/modules/settings/profile";
import { Role } from "@/db/schema/user";
import { cx } from "@/utils/cx";

const settingsPage = new Elysia({
  name: "settings-page",
})
  .use(settingsApi)
  .get(
    "/dashboard/settings",
    async ({ token }) => {
      const user = {
        id: 1,
        email: "asd@as.com",
        name: "Matias",
        createdAt: 123,
        role: "admin" as Role,
        password: null,
        image: null,
      };
      return (
        <>
          <DashboardHeading title={dict.get("settings")} />
          <DashboardContent>
            <Profile user={user} />

            <div
              class={cx(
                "mt-20",
                user.password
                  ? ""
                  : "pointer-events-none select-none opacity-75 saturate-0",
              )}
            >
              <PasswordChange />
            </div>
          </DashboardContent>
        </>
      );
    },
    {
      afterHandle: ({ headers, set, response, token }) => {
        set.headers["Vary"] = "hx-target";

        if (!headers["hx-target"] || headers["hx-target"] === "page-content") {
          return (
            <DashboardLayout
              token={{
                email: "bojko.matias@gmail.com",
                id: "1",
                image: null,
                name: "Matus",
                role: "admin",
              }}
            >
              {response}
            </DashboardLayout>
          );
        }
      },
      response: t.String(),
    },
  );

export default settingsPage;
