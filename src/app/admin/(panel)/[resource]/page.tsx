import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUp, CheckCircle2, Pencil, Plus, Trash2 } from "lucide-react";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { icons } from "@/components/admin/icons";
import { cardClass, dangerButton, primaryButton, smallButton, successBox } from "@/components/admin/styles";
import { deleteRecord, moveRecord } from "@/lib/admin/actions";
import { getResource, type Resource } from "@/lib/admin/resources";
import { query } from "@/lib/db";

type Row = Record<string, unknown>;
const str = (v: unknown) => (v == null ? "" : String(v));

function Thumb({ res, row, className }: { res: Resource; row: Row; className: string }) {
  const { image, youtube } = res.display;
  const src = youtube ? `https://i.ytimg.com/vi/${str(row[youtube])}/hqdefault.jpg` : image ? str(row[image]) : "";
  if (!src) return <div className={`${className} bg-slate-100`} />;
  if (/\.mp4($|\?)/i.test(src)) return <video src={src} muted className={`${className} object-cover`} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" loading="lazy" className={`${className} bg-slate-100 ${res.key === "clients" ? "object-contain p-3" : "object-cover"}`} />;
}

function Actions({ res, row, first, last }: { res: Resource; row: Row; first: boolean; last: boolean }) {
  const id = Number(row.id);
  const name = str(row[res.display.title]) || `this ${res.singular.toLowerCase()}`;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <Link href={`/admin/${res.key}/${id}`} className={`${smallButton} border-sky-200 text-sky-700 hover:bg-sky-50`}>
        <Pencil size={15} /> Edit
      </Link>
      <form action={moveRecord.bind(null, res.key, id, -1)}>
        <button type="submit" disabled={first} className={smallButton} title="Move up" aria-label="Move up">
          <ArrowUp size={15} />
        </button>
      </form>
      <form action={moveRecord.bind(null, res.key, id, 1)}>
        <button type="submit" disabled={last} className={smallButton} title="Move down" aria-label="Move down">
          <ArrowDown size={15} />
        </button>
      </form>
      <ConfirmButton
        action={deleteRecord.bind(null, res.key, id)}
        message={`Delete “${name}”?\n\nThis cannot be undone.${res.deleteWarning ? `\n\n${res.deleteWarning}` : ""}`}
        className={dangerButton}
      >
        <Trash2 size={15} /> Delete
      </ConfirmButton>
    </div>
  );
}

function Flag({ res, row }: { res: Resource; row: Row }) {
  const flag = res.display.flag;
  if (!flag) return null;
  const on = Number(row[flag.column]) === 1;
  if (!on && !flag.off) return null;
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        on ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
      }`}
    >
      {on ? flag.on : flag.off}
    </span>
  );
}

function Items({ res, rows }: { res: Resource; rows: Row[] }) {
  const { title, subtitle } = res.display;
  if (res.view === "cards") {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((row, i) => (
          <div key={str(row.id)} className={`${cardClass} flex flex-col overflow-hidden`}>
            <Link href={`/admin/${res.key}/${str(row.id)}`} className="relative block">
              <Thumb res={res} row={row} className="h-44 w-full" />
              <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-slate-600 shadow">
                {i + 1}
              </span>
              <span className="absolute top-2 right-2">
                <Flag res={res} row={row} />
              </span>
            </Link>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="flex-1">
                <div className="font-semibold text-slate-900">{str(row[title]) || <span className="text-slate-400">(no name)</span>}</div>
                {subtitle && <div className="mt-0.5 line-clamp-2 text-sm text-slate-500">{str(row[subtitle])}</div>}
              </div>
              <Actions res={res} row={row} first={i === 0} last={i === rows.length - 1} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={`${cardClass} divide-y divide-slate-100`}>
      {rows.map((row, i) => (
        <div key={str(row.id)} className="flex flex-wrap items-center gap-4 px-5 py-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-500">
            {i + 1}
          </span>
          <div className="min-w-[200px] flex-1">
            <div className="flex flex-wrap items-center gap-2 font-semibold text-slate-900">
              {str(row.value) && <span className="text-sky-600">{str(row.value)}</span>}
              {str(row[title])}
              <Flag res={res} row={row} />
            </div>
            {subtitle && str(row[subtitle]) && <div className="mt-0.5 line-clamp-2 text-sm text-slate-500">{str(row[subtitle])}</div>}
          </div>
          <Actions res={res} row={row} first={i === 0} last={i === rows.length - 1} />
        </div>
      ))}
    </div>
  );
}

export default async function ResourceList({
  params,
  searchParams,
}: {
  params: Promise<{ resource: string }>;
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const { resource } = await params;
  const res = getResource(resource);
  if (!res) notFound();
  const [flash, rows] = await Promise.all([searchParams, query<Row>(res.listSql)]);
  const Icon = icons[res.icon];

  // Split into headed groups (e.g. menu links per menu); reordering happens inside a group
  const groups: { heading: string; rows: Row[] }[] = [];
  if (res.groupBy) {
    const { column, label, options } = res.groupBy;
    for (const row of rows) {
      const key = str(row[column]);
      const heading = options?.find((o) => o.value === key)?.label ?? str(label ? row[label] : key);
      const last = groups[groups.length - 1];
      if (last && last.heading === heading) last.rows.push(row);
      else groups.push({ heading, rows: [row] });
    }
  } else {
    groups.push({ heading: "", rows });
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            <Icon size={24} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{res.label}</h1>
            <p className="text-slate-500">{res.description}</p>
          </div>
        </div>
        <Link href={`/admin/${res.key}/new`} className={primaryButton}>
          <Plus size={18} /> Add {res.singular.toLowerCase()}
        </Link>
      </div>

      {(flash.saved || flash.deleted) && (
        <p className={`${successBox} mb-5`}>
          <CheckCircle2 size={18} /> {flash.saved ? "Saved! The website has been updated." : "Deleted. The website has been updated."}
        </p>
      )}

      {rows.length === 0 ? (
        <div className={`${cardClass} p-10 text-center`}>
          <p className="mb-4 text-slate-500">Nothing here yet.</p>
          <Link href={`/admin/${res.key}/new`} className={primaryButton}>
            <Plus size={18} /> Add the first one
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((g) => (
            <section key={g.heading || "all"}>
              {g.heading && <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-slate-500">{g.heading}</h2>}
              <Items res={res} rows={g.rows} />
            </section>
          ))}
        </div>
      )}

      {rows.length > 1 && (
        <p className="mt-6 text-sm text-slate-500">Tip: use the ↑ ↓ arrows to change the order on the website.</p>
      )}
    </>
  );
}
