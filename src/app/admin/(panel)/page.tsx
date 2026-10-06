import Link from "next/link";
import { ChevronRight, ImagePlus, Mail, PackagePlus, Phone, Star, Video } from "lucide-react";
import { icons } from "@/components/admin/icons";
import { cardClass } from "@/components/admin/styles";
import { resources } from "@/lib/admin/resources";
import { query } from "@/lib/db";

const quickActions = [
  { href: "/admin/products/new", label: "Add a new product", Icon: PackagePlus, color: "bg-sky-600" },
  { href: "/admin/gallery-photos/new", label: "Add a gallery photo", Icon: ImagePlus, color: "bg-emerald-600" },
  { href: "/admin/videos/new", label: "Add a YouTube video", Icon: Video, color: "bg-rose-600" },
  { href: "/admin/testimonials/new", label: "Add a customer review", Icon: Star, color: "bg-amber-500" },
  { href: "/admin/settings", label: "Change phone / email / address", Icon: Phone, color: "bg-violet-600" },
];

export default async function Dashboard() {
  const main = resources.filter((r) => !r.advanced);
  const [counts, messages, [{ unreadCount }]] = await Promise.all([
    query<{ t: string; n: number }>(main.map((r) => `SELECT '${r.key}' AS t, COUNT(*) AS n FROM ${r.table}`).join(" UNION ALL ")),
    query<{ id: number; name: string; message: string; created_at: Date; is_read: number }>(
      "SELECT id, name, LEFT(message, 120) AS message, created_at, is_read FROM contact_messages ORDER BY created_at DESC LIMIT 5"
    ),
    query<{ unreadCount: number }>("SELECT COUNT(*) AS unreadCount FROM contact_messages WHERE is_read = 0"),
  ]);
  const unread = Number(unreadCount);

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Welcome 👋</h1>
      <p className="mt-1 mb-7 text-slate-500">What would you like to do today? Changes show on the website right away.</p>

      {unread > 0 && (
        <Link
          href="/admin/messages"
          className="mb-7 flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 transition hover:bg-red-100"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white">
            <Mail size={20} />
          </span>
          <span className="flex-1">
            <span className="block font-semibold text-red-800">
              You have {unread} new {unread === 1 ? "enquiry" : "enquiries"}
            </span>
            <span className="text-sm text-red-700">Click here to read {unread === 1 ? "it" : "them"}</span>
          </span>
          <ChevronRight className="text-red-400" />
        </Link>
      )}

      <h2 className="mb-3 text-lg font-semibold text-slate-900">Quick actions</h2>
      <div className="mb-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map(({ href, label, Icon, color }) => (
          <Link key={href} href={href} className={`${cardClass} flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-md`}>
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${color}`}>
              <Icon size={22} />
            </span>
            <span className="font-semibold text-slate-800">{label}</span>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 text-lg font-semibold text-slate-900">Your website</h2>
      <div className="mb-9 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {main.map((r) => {
          const Icon = icons[r.icon];
          return (
            <Link key={r.key} href={`/admin/${r.key}`} className={`${cardClass} p-4 transition hover:border-sky-300 hover:shadow-md`}>
              <Icon size={22} className="mb-3 text-sky-600" />
              <div className="text-2xl font-bold text-slate-900">{counts.find((c) => c.t === r.key)?.n ?? 0}</div>
              <div className="text-sm font-medium text-slate-500">{r.label}</div>
            </Link>
          );
        })}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Latest enquiries</h2>
        <Link href="/admin/messages" className="text-sm font-semibold text-sky-600 hover:underline">
          See all
        </Link>
      </div>
      <div className={`${cardClass} overflow-hidden`}>
        {messages.length === 0 && <p className="p-5 text-slate-500">No enquiries yet. They will appear here when someone fills the contact form.</p>}
        {messages.map((m) => (
          <Link
            key={m.id}
            href={`/admin/messages#m${m.id}`}
            className="flex items-center gap-4 border-b border-slate-100 px-5 py-4 last:border-0 hover:bg-slate-50"
          >
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${m.is_read ? "bg-slate-200" : "bg-red-500"}`} />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-slate-800">{m.name}</span>
              <span className="block truncate text-sm text-slate-500">{m.message}</span>
            </span>
            <span className="shrink-0 text-xs text-slate-400">{new Date(m.created_at).toLocaleDateString("en-IN")}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
