import { eq } from "drizzle-orm";
import { ProfilePage } from "./profile/page";
import { DashboardLayout } from "./layout";
import { user } from "@/db/schema/user";
import { Setup } from "../setup";
import { AttributeEdit, UserAttribute } from "./profile/attribute-edit";
import { t } from "elysia";
import { withLayout } from "@/components/layout";

const dashboard = (app: Setup) =>
  app.group(
    "/dashboard",
    {
      beforeHandle: async ({ user, set }) => {
        if (!user) {
          set.status = 401;
          return (set.redirect = "/");
        }
      },
    },
    (app) =>
      app
        .get("/", async ({ user: u, store: { db }, headers }) => {
          const r = await db
            .select()
            .from(user)
            .where(eq(user.id, Number(u?.id)));
          return withLayout(
            headers["hx-request"] === "true",
            <DashboardLayout role={r[0].role} current="/dashboard">
              <ProfilePage user={r[0]} />
            </DashboardLayout>,
          );
        })
        .get("/:id/:attr", ({ params: { id, attr }, query }) => (
          <AttributeEdit
            id={id}
            attribute={attr}
            value={query.value as string}
          />
        ))
        .patch("/:id", async ({ params: { id }, store: { db }, body }) => {
          const [attr, val] = Object.entries(
            body as { [key: string]: string },
          ).flat();
          const r = await db
            .update(user)
            .set({ [attr]: val })
            .where(eq(user.id, Number(id)))
            // @ts-ignore I know that I'm passing a safe key like 'name'
            .returning({ [attr]: user[attr] });

          return <UserAttribute id={id} attribute={attr} value={r[0][attr]} />;
        })
        .patch(
          "/password",
          async ({ user: u, store: { db }, body, set }) => {
            const r = await db
              .select({ currentPassword: user.password })
              .from(user)
              .where(eq(user.id, Number(u?.id)));

            if (r[0].currentPassword !== body.currentPassword) {
              set.status = 403;
              return (
                <p class="text-sm text-red-600">
                  * Current password doesn't match the existing one
                </p>
              );
            }
            await db
              .update(user)
              .set({ password: body.password })
              .where(eq(user.id, Number(u?.id)));

            return <p class="text-sm text-cyan-600">Successfully updated</p>;
          },
          {
            body: t.Object({
              currentPassword: t.String(),
              password: t.String(),
            }),
          },
        )
        .get("/posts", ({ user, headers }) =>
          withLayout(
            headers["hx-request"] === "true",
            <DashboardLayout role={user!.role} current="/dashboard/posts">
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                cum modi expedita. Quae explicabo ut voluptas minus asperiores
                deleniti ea placeat cum perferendis hic fugit ratione vel
                doloribus, dignissimos molestiae.
              </div>
            </DashboardLayout>,
          ),
        )
        .get("/security", ({ user, headers }) =>
          withLayout(
            headers["hx-request"] === "true",
            <DashboardLayout role={user!.role} current="/dashboard/security">
              <div>
                If you are on this page, means you have super secret admin
                powers
              </div>
            </DashboardLayout>,
          ),
        ),
  );
export default dashboard;
