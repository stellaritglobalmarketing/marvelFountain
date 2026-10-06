import { KeyRound } from "lucide-react";
import ActionForm from "@/components/admin/ActionForm";
import { cardClass, inputClass, labelClass } from "@/components/admin/styles";
import { changePassword } from "@/lib/admin/actions";

export default function AccountPage() {
  const fields = [
    { name: "current", label: "Your current password", autoComplete: "current-password" },
    { name: "next", label: "New password (at least 8 letters/numbers)", autoComplete: "new-password" },
    { name: "confirm", label: "Type the new password again", autoComplete: "new-password" },
  ];

  return (
    <div className="max-w-[520px]">
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
          <KeyRound size={24} />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Change password</h1>
          <p className="text-slate-500">Write the new password down somewhere safe.</p>
        </div>
      </div>
      <div className={`${cardClass} p-5 sm:p-6`}>
        <ActionForm action={changePassword} submitLabel="Change password" successMessage="Done! Your password has been changed." resetOnSuccess>
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className={labelClass}>
                {f.label}
              </label>
              <input id={f.name} name={f.name} type="password" autoComplete={f.autoComplete} required className={inputClass} />
            </div>
          ))}
        </ActionForm>
      </div>
    </div>
  );
}
