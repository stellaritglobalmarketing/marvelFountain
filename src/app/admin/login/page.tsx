import Image from "next/image";
import { redirect } from "next/navigation";
import ActionForm from "@/components/admin/ActionForm";
import { inputClass, labelClass } from "@/components/admin/styles";
import { login } from "@/lib/admin/actions";
import { getAdminId } from "@/lib/auth";

export default async function LoginPage() {
  if (await getAdminId()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-white to-amber-50 px-4">
      <div className="w-full max-w-[400px] rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
        <div className="mb-6 flex justify-center">
          <Image src="/logo.png" alt="Marvel Fountains" width={249} height={73} style={{ height: "44px", width: "auto" }} />
        </div>
        <h1 className="text-center text-2xl font-bold text-slate-900">Welcome back</h1>
        <p className="mb-7 text-center text-slate-500">Log in to manage your website</p>
        <ActionForm action={login} submitLabel="Log in">
          <div>
            <label htmlFor="username" className={labelClass}>Username</label>
            <input id="username" name="username" autoComplete="username" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
          </div>
        </ActionForm>
      </div>
    </main>
  );
}
