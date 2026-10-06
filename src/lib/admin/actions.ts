"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { execute, pool, query } from "@/lib/db";
import { endSession, hashPassword, requireAdmin, startSession, verifyPassword } from "@/lib/auth";
import { getOptions } from "./data";
import { getResource, settingFields } from "./resources";

export type FormState = { error?: string; ok?: boolean };

// Every public page is cached; after any change, throw the whole cache away so
// visitors see the new content on their next request.
const refreshSite = () => revalidatePath("/", "layout");

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function youtubeId(input: string) {
  const m = input.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : input;
}

export async function saveRecord(key: string, id: number | null, _prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const res = getResource(key);
  if (!res) return { error: "Unknown section." };

  const values: Record<string, string | number | null> = {};
  for (const f of res.fields) {
    const raw = String(fd.get(f.name) ?? "").trim();
    if (f.type === "checkbox") {
      values[f.name] = fd.get(f.name) === "on" ? 1 : 0;
      continue;
    }
    if (!raw) {
      if (f.required) return { error: `Please fill in “${f.label}”.` };
      values[f.name] = f.nullable ? null : f.type === "number" ? 0 : "";
      continue;
    }
    if (f.type === "number") {
      const n = Number(raw);
      if (!Number.isInteger(n) || n < -32768 || n > 4294967295) return { error: `“${f.label}” should be a number only (no commas or symbols).` };
      if (f.name === "price" && n < 0) return { error: "Price cannot be negative." };
      values[f.name] = n;
    } else if (f.type === "select") {
      const allowed = await getOptions(f);
      if (!allowed.some((o) => o.value === raw)) return { error: `Please choose “${f.label}”.` };
      values[f.name] = f.optionsFrom ? Number(raw) : raw;
    } else {
      values[f.name] = raw.slice(0, f.type === "textarea" ? 10000 : 500);
    }
  }

  // Per-table clean-up
  if ("slug" in values) {
    const slug = slugify(String(values.slug || values.name || ""));
    if (!SLUG_RE.test(slug)) return { error: "The web address can only use small letters, numbers and dashes." };
    values.slug = slug;
  }
  if (key === "videos") values.youtube_id = youtubeId(String(values.youtube_id));
  if (key === "hero-slides") {
    if (!values.video && !values.image) return { error: "Please add a photo or a video for the slide." };
    if (!values.href) values.href = "/products";
  }

  // Child lists (product images / specs) arrive as JSON from the list editor
  const childRows: Record<string, Record<string, string>[]> = {};
  for (const child of res.children ?? []) {
    let rows: unknown;
    try {
      rows = JSON.parse(String(fd.get(`child:${child.name}`) ?? "[]"));
    } catch {
      return { error: `Could not read ${child.label.toLowerCase()}.` };
    }
    if (!Array.isArray(rows)) return { error: `Could not read ${child.label.toLowerCase()}.` };
    childRows[child.name] = rows
      .map((r) => Object.fromEntries(child.columns.map((c) => [c.name, String(r?.[c.name] ?? "").trim().slice(0, 500)])))
      .filter((r) => child.columns.some((c) => r[c.name]));
  }

  const cols = Object.keys(values);
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    let recordId = id;
    if (recordId) {
      await conn.query(`UPDATE ${res.table} SET ${cols.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`, [
        ...cols.map((c) => values[c]),
        recordId,
      ]);
    } else {
      // New items go to the end of their list
      const [[{ next }]] = (await conn.query(`SELECT COALESCE(MAX(sort_order), 0) + 1 AS next FROM ${res.table}`)) as unknown as [
        { next: number }[],
      ];
      const insertCols = [...cols, "sort_order"];
      const [result] = await conn.query(
        `INSERT INTO ${res.table} (${insertCols.join(", ")}) VALUES (${insertCols.map(() => "?").join(", ")})`,
        [...cols.map((c) => values[c]), next]
      );
      recordId = (result as { insertId: number }).insertId;
    }
    for (const child of res.children ?? []) {
      await conn.query(`DELETE FROM ${child.table} WHERE ${child.fk} = ?`, [recordId]);
      const rows = childRows[child.name];
      if (rows.length) {
        const names = child.columns.map((c) => c.name);
        await conn.query(`INSERT INTO ${child.table} (${child.fk}, ${names.join(", ")}, sort_order) VALUES ?`, [
          rows.map((r, i) => [recordId, ...names.map((n) => r[n]), i + 1]),
        ]);
      }
    }
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    if ((e as { code?: string }).code === "ER_DUP_ENTRY") {
      return {
        error:
          key === "videos"
            ? "This video is already added."
            : `Another ${res.singular.toLowerCase()} already has this name or web address. Please change it a little.`,
      };
    }
    console.error("admin save failed", e);
    return { error: "Sorry, it could not be saved. Please try again." };
  } finally {
    conn.release();
  }

  refreshSite();
  redirect(`/admin/${key}?saved=1`);
}

