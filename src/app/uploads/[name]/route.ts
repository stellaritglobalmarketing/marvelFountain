import { readFile } from "node:fs/promises";
import path from "node:path";
import { UPLOAD_DIR, UPLOAD_NAME_RE, UPLOAD_TYPES } from "@/lib/uploads";

export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  // Strict name check — only files the upload route created, no path tricks
  if (!UPLOAD_NAME_RE.test(name)) return new Response("Not found", { status: 404 });

  try {
    const data = await readFile(path.join(UPLOAD_DIR, name));
    return new Response(data, {
      headers: {
        "Content-Type": UPLOAD_TYPES[name.split(".").pop()!],
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
