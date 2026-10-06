import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Marvel Fountains",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50 text-[15px] text-slate-800 [color-scheme:light]">{children}</div>;
}
