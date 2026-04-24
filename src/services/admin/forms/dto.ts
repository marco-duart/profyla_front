export namespace AdminForm {
  export type Field = {
    id: number;
    question: string;
    response_type: "text" | "string" | "number" | "boolean" | "date";
  };

  export type Item = {
    id: number;
    title: string;
    description: string;
    department: string;
    fields?: Field[];
  };
}
