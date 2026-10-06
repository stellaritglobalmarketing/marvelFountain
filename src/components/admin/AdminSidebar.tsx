"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink, House, KeyRound, LogOut, Mail, Menu, Settings, X, type LucideIcon } from "lucide-react";
import { icons } from "./icons";

type NavLink = { href: string; label: string; icon: string };

export default function AdminSidebar({
  main,
  more,
  unread,
  logout,
}: {
  main: NavLink[];
  more: NavLink[];
  unread: number;
  logout: () => Promise<void>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));
  const moreActive = more.some((l) => isActive(l.href)) || isActive("/admin/account");

  const item = (href: string, label: string, Icon: LucideIcon, badge?: number) => (
    <Link
      key={href}
      href={href}
      onClick={() => setOpen(false)}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition ${
        isActive(href) ? "bg-sky-50 text-sky-700 ring-1 ring-sky-100" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <Icon size={19} className={isActive(href) ? "text-sky-600" : "text-slate-400"} />
      <span className="flex-1">{label}</span>
      {!!badge && <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">{badge}</span>}
    </Link>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        <Link href="/admin">
          <Image src="/logo.png" alt="Marvel Fountains" width={249} height={73} style={{ height: "32px", width: "auto" }} />
        </Link>
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700">
          <Menu size={18} /> Menu
        </button>
      </div>
      {open && <div className="fixed inset-0 z-40 bg-slate-900/40 md:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[272px] shrink-0 border-r border-slate-200 bg-white transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto p-4">
          <div className="mb-5 flex items-center justify-between px-2 pt-1">
            <Link href="/admin" onClick={() => setOpen(false)}>
              <Image src="/logo.png" alt="Marvel Fountains" width={249} height={73} style={{ height: "36px", width: "auto" }} />
            </Link>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 md:hidden" aria-label="Close menu">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            {item("/admin", "Home", House)}
            {item("/admin/messages", "Enquiries", Mail, unread)}
            <div className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Website content</div>
            {main.map((l) => item(l.href, l.label, icons[l.icon] ?? Settings))}
            {item("/admin/settings", "Contact & Banners", Settings)}

            <details open={moreActive} className="group pt-3">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100">
                More settings
                <ChevronDown size={16} className="ml-auto transition group-open:rotate-180" />
              </summary>
              <div className="mt-1 space-y-1">
                {more.map((l) => item(l.href, l.label, icons[l.icon] ?? Settings))}
                {item("/admin/account", "Change Password", KeyRound)}
              </div>
            </details>
          </nav>

          <div className="mt-auto space-y-1 border-t border-slate-200 pt-4">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-slate-600 hover:bg-slate-100"
            >
              <ExternalLink size={19} className="text-slate-400" /> Open website
            </a>
            <form action={logout}>
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-slate-600 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={19} className="text-slate-400" /> Log out
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
