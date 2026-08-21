export type TeamDepartment =
  | "Leadership"
  | "Engineering"
  | "Operations"
  | "People"
  | "Finance"
  | "Content"
  | "Early Builder";

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  department: TeamDepartment;
  photo?: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
  isEarlyBuilder?: boolean;
}
