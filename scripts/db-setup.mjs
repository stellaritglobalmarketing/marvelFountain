// Creates the database, tables and initial content, plus the admin login.
//   npm run db:setup            first-time install (refuses if tables already exist)
//   npm run db:setup -- --reset wipes all tables and reloads the initial content
import { readFile } from "node:fs/promises";
import { randomBytes, scryptSync } from "node:crypto";
import mysql from "mysql2/promise";

const env = process.env;
const dbName = env.DB_NAME || "marvel_fountains";
const reset = process.argv.includes("--reset");

if (!/^[A-Za-z0-9_]+$/.test(dbName)) throw new Error(`Invalid DB_NAME: ${dbName}`);

const conn = await mysql.createConnection({
  host: env.DB_HOST || "127.0.0.1",
  port: Number(env.DB_PORT || 3306),
  user: env.DB_USER || "root",
  password: env.DB_PASSWORD || "",
  multipleStatements: true,
  charset: "utf8mb4",
});

try {
  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await conn.query(`USE \`${dbName}\``);

  const [existing] = await conn.query("SHOW TABLES LIKE 'products'");
  if (existing.length && !reset) {
    console.error(
      `Database "${dbName}" is already set up. Run "npm run db:setup -- --reset" to wipe it and reload the initial content.`
    );
    process.exitCode = 1;
  } else {
    const dir = new URL("../database/", import.meta.url);
    await conn.query(await readFile(new URL("schema.sql", dir), "utf8"));
    await conn.query(await readFile(new URL("seed.sql", dir), "utf8"));

    const username = env.ADMIN_USERNAME || "admin";
    const generated = !env.ADMIN_PASSWORD;
    const password = env.ADMIN_PASSWORD || randomBytes(9).toString("base64url");
    const salt = randomBytes(16);
    const hash = scryptSync(password, salt, 64);
    await conn.query("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)", [
      username,
      `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`,
    ]);

    console.log(`Database "${dbName}" created and filled with the initial content.`);
    console.log(`Admin login → username: ${username}${generated ? `  password: ${password}  (save this now)` : ""}`);
  }
} finally {
  await conn.end();
}
