import "server-only";
import { z } from "zod";
import { BlogPost, BlogCategory } from "@/types/blog";
import { JobOpening, EngagementType } from "@/types/career";
import { Product, ProductStatus } from "@/types/product";
import { Project } from "@/types/project";
import { TeamDepartment, TeamMember } from "@/types/team";
import { products as localProducts } from "@/data/products";
import { projects as localProjects } from "@/data/projects";
import { team as localTeam } from "@/data/team";

const API_BASE_URL =
  process.env.BRIVENT_API_URL ?? "http://localhost:3002";

const FETCH_TIMEOUT_MS = 10_000;
const REVALIDATE_SECONDS = 300;

async function apiFetch(path: string): Promise<unknown[] | Record<string, unknown> | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error(`Brivent API request failed: GET ${path} -> ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error(`Brivent API request errored: GET ${path}`, err);
    return null;
  }
}

const blogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().default(""),
  category: z.string().default("Company"),
  tags: z.array(z.string()).default([]),
  author: z.string().default(""),
  publishedAt: z.string().default(""),
  readingTime: z.string().optional(),
  coverImage: z.string().optional(),
  content: z.string().default(""),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: z.string().optional(),
});

function toBlogPost(raw: z.infer<typeof blogPostSchema>): BlogPost {
  return { ...raw, category: raw.category as BlogCategory };
}

const jobOpeningSchema = z.object({
  slug: z.string(),
  title: z.string(),
  department: z.string().default(""),
  location: z.string().default(""),
  remote: z.boolean().default(false),
  engagementType: z.string().default("Full-time"),
  expectations: z.array(z.string()).default([]),
  applyHref: z.string().default("/contact"),
});

function toJobOpening(raw: z.infer<typeof jobOpeningSchema>): JobOpening {
  return { ...raw, engagementType: raw.engagementType as EngagementType };
}

function parseList<T>(
  data: unknown,
  schema: z.ZodType<T>,
  label: string
): T[] {
  if (!Array.isArray(data)) return [];

  return data.flatMap((item) => {
    const parsed = schema.safeParse(item);
    if (!parsed.success) {
      console.error(`Brivent API returned an invalid ${label}:`, parsed.error.message);
      return [];
    }
    return [parsed.data];
  });
}

const productSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string().default(""),
  category: z.string().default(""),
  description: z.string().default(""),
  status: z.string().default("Coming Soon"),
  image: z.string().optional(),
  href: z.string().default(""),
});

function toProduct(raw: z.infer<typeof productSchema>): Product {
  return { ...raw, status: raw.status as ProductStatus };
}

const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string().default(""),
  description: z.string().optional(),
  challenge: z.string().optional(),
  approach: z.string().optional(),
  solution: z.string().optional(),
  technology: z.array(z.string()).default([]),
  outcome: z.string().optional(),
  lessons: z.string().optional(),
  image: z.string().optional(),
  confidential: z.boolean().optional(),
  liveUrl: z.string().optional(),
});

const teamMemberSchema = z.object({
  slug: z.string(),
  name: z.string(),
  role: z.string().default(""),
  department: z.string().default("Engineering"),
  photo: z.string().optional(),
  bio: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  isEarlyBuilder: z.boolean().optional(),
});

function toTeamMember(raw: z.infer<typeof teamMemberSchema>): TeamMember {
  return { ...raw, department: raw.department as TeamDepartment };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await apiFetch("/api/blog");
  return parseList(data, blogPostSchema, "blog post").map(toBlogPost);
}

export async function getJobOpenings(): Promise<JobOpening[]> {
  const data = await apiFetch("/api/careers");
  return parseList(data, jobOpeningSchema, "job opening").map(toJobOpening);
}

export async function getProducts(): Promise<Product[]> {
  const data = await apiFetch("/api/products");
  const products = parseList(data, productSchema, "product").map(toProduct);
  return products.length > 0 ? products : localProducts;
}

export async function getProjects(): Promise<Project[]> {
  const data = await apiFetch("/api/work");
  const projects = parseList(data, projectSchema, "project");
  return projects.length > 0 ? projects : localProjects;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const data = await apiFetch("/api/team");
  const members = parseList(data, teamMemberSchema, "team member").map(toTeamMember);
  return members.length > 0 ? members : localTeam;
}

export interface ContactPayload {
  name: string;
  email: string;
  organization?: string;
  enquiryType: string;
  message: string;
  website?: string;
}

export async function submitContact(
  payload: ContactPayload
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        ok: false,
        status: res.status,
        error: data.error || "Failed to send your message. Please try again.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("Brivent API contact submission errored:", err);
    return {
      ok: false,
      status: 502,
      error: "Failed to reach the server. Please try again.",
    };
  }
}
