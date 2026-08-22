export interface Project {
  slug: string;
  title: string;
  category: string;
  /** Short summary shown on project cards. Falls back to `challenge` when omitted. */
  description?: string;
  challenge?: string;
  approach?: string;
  solution?: string;
  technology: string[];
  outcome?: string;
  lessons?: string;
  image?: string;
  confidential?: boolean;
  /**
   * External live site for projects without a full case study (e.g. concept
   * builds). When set, the project card links out here instead of to an
   * internal /work/[slug] case study page.
   */
  liveUrl?: string;
}
