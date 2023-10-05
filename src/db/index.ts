// import { Database } from "bun:sqlite";
// import { BunSQLiteDatabase, drizzle } from "drizzle-orm/bun-sqlite";

// export const sqlite = new Database("sqlite.db");
// export const db: BunSQLiteDatabase = drizzle(sqlite);

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: Bun.env.DATABASE_URL!,
  authToken: Bun.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { logger: true });
