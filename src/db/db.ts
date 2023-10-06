import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as fs from "fs";
import * as schema from "./schema"
 
const pool = new Pool({
  host: "db-postgresql-blr1-43365-do-user-4003659-0.b.db.ondigitalocean.com",
  port: 25060,
  user: "doadmin",
  password: "oy7u36bnbwsxl5q1",
  database: "drizzle-test",
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(`${__dirname}/ca.crt`).toString()
 },
});
 
export const db = drizzle(pool, { schema });

export const startMigration = async() => {
  console.log("Migration Started");
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("Migration Ended");
  process.exit(0);
}

// startMigration().catch(err => {
//   console.log(err);
//   process.exit(0);
// })