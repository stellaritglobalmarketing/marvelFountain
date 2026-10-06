import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getAdminId } from "@/lib/auth";
import { MAX_UPLOAD_BYTES, UPLOAD_DIR, UPLOAD_TYPES } from "@/lib/uploads";

export async function POST(request: Request) {
  if (!(await getAdminId())) return Response.json({ error: "Not signed in" }, { status: 401 });

  const file = (await request.formData()).get("file");
  if (!(file instanceof File)) return Response.json({ error: "No file received" }, { status: 400 });

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!UPLOAD_TYPES[ext]) return Response.json({ error: "Use a JPG, PNG, WEBP, GIF or MP4 file" }, { status: 400 });
  if (file.size > MAX_UPLOAD_BYTES) return Response.json({ error: "File is larger than 25 MB" }, { status: 400 });

  const name = `${randomUUID()}.${ext}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return Response.json({ url: `/uploads/${name}` });
}
