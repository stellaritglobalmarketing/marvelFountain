import { query } from "@/lib/db";
import type { Field, Option, Resource } from "./resources";

// Read helpers for admin pages (table/column names come from resources.ts only).

export async function getOptions(field: Field): Promise<Option[]> {
  if (field.options) return field.options;
  if (!field.optionsFrom) return [];
  const { table, label, orderBy } = field.optionsFrom;
  const rows = await query<{ id: number; label: string }>(`SELECT id, ${label} AS label FROM ${table} ORDER BY ${orderBy}`);
  return rows.map((r) => ({ value: String(r.id), label: r.label }));
}

export async function getFieldOptions(res: Resource) {
  const entries = await Promise.all(
    res.fields.filter((f) => f.type === "select").map(async (f) => [f.name, await getOptions(f)] as const)
  );
  return Object.fromEntries(entries) as Record<string, Option[]>;
}

export async function getRecord(res: Resource, id: number) {
  const [row] = await query<Record<string, unknown>>(`SELECT * FROM ${res.table} WHERE id = ?`, [id]);
  if (!row) return null;
  const children: Record<string, Record<string, string>[]> = {};
  for (const child of res.children ?? []) {
    const cols = child.columns.map((c) => c.name).join(", ");
    children[child.name] = await query<Record<string, string>>(
      `SELECT ${cols} FROM ${child.table} WHERE ${child.fk} = ? ORDER BY sort_order, id`,
      [id]
    );
  }
  return { row, children };
}
