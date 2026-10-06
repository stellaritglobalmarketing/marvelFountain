import path from "node:path";

// Admin uploads live outside /public (Next only serves files that existed in /public at build time)
export const UPLOAD_DIR = path.join(process.cwd(), "uploads");
export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

export const UPLOAD_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  mp4: "video/mp4",
};

export const UPLOAD_NAME_RE = /^[0-9a-f-]{36}\.(jpg|jpeg|png|webp|gif|mp4)$/;
