import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { getBlogPosts, getProjects } from "@/lib/api";
import { blogCategories } from "@/data/blog";
import { slugifyCategory } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = siteConfig.url;
    const now = new Date();

    const staticPaths: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
        { path: "", priority: 1, changeFrequency: "weekly" },
        { path: "/about", priority: 0.8, changeFrequency: "monthly" },
        { path: "/products", priority: 0.9, changeFrequency: "monthly" },
        { path: "/products/servra", priority: 0.9, changeFrequency: "monthly" },
        { path: "/work", priority: 0.8, changeFrequency: "monthly" },
        { path: "/partnerships", priority: 0.6, changeFrequency: "monthly" },
        { path: "/team", priority: 0.6, changeFrequency: "monthly" },
        { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
        { path: "/careers", priority: 0.7, changeFrequency: "weekly" },
        { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
        { path: "/press", priority: 0.4, changeFrequency: "yearly" },
        { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
        { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    ];

    const staticEntries: MetadataRoute.Sitemap = staticPaths.map((item) => ({
        url: `${base}${item.path}`,
        lastModified: now,
        changeFrequency: item.changeFrequency,
        priority: item.priority,
    }));

    const [posts, projects] = await Promise.all([getBlogPosts(), getProjects()]);

    const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
        const published = post.publishedAt ? new Date(post.publishedAt) : now;
        return {
            url: `${base}/blog/${post.slug}`,
            lastModified: Number.isNaN(published.getTime()) ? now : published,
            changeFrequency: "monthly",
            priority: 0.7,
        };
    });

    const categoryEntries: MetadataRoute.Sitemap = blogCategories.map((category) => ({
        url: `${base}/blog/${slugifyCategory(category.label)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.5,
    }));

    const projectEntries: MetadataRoute.Sitemap = projects
        .filter((project) => !project.liveUrl)
        .map((project) => ({
            url: `${base}/work/${project.slug}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        }));

    return [...staticEntries, ...postEntries, ...categoryEntries, ...projectEntries];
}