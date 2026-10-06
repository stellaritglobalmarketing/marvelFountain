"use server";

import { execute } from "./db";

export type ContactState = { ok: boolean; error?: string; sent?: number };

const field = (fd: FormData, name: string, max: number) => String(fd.get(name) ?? "").trim().slice(0, max);

export async function submitContact(_prev: ContactState, fd: FormData): Promise<ContactState> {
  const name = field(fd, "name", 120);
  const phone = field(fd, "phone", 30);
  const email = field(fd, "email", 190);
  const message = field(fd, "message", 5000);

  if (!name || !phone || !email || !message) return { ok: false, error: "Please fill in all fields." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Please enter a valid email address." };

  try {
    await execute("INSERT INTO contact_messages (name, phone, email, message) VALUES (?, ?, ?, ?)", [
      name,
      phone,
      email,
      message,
    ]);
  } catch (e) {
    console.error("contact form insert failed", e);
    return { ok: false, error: "Sorry, something went wrong. Please call or email us instead." };
  }
  return { ok: true, sent: Date.now() };
}
