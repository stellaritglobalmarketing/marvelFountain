import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import RecordForm from "@/components/admin/RecordForm";
import { saveRecord } from "@/lib/admin/actions";
import { getFieldOptions } from "@/lib/admin/data";
import { getResource } from "@/lib/admin/resources";

export default async function NewRecord({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const res = getResource(resource);
  if (!res) notFound();
  const options = await getFieldOptions(res);

  return (
    <div className="max-w-[820px]">
      <Link href={`/admin/${res.key}`} className="inline-flex items-center gap-1.5 font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft size={17} /> Back to {res.label}
      </Link>
      <h1 className="mt-3 mb-6 text-2xl font-bold text-slate-900">Add {res.singular.toLowerCase()}</h1>
      <RecordForm
        action={saveRecord.bind(null, res.key, null)}
        fields={res.fields}
        options={options}
        values={{ is_active: 1, show_in_gallery: 1 }}
        lists={res.children}
        cancelHref={`/admin/${res.key}`}
      />
    </div>
  );
}
