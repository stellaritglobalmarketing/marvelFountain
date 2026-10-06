import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_TTL, signSession, verifySession } from "./session";

const scrypt = promisify(scryptCb) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

// Stored as "scrypt$<salt b64>$<hash b64>" (same format scripts/db-setup.mjs writes)
export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [algo, salt, hash] = stored.split("$");
  if (algo !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64");
  const actual = await scrypt(password, Buffer.from(salt, "base64"), expected.length);
  return timingSafeEqual(actual, expected);
}

export async function getAdminId() {
  return verifySession((await cookies()).get(SESSION_COOKIE)?.value);
}

/** Use at the top of every admin page and server action. */
export async function requireAdmin() {
  const id = await getAdminId();
  if (!id) redirect("/admin/login");
  return id;
}

export async function startSession(userId: number) {
  (await cookies()).set(SESSION_COOKIE, await signSession(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
