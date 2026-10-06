import { Settings } from "lucide-react";
import ActionForm from "@/components/admin/ActionForm";
import ImageInput from "@/components/admin/ImageInput";
import { cardClass, helpClass, inputClass, labelClass } from "@/components/admin/styles";
import { saveSettings } from "@/lib/admin/actions";
import { settingGroups } from "@/lib/admin/resources";
import { query } from "@/lib/db";

export default async function SettingsPage() {
  const rows = await query<{ k: string; v: string }>("SELECT k, v FROM settings");
  const values = Object.fromEntries(rows.map((r) => [r.k, r.v]));

  return (
    <div className="max-w-[820px]">
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
          <Settings size={24} />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contact & Banners</h1>
          <p className="text-slate-500">Your phone, email and address, and the big photos at the top of pages.</p>
        </div>
      </div>
      <ActionForm action={saveSettings} submitLabel="Save changes" successMessage="Saved! The website has been updated.">
        {settingGroups.map((g) => (
          <section key={g.title} className={`${cardClass} space-y-5 p-5 sm:p-6`}>
            <h2 className="text-lg font-semibold text-slate-900">{g.title}</h2>
            {g.fields.map((s) => (
              <div key={s.k}>
                <label htmlFor={s.k} className={labelClass}>
                  {s.label}
                </label>
                {s.type === "image" || s.type === "video" ? (
                  <ImageInput name={s.k} defaultValue={values[s.k] ?? ""} kind={s.type} />
                ) : s.type === "textarea" ? (
                  <textarea id={s.k} name={s.k} defaultValue={values[s.k] ?? ""} rows={2} className={inputClass} />
                ) : (
                  <input id={s.k} name={s.k} defaultValue={values[s.k] ?? ""} className={inputClass} />
                )}
                {s.help && <p className={helpClass}>{s.help}</p>}
              </div>
            ))}
          </section>
        ))}
      </ActionForm>
    </div>
  );
}
