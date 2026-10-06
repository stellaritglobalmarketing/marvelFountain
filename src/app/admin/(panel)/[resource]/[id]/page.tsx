import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import RecordForm from "@/components/admin/RecordForm";
import { saveRecord } from "@/lib/admin/actions";
import { getFieldOptions, getRecord } from "@/lib/admin/data";
import { getResource } from "@/lib/admin/resources";

export default async function EditRecord({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = await params;
  const res = getResource(resource);
  const recordId = Number(id);
  if (!res || !Number.isInteger(recordId) || recordId <= 0) notFound();

  const [record, options] = await Promise.all([getRecord(res, recordId), getFieldOptions(res)]);
  if (!record) notFound();

  return (
    <div className="max-w-[820px]">
      <Link href={`/admin/${res.key}`} className="inline-flex items-center gap-1.5 font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft size={17} /> Back to {res.label}
      </Link>
      <h1 className="mt-3 mb-6 text-2xl font-bold text-slate-900">Edit {res.singular.toLowerCase()}</h1>
      <RecordForm
        action={saveRecord.bind(null, res.key, recordId)}
        fields={res.fields}
        options={options}
        values={record.row}
        lists={res.children}
        listValues={record.children}
        cancelHref={`/admin/${res.key}`}
      />
    </div>
  );
}
