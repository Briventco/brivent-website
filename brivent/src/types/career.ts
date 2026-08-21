export type EngagementType = "Full-time" | "Part-time" | "Contract" | "Internship";

export interface JobOpening {
  slug: string;
  title: string;
  department: string;
  location: string;
  remote: boolean;
  engagementType: EngagementType;
  expectations: string[];
  applyHref: string;
}
