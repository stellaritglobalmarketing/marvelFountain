// Prints an INSERT for the admin login, for hosts where you import the database through
// phpMyAdmin instead of running "npm run db:setup".
//   npm run admin:sql
// Paste the printed line into phpMyAdmin → SQL, after importing schema.sql and seed.sql.
import { createInterface } from "node:readline";
import { randomBytes, scryptSync } from "node:crypto";

// read answers line by line (rl.question drops already-buffered lines when input is piped)
const lines = createInterface({ input: process.stdin })[Symbol.asyncIterator]();
const ask = async (prompt) => {
  process.stdout.write(prompt);
  return (await lines.next()).value ?? "";
};
const username = (await ask("Admin username [admin]: ")).trim() || "admin";
const password = await ask("Admin password (min 8 characters): ");
process.stdin.pause();

if (password.length < 8) {
  console.error("Password must be at least 8 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
const stored = `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;
const sqlString = (s) => `'${s.replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;

console.log("\nRun this in phpMyAdmin → SQL:\n");
console.log(`INSERT INTO admin_users (username, password_hash) VALUES (${sqlString(username)}, ${sqlString(stored)});\n`);
