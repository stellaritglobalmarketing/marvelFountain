import { CheckCircle2, Mail, MessageCircle, Phone, Trash2 } from "lucide-react";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { cardClass, dangerButton, smallButton, successBox } from "@/components/admin/styles";
import { deleteMessage, setMessageRead } from "@/lib/admin/actions";
import { query } from "@/lib/db";

type Message = { id: number; name: string; phone: string; email: string; message: string; is_read: number; created_at: Date };

// WhatsApp link: digits only, assume India (+91) for 10-digit numbers
const whatsapp = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits.length === 10 ? `91${digits}` : digits}`;
};

export default async function MessagesPage({ searchParams }: { searchParams: Promise<{ deleted?: string }> }) {
  const [{ deleted }, messages] = await Promise.all([
    searchParams,
    query<Message>("SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 500"),
  ]);
  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <>
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
          <Mail size={24} />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enquiries</h1>
          <p className="text-slate-500">
            Messages people sent from the website’s contact form{unread > 0 && ` — ${unread} new`}.
          </p>
        </div>
      </div>

      {deleted && (
        <p className={`${successBox} mb-5`}>
          <CheckCircle2 size={18} /> Enquiry deleted.
        </p>
      )}
      {messages.length === 0 && (
        <p className={`${cardClass} p-8 text-center text-slate-500`}>No enquiries yet. They will appear here when someone fills the contact form.</p>
      )}

      <div className="space-y-4">
        {messages.map((m) => (
          <article
            key={m.id}
            id={`m${m.id}`}
            className={`${cardClass} scroll-mt-6 p-5 ${m.is_read ? "" : "border-l-4 border-l-red-500"}`}
          >
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  {m.name}
                  {!m.is_read && <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">NEW</span>}
                </h2>
                <p className="text-sm text-slate-500">
                  {new Date(m.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
            </div>
            <p className="mb-4 whitespace-pre-line rounded-xl bg-slate-50 p-4 leading-relaxed text-slate-800">{m.message}</p>
            <div className="flex flex-wrap gap-2">
              <a href={`tel:${m.phone}`} className={`${smallButton} border-sky-200 text-sky-700 hover:bg-sky-50`}>
                <Phone size={15} /> Call {m.phone}
              </a>
              <a href={whatsapp(m.phone)} target="_blank" rel="noopener noreferrer" className={`${smallButton} border-emerald-200 text-emerald-700 hover:bg-emerald-50`}>
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a href={`mailto:${m.email}`} className={smallButton}>
                <Mail size={15} /> {m.email}
              </a>
              <span className="flex-1" />
              <form action={setMessageRead.bind(null, m.id, !m.is_read)}>
                <button type="submit" className={smallButton}>
                  {m.is_read ? "Mark as new" : "Mark as read"}
                </button>
              </form>
              <ConfirmButton
                action={deleteMessage.bind(null, m.id)}
                message={`Delete the enquiry from ${m.name}?\n\nThis cannot be undone.`}
                className={dangerButton}
              >
                <Trash2 size={15} /> Delete
              </ConfirmButton>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
