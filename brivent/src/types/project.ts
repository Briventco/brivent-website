export interface Project {
  slug: string;
  title: string;
  category: string;
  challenge: string;
  approach: string;
  solution: string;
  technology: string[];
  outcome: string;
  lessons?: string;
  image?: string;
  confidential?: boolean;
}
