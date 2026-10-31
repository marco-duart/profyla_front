import { Badge, Checkbox, CheckboxField, Field, FieldGroup, FieldNote, Grid, Input, Item, ItemTop, Textarea } from "../CandidateKit/styles";
import { missingRequired, type ImportData, type ImportField } from "./fields";

type Props = {
  title: string;
  confidence: "high" | "medium" | "low";
  selected: boolean;
  fields: ImportField[];
  data: ImportData;
  warnings: string[];
  errors?: Record<string, string[]>;
  onToggle: (selected: boolean) => void;
  onChange: (name: string, value: string) => void;
};

const WARNING_TEXT: Record<string, string> = {
  year_only: "Confira o mês: o currículo informa só o ano.",
};

// One suggested item of the review screen: a checkbox plus editable fields. A required field that is
// still empty keeps the checkbox disabled, so nothing incomplete can be added.
export function ImportItem({ title, confidence, selected, fields, data, warnings, errors, onToggle, onChange }: Props) {
  const missing = missingRequired(fields, data);
  const blocked = missing.length > 0;

  return (
    <Item>
      <ItemTop>
        <CheckboxField disabled={blocked}>
          <Checkbox
            type="checkbox"
            checked={selected && !blocked}
            disabled={blocked}
            onChange={(event) => onToggle(event.target.checked)}
            aria-label={`Adicionar ${title}`}
          />
          <span>{title}</span>
        </CheckboxField>
        {confidence !== "high" ? <Badge tone="neutral">Confira</Badge> : null}
      </ItemTop>

      <Grid>
        {fields.map((field) => {
          const value = data[field.name] ?? "";
          const empty = field.required && !value.trim();
          const fieldErrors = errors?.[field.name];
          const invalid = empty || Boolean(fieldErrors) || undefined;
          const notesId = `${field.name}-${title}`.replace(/\s+/g, "-");
          return (
            <FieldGroup key={field.name} css={field.full || field.type === "textarea" ? { gridColumn: "1 / -1" } : undefined}>
              <Field>
                {field.label}
                {field.type === "textarea" ? (
                  <Textarea value={value} aria-invalid={invalid} aria-describedby={notesId} onChange={(event) => onChange(field.name, event.target.value)} />
                ) : (
                  <Input type={field.type ?? "text"} value={value} aria-invalid={invalid} aria-describedby={notesId} onChange={(event) => onChange(field.name, event.target.value)} />
                )}
              </Field>
              <div id={notesId}>
                {empty ? <FieldNote>Informe para poder adicionar.</FieldNote> : null}
                {fieldErrors?.map((message) => <FieldNote key={message} css={{ color: "$error" }}>{message}</FieldNote>)}
              </div>
            </FieldGroup>
          );
        })}
      </Grid>

      {warnings.map((warning) => (warning in WARNING_TEXT ? <FieldNote key={warning}>{WARNING_TEXT[warning]}</FieldNote> : null))}
    </Item>
  );
}
