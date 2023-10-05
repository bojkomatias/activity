import { db } from "@/db";
import { InsertUser, SelectUser, user } from "@/db/schema/user";
import { QuerySearchParams, pageLimit } from "@/components/data-table/utils";
import { and, asc, desc, eq, getTableColumns, like, or } from "drizzle-orm";

export async function getUsersForSelector() {
  return await db.select({ id: user.id, name: user.name }).from(user);
}

/** Paginated, Search, Filtered user query  */
export async function getUsers({
  page,
  search,
  orderBy,
  sort,
}: QuerySearchParams<SelectUser>) {
  const { password, ...rest } = getTableColumns(user);

  return await db
    .select(rest)
    .from(user)
    .where(
      search
        ? or(like(user.name, `%${search}%`), like(user.email, `%${search}%`))
        : undefined,
    )
    .orderBy(
      orderBy
        ? sort === "asc"
          ? asc(user[orderBy])
          : desc(user[orderBy])
        : desc(user.createdAt),
    )
    .limit(pageLimit)
    .offset(page ? page * pageLimit : 0);
}

export async function getUserById(id: number) {
  const result = await db.select().from(user).where(eq(user.id, id));
  return result[0];
}

export async function getUserByEmail(email: string) {
  const result = await db.select().from(user).where(eq(user.email, email));
  return result[0];
}

export async function createUser(newUser: InsertUser) {
  const result = await db.insert(user).values(newUser).returning();
  return result[0];
}

export async function updateUserAttribute(
  id: number,
  attribute: keyof InsertUser,
  value: InsertUser[typeof attribute],
) {
  const result = await db
    .update(user)
    .set({ [attribute]: value })
    .where(eq(user.id, id))
    .returning({ [attribute]: user[attribute] });
  return result[0][attribute];
}

export async function userMatchCredentials(email: string, password: string) {
  // Check if credentials match
  const result = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    })
    .from(user)
    .where(and(eq(user.email, email), eq(user.password, password)));

  return result[0];
}
