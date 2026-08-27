export const collectionNames = ["products", "blogPosts", "work", "team", "careers"] as const;
export type Collection = (typeof collectionNames)[number];
export type Section = Collection | "overview" | "inquiries";

export type RecordData = Record<string, unknown>;

export type Inquiry = RecordData & {
  id: string;
  status?: string;
  name?: string;
  email?: string;
  message?: string;
  enquiryType?: string;
  createdAt?: { _seconds?: number } | string;
};

export type FieldType = "text" | "textarea" | "number" | "boolean" | "tags" | "image" | "url" | "select";

export type FieldSchema = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  hint?: string;
  readOnlyOnEdit?: boolean;
};
