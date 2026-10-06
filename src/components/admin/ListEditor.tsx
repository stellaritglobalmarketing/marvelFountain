"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { ChildList } from "@/lib/admin/resources";
import ImageInput from "./ImageInput";
import { cardClass, helpClass, inputClass, secondaryButton } from "./styles";

type Row = Record<string, string>;

// Editable, reorderable rows (product photos, specifications). Sent to the server as JSON.
export default function ListEditor({ list, initial }: { list: ChildList; initial: Row[] }) {
  const [rows, setRows] = useState<Row[]>(initial);
  const blank = () => Object.fromEntries(list.columns.map((c) => [c.name, ""]));

  const update = (i: number, col: string, v: string) =>
    setRows((rs) => rs.map((r, j) => (j === i ? { ...r, [col]: v } : r)));
  const move = (i: number, dir: -1 | 1) =>
    setRows((rs) => {
      const j = i + dir;
      if (j < 0 || j >= rs.length) return rs;
      const copy = [...rs];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

  const iconButton =
    "cursor-pointer rounded-lg border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <section className={`${cardClass} p-5 sm:p-6`}>
      <h2 className="text-lg font-semibold text-slate-900">{list.label}</h2>
      {list.help && <p className={`${helpClass} mb-4`}>{list.help}</p>}
      <input type="hidden" name={`child:${list.name}`} value={JSON.stringify(rows)} />

      {rows.length === 0 && <p className="mb-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">Nothing added yet.</p>}

      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-500 ring-1 ring-slate-200">
              {i + 1}
            </span>
            <div className={`grid min-w-[200px] flex-1 gap-2 ${list.columns.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {list.columns.map((c) =>
                c.type === "image" ? (
                  <ImageInput key={c.name} compact value={row[c.name] ?? ""} onChange={(v) => update(i, c.name, v)} />
                ) : (
                  <input
                    key={c.name}
                    value={row[c.name] ?? ""}
                    onChange={(e) => update(i, c.name, e.target.value)}
                    placeholder={c.label}
                    aria-label={c.label}
                    className={inputClass}
                  />
                )
              )}
            </div>
            <div className="flex gap-1.5">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className={iconButton} title="Move up" aria-label="Move up">
                <ArrowUp size={16} />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === rows.length - 1}
                className={iconButton}
                title="Move down"
                aria-label="Move down"
              >
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                onClick={() => setRows((rs) => rs.filter((_, j) => j !== i))}
                className={`${iconButton} hover:border-red-200 hover:bg-red-50 hover:text-red-600`}
                title="Remove"
                aria-label="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={() => setRows((rs) => [...rs, blank()])} className={`${secondaryButton} mt-4`}>
        <Plus size={17} /> {list.addLabel}
      </button>
    </section>
  );
}
