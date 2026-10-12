import { siteUrl } from "./api";

export function resolveImageUrl(value: unknown): string {
    const text = value === undefined || value === null ? "" : String(value);
    if (!text) return "";
    if (/^(https?:)?\/\//.test(text) || text.startsWith("data:")) return text;
    return `${siteUrl}${text.startsWith("/") ? "" : "/"}${text}`;
}