export type ImportField = {
  name: string;
  label: string;
  type?: "text" | "date" | "textarea";
  required?: boolean;
  full?: boolean;
};

export type ImportData = Record<string, string | null>;

// Required fields that are still empty: while any is left the item cannot be selected.
export function missingRequired(fields: ImportField[], data: ImportData): string[] {
  return fields.filter((field) => field.required && !(data[field.name] ?? "").trim()).map((field) => field.name);
}
