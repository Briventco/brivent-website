import { Briefcase, FolderKanban, Inbox, LayoutDashboard, LucideIcon, Newspaper, Package, Users } from "lucide-react";
import { Collection } from "./types";

export type SectionMeta = { icon: LucideIcon; eyebrow: string; blurb: string; tone: string };

export const sectionMeta: Record<Collection | "inquiries" | "overview", SectionMeta> = {
    overview: { icon: LayoutDashboard, eyebrow: "Workspace", blurb: "A clear view of everything shaping Brivent.", tone: "products" },
    products: { icon: Package, eyebrow: "Content / Products", blurb: "The products Brivent ships. Each one gets its own page on the site.", tone: "products" },
    blogPosts: { icon: Newspaper, eyebrow: "Content / Journal", blurb: "Stories, updates and ideas from the team, published to the Brivent blog.", tone: "blog" },
    work: { icon: FolderKanban, eyebrow: "Content / Portfolio", blurb: "Case studies that show how Brivent builds and what it delivers.", tone: "work" },
    team: { icon: Users, eyebrow: "Content / People", blurb: "The builders behind Brivent, as they appear on the team page.", tone: "team" },
    careers: { icon: Briefcase, eyebrow: "Content / Hiring", blurb: "Open roles and how people can apply to join Brivent.", tone: "careers" },
    inquiries: { icon: Inbox, eyebrow: "Inbox", blurb: "Messages from the contact form, moved from new to resolved.", tone: "inbox" },
};