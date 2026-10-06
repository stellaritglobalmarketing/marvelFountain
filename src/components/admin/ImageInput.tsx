"use client";

import { useRef, useState } from "react";
import { ImagePlus, Link2, Loader2, Video, X } from "lucide-react";
import { inputClass } from "./styles";

const isVideo = (url: string) => /\.mp4($|\?)/i.test(url);

// Photo / video picker: big preview, "Choose photo" button, optional "paste a link".
// Works controlled (value/onChange) or uncontrolled (name/defaultValue).
export default function ImageInput({
  name,
  defaultValue = "",
  value,
  onChange,
  kind = "image",
  compact = false,
}: {
  name?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
  kind?: "image" | "video";
  compact?: boolean;
}) {
  const [inner, setInner] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showLink, setShowLink] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const url = value ?? inner;
  const set = (v: string) => (onChange ? onChange(v) : setInner(v));
  const word = kind === "video" ? "video" : "photo";

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      set(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed — please try again.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const box = compact ? "h-20 w-28" : "h-40 w-full max-w-[280px]";

  return (
    <div className={compact ? "flex items-center gap-3" : "space-y-3"}>
      {/* hidden field that is actually submitted with the form */}
      {name && <input type="hidden" name={name} value={url} />}

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className={`${box} group relative shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed transition ${
          url ? "border-slate-200 bg-slate-100" : "border-slate-300 bg-slate-50 hover:border-sky-400 hover:bg-sky-50"
        }`}
        aria-label={`Choose ${word}`}
      >
        {busy ? (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-sm text-slate-500">
            <Loader2 className="animate-spin" size={22} /> Uploading…
          </span>
        ) : url ? (
          isVideo(url) ? (
            <video src={url} muted className="h-full w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="h-full w-full object-cover" />
          )
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-slate-400 group-hover:text-sky-600">
            {kind === "video" ? <Video size={compact ? 20 : 28} /> : <ImagePlus size={compact ? 20 : 28} />}
            {!compact && <span className="text-sm font-medium">Click to choose a {word}</span>}
          </span>
        )}
      </button>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
        >
          {kind === "video" ? <Video size={16} /> : <ImagePlus size={16} />}
          {url ? `Change ${word}` : `Choose ${word}`}
        </button>
        {url && (
          <button
            type="button"
            onClick={() => set("")}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-red-600"
          >
            <X size={15} /> Remove
          </button>
        )}
        {!compact && (
          <button
            type="button"
            onClick={() => setShowLink((v) => !v)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <Link2 size={15} /> {showLink ? "Hide link" : "Use a link instead"}
          </button>
        )}
      </div>

      {showLink && !compact && (
        <input value={url} onChange={(e) => set(e.target.value)} placeholder="https://…" className={inputClass} />
      )}
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <input
        ref={fileRef}
        type="file"
        accept={kind === "video" ? "video/mp4" : "image/jpeg,image/png,image/webp,image/gif"}
        className="hidden"
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
      />
    </div>
  );
}
