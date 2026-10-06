// Signed admin session cookie: "<userId>.<expiresAt>.<hmac>".
// Uses Web Crypto so it works both in proxy.ts and in server code.

export const SESSION_COOKIE = "mf_admin";
export const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days, in seconds

const enc = new TextEncoder();

function getKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) throw new Error("SESSION_SECRET is missing or too short (set it in .env.local)");
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

const toB64url = (buf: ArrayBuffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function fromB64url(s: string) {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

export async function signSession(userId: number) {
  const payload = `${userId}.${Math.floor(Date.now() / 1000) + SESSION_TTL}`;
  const sig = await crypto.subtle.sign("HMAC", await getKey(), enc.encode(payload));
  return `${payload}.${toB64url(sig)}`;
}

/** Returns the admin user id, or null if the token is missing, forged or expired. */
export async function verifySession(token: string | undefined): Promise<number | null> {
  const parts = token?.split(".");
  if (!parts || parts.length !== 3) return null;
  const [id, exp, sig] = parts;
  try {
    const ok = await crypto.subtle.verify("HMAC", await getKey(), fromB64url(sig), enc.encode(`${id}.${exp}`));
    if (!ok || Number(exp) < Date.now() / 1000) return null;
    return Number(id) || null;
  } catch {
    return null;
  }
}
