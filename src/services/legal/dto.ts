export namespace Legal {
  export type Kind = "terms" | "privacy" | "assessment_notice";

  export type Document = {
    kind: Kind;
    version: string;
    content: string;
    published_at: string;
  };

  export type ConsentItem = {
    kind: Kind;
    version: string;
    accepted: boolean;
    accepted_at: string | null;
  };

  export type Consents = {
    documents: ConsentItem[];
    pending: Kind[];
  };
}
