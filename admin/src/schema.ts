import { Collection, FieldSchema } from "./types";

export const collectionLabels: Record<Collection, string> = {
  products: "Products",
  blogPosts: "Blog posts",
  work: "Selected work",
  team: "Team",
  careers: "Careers",
};

export const collectionSingular: Record<Collection, string> = {
  products: "product",
  blogPosts: "post",
  work: "case study",
  team: "team member",
  careers: "role",
};

export const titleField: Record<Collection, "name" | "title"> = {
  products: "name",
  work: "title",
  team: "name",
  careers: "title",
  blogPosts: "title",
};

export const schemas: Record<Collection, FieldSchema[]> = {
  products: [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "tagline", label: "Tagline", type: "text" },
    { key: "category", label: "Category", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
    { key: "status", label: "Status", type: "select", options: ["Live", "Beta", "Coming soon", "Archived"] },
    { key: "image", label: "Image", type: "image" },
    { key: "href", label: "Link", type: "url" },
    { key: "order", label: "Sort order", type: "number" },
  ],
  work: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "category", label: "Category", type: "text" },
    { key: "description", label: "Summary", type: "textarea" },
    { key: "challenge", label: "Challenge", type: "textarea" },
    { key: "approach", label: "Approach", type: "textarea" },
    { key: "solution", label: "Solution", type: "textarea" },
    { key: "outcome", label: "Outcome", type: "textarea" },
    { key: "technology", label: "Technology", type: "tags" },
    { key: "image", label: "Image", type: "image" },
    { key: "liveUrl", label: "Live URL", type: "url" },
    { key: "order", label: "Sort order", type: "number" },
  ],
  team: [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "role", label: "Role", type: "text" },
    { key: "department", label: "Department", type: "text" },
    { key: "bio", label: "Bio", type: "textarea" },
    { key: "photo", label: "Photo", type: "image" },
    { key: "linkedin", label: "LinkedIn URL", type: "url" },
    { key: "isEarlyBuilder", label: "Early builder", type: "boolean" },
    { key: "order", label: "Sort order", type: "number" },
  ],
  careers: [
    { key: "title", label: "Role title", type: "text", required: true },
    { key: "department", label: "Department", type: "text" },
    { key: "location", label: "Location", type: "text" },
    { key: "employmentType", label: "Employment type", type: "select", options: ["Full-time", "Part-time", "Contract", "Internship"] },
    { key: "description", label: "Description", type: "textarea", hint: "One expectation or requirement per line." },
    {
      key: "applyUrl",
      label: "Apply link or email",
      type: "text",
      hint: "An email like operations@yourdomain.com opens the applicant's mail app. A web link opens that page.",
    },
    { key: "order", label: "Sort order", type: "number" },
  ],
  blogPosts: [
    { key: "title", label: "Title", type: "text", required: true },
    { key: "excerpt", label: "Excerpt", type: "textarea" },
    { key: "content", label: "Content", type: "textarea" },
    { key: "category", label: "Category", type: "select", options: ["Company", "Product", "Engineering", "AI", "Business", "Partnerships", "Community", "Careers"], required: true },
    { key: "coverImage", label: "Cover image", type: "image" },
    { key: "author", label: "Author", type: "text" },
    { key: "publishedAt", label: "Publish date", type: "text", hint: "Format: 2026-09-20. Leave empty to use today's date." },
    { key: "tags", label: "Tags", type: "tags" },
    { key: "pinned", label: "Pinned", type: "boolean", hint: "Show this post first in its category." },
    { key: "order", label: "Sort order", type: "number" },
  ],
};

export function titleFor(item: Record<string, unknown>): string {
  return String(item.name || item.title || item.slug || "Untitled");
}