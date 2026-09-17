import { Collection, Inquiry, RecordData } from "../types";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3002";
export const siteUrl = import.meta.env.VITE_SITE_URL || "http://localhost:3000";
const requestTimeoutMs = 8000;

async function request<T>(path: string, token: string, options: RequestInit = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMs);
  let response: Response;
  try {
    response = await fetch(`${apiUrl}${path}`, {
      ...options,
      signal: options.signal || controller.signal,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...options.headers },
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("The admin backend is unavailable. Please start it and try again.");
    }
    throw new Error("The admin backend is unavailable. Please check your connection and try again.");
  } finally {
    window.clearTimeout(timeout);
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${response.status})`);
  }
  return response.status === 204 ? (null as T) : response.json();
}

export const api = {
  summary: (token: string) => request<{ counts: Record<string, number>; inquiries: number }>("/api/admin/summary", token),
  list: (token: string, collection: Collection) => request<RecordData[]>(`/api/admin/content/${collection}`, token),
  save: (token: string, collection: Collection, slug: string, data: RecordData) =>
    request<RecordData>(`/api/admin/content/${collection}/${encodeURIComponent(slug)}`, token, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  remove: (token: string, collection: Collection, slug: string) =>
    request<null>(`/api/admin/content/${collection}/${encodeURIComponent(slug)}`, token, { method: "DELETE" }),
  inquiries: (token: string) => request<Inquiry[]>("/api/admin/inquiries", token),
  updateInquiry: (token: string, id: string, status: string) =>
    request<{ success: boolean }>(`/api/admin/inquiries/${id}`, token, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  upload: async (token: string, file: File, collection: Collection): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("collection", collection);
    const response = await fetch(`${apiUrl}/api/admin/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || `Upload failed (${response.status})`);
    }
    return (await response.json()).url;
  },
};