export async function moveRecord(key: string, id: number, dir: -1 | 1) {
  await requireAdmin();
  const res = getResource(key);
  if (!res) return;
  const group = res.groupBy?.column;
  let where = "";
  const params: unknown[] = [];
  if (group) {
    const [row] = await query<Record<string, unknown>>(`SELECT ${group} AS g FROM ${res.table} WHERE id = ?`, [id]);
    if (!row) return;
    where = `WHERE ${group} = ?`;
    params.push(row.g);
  }
  const ids = (await query<{ id: number }>(`SELECT id FROM ${res.table} ${where} ORDER BY sort_order, id`, params)).map((r) => r.id);
  const i = ids.indexOf(id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  // Renumber the whole list so the order is always clean (1, 2, 3 …)
  await execute(
    `UPDATE ${res.table} SET sort_order = CASE id ${ids.map(() => "WHEN ? THEN ?").join(" ")} END WHERE id IN (?)`,
    [...ids.flatMap((rid, n) => [rid, n + 1]), ids]
  );
  refreshSite();
  revalidatePath(`/admin/${key}`);
}

export async function deleteRecord(key: string, id: number) {
  await requireAdmin();
  const res = getResource(key);
  if (!res) return;
  await execute(`DELETE FROM ${res.table} WHERE id = ?`, [id]);
  refreshSite();
  redirect(`/admin/${key}?deleted=1`);
}

export async function saveSettings(_prev: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const rows = settingFields.map((s) => [s.k, String(fd.get(s.k) ?? "").trim().slice(0, 2000)]);
  await execute("INSERT INTO settings (k, v) VALUES ? ON DUPLICATE KEY UPDATE v = VALUES(v)", [rows]);
  refreshSite();
  return { ok: true };
}

export async function setMessageRead(id: number, read: boolean) {
  await requireAdmin();
  await execute("UPDATE contact_messages SET is_read = ? WHERE id = ?", [read ? 1 : 0, id]);
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(id: number) {
  await requireAdmin();
  await execute("DELETE FROM contact_messages WHERE id = ?", [id]);
  redirect("/admin/messages?deleted=1");
}

export async function changePassword(_prev: FormState, fd: FormData): Promise<FormState> {
  const userId = await requireAdmin();
  const current = String(fd.get("current") ?? "");
  const next = String(fd.get("next") ?? "");
  if (next.length < 8) return { error: "The new password must be at least 8 characters." };
  if (next !== String(fd.get("confirm") ?? "")) return { error: "The new passwords do not match." };
  const [user] = await query<{ password_hash: string }>("SELECT password_hash FROM admin_users WHERE id = ?", [userId]);
  if (!user || !(await verifyPassword(current, user.password_hash))) return { error: "Your current password is wrong." };
  await execute("UPDATE admin_users SET password_hash = ? WHERE id = ?", [await hashPassword(next), userId]);
  return { ok: true };
}

// Simple in-memory brute-force guard: 5 failed logins per IP per 15 minutes.
const failures = new Map<string, { count: number; until: number }>();

export async function login(_prev: FormState, fd: FormData): Promise<FormState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const now = Date.now();
  const f = failures.get(ip);
  if (f && f.until > now && f.count >= 5) return { error: "Too many attempts. Try again in 15 minutes." };

  const username = String(fd.get("username") ?? "").trim();
  const password = String(fd.get("password") ?? "");
  const [user] = await query<{ id: number; password_hash: string }>(
    "SELECT id, password_hash FROM admin_users WHERE username = ?",
    [username]
  );
  if (!user || !(await verifyPassword(password, user.password_hash))) {
    const entry = f && f.until > now ? f : { count: 0, until: now + 15 * 60 * 1000 };
    entry.count++;
    failures.set(ip, entry);
    return { error: "Wrong username or password." };
  }
  failures.delete(ip);
  await startSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}
