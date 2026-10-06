import AdminSidebar from "@/components/admin/AdminSidebar";
import { logout } from "@/lib/admin/actions";
import { resources } from "@/lib/admin/resources";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const [{ unread }] = await query<{ unread: number }>("SELECT COUNT(*) AS unread FROM contact_messages WHERE is_read = 0");
  const link = (r: (typeof resources)[number]) => ({ href: `/admin/${r.key}`, label: r.label, icon: r.icon });

  return (
    <div className="md:flex">
      <AdminSidebar
        main={resources.filter((r) => !r.advanced).map(link)}
        more={resources.filter((r) => r.advanced).map(link)}
        unread={Number(unread)}
        logout={logout}
      />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-[1100px]">{children}</div>
      </main>
    </div>
  );
}
