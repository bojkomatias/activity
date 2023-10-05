import Settings from "@/modules/settings";
import Elysia from "elysia";
import { DashboardLayout } from "../layout";
import { getUserById } from "@/services/user";
import settingsApi from "@/routes/dashboard/settings";

const settingsPage = new Elysia({
  name: "settings-page",
})
  .use(settingsApi)
  .get("/dashboard/settings", async ({ token, headers, set }) => {
    const user = await getUserById(parseInt(token!.id));

    // See if headers vary answer with cache or not ...
    set.headers["Vary"] = "hx-target";
    return headers["hx-target"] ? (
      <Settings user={user} />
    ) : (
      <DashboardLayout role={token!.role}>
        <Settings user={user} />
      </DashboardLayout>
    );
  });

export default settingsPage;
