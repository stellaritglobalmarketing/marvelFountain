"use client";

import { useActionState, startTransition } from "react";
import Link from "next/link";
import { AlertCircle, ChevronDown, Save } from "lucide-react";
import type { ChildList, Field, Option } from "@/lib/admin/resources";
import type { FormState } from "@/lib/admin/actions";
import ImageInput from "./ImageInput";
import ListEditor from "./ListEditor";
import { cardClass, errorBox, helpClass, inputClass, labelClass, primaryButton, secondaryButton } from "./styles";

const str = (v: unknown) => (v == null ? "" : String(v));

function FieldInput({ f, value, options }: { f: Field; value: unknown; options: Option[] }) {
  if (f.type === "checkbox") {
    return (
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:bg-slate-50">
        <input type="checkbox" name={f.name} defaultChecked={Boolean(Number(value ?? 0))} className="peer sr-only" />
        {/* switch */}
        <span className="relative mt-0.5 h-6 w-11 shrink-0 rounded-full bg-slate-300 transition peer-checked:bg-emerald-500 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" />
        <span>
          <span className="block text-[15px] font-semibold text-slate-800">{f.label}</span>
          {f.help && <span className="block text-[13px] text-slate-500">{f.help}</span>}
        </span>
      </label>
    );
  }

  return (
    <div>
      <label htmlFor={f.name} className={labelClass}>
        {f.label} {f.required && <span className="font-normal text-red-500">*</span>}
      </label>
      {f.type === "textarea" ? (
        <textarea
          id={f.name}
          name={f.name}
          defaultValue={str(value)}
          required={f.required}
          rows={4}
          placeholder={f.placeholder}
          className={inputClass}
        />
      ) : f.type === "image" || f.type === "video" ? (
        <ImageInput name={f.name} defaultValue={str(value)} kind={f.type} />
      ) : f.type === "select" ? (
        <select id={f.name} name={f.name} defaultValue={str(value)} required={f.required} className={inputClass}>
          <option value="">{f.required ? "— Please choose —" : "— None —"}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={f.name}
          name={f.name}
          type="text"
          inputMode={f.type === "number" ? "numeric" : undefined}
          defaultValue={str(value)}
          required={f.required}
          placeholder={f.placeholder}
          className={inputClass}
        />
      )}
      {f.help && <p className={helpClass}>{f.help}</p>}
    </div>
  );
}

export default function RecordForm({
  action,
  fields,
  options,
  values,
  lists = [],
  listValues = {},
  cancelHref,
}: {
  action: (prev: FormState, fd: FormData) => Promise<FormState>;
  fields: Field[];
  options: Record<string, Option[]>;
  values: Record<string, unknown>;
  lists?: ChildList[];
  listValues?: Record<string, Record<string, string>[]>;
  cancelHref: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const main = fields.filter((f) => !f.advanced);
  const advanced = fields.filter((f) => f.advanced);

  return (
    <form
      // Submit manually so the form keeps what was typed if the server returns an error
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => formAction(fd));
      }}
      className="space-y-5"
    >
      <section className={`${cardClass} space-y-5 p-5 sm:p-6`}>
        {main.map((f) => (
          <FieldInput key={f.name} f={f} value={values[f.name]} options={options[f.name] ?? []} />
        ))}
      </section>

      {lists.map((l) => (
        <ListEditor key={l.name} list={l} initial={listValues[l.name] ?? []} />
      ))}

      {advanced.length > 0 && (
        <details className={`${cardClass} group`}>
          <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-[15px] font-semibold text-slate-700 sm:px-6">
            Advanced options <span className="ml-1.5 font-normal text-slate-400">(usually not needed)</span>
            <ChevronDown size={18} className="ml-auto text-slate-400 transition group-open:rotate-180" />
          </summary>
          <div className="space-y-5 border-t border-slate-100 p-5 sm:p-6">
            {advanced.map((f) => (
              <FieldInput key={f.name} f={f} value={values[f.name]} options={options[f.name] ?? []} />
            ))}
          </div>
        </details>
      )}

      {/* sticky save bar */}
      <div className="sticky bottom-0 z-10 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:shadow-lg">
        {state.error && (
          <p className={`${errorBox} mb-3`}>
            <AlertCircle size={18} className="shrink-0" /> {state.error}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={pending} className={`${primaryButton} min-w-[160px]`}>
            <Save size={18} /> {pending ? "Saving…" : "Save changes"}
          </button>
          <Link href={cancelHref} className={secondaryButton}>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
