import { Inbox } from "lucide-react";
import { Inquiry } from "../types";

function formatDate(createdAt: Inquiry["createdAt"]): string {
  if (!createdAt) return "";
  if (typeof createdAt === "string") return new Date(createdAt).toLocaleString();
  if (createdAt._seconds) return new Date(createdAt._seconds * 1000).toLocaleString();
  return "";
}

export function InquiryList({ inquiries, onUpdate }: { inquiries: Inquiry[]; onUpdate: (id: string, status: string) => Promise<void> }) {
  return (
    <section className="section-block">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Inbox</p>
          <h3>Contact enquiries</h3>
        </div>
        <span className="muted">{inquiries.length} total</span>
      </div>
      <div className="inquiry-list">
        {inquiries.length === 0 ? (
          <div className="empty">
            <Inbox size={28} />
            <h3>No enquiries yet</h3>
            <p>New messages from the public site will appear here.</p>
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <article className={`inquiry status-${inquiry.status || "new"}`} key={inquiry.id}>
              <div className="inquiry-top">
                <div>
                  <strong>{inquiry.name || "Unnamed contact"}</strong>
                  <span>
                    {inquiry.email} · {inquiry.enquiryType || "General"} · {formatDate(inquiry.createdAt)}{" "}
                    <span className={`badge badge-${inquiry.status || "new"}`}>{(inquiry.status || "new").replace("_", " ")}</span>
                  </span>
                </div>
                <select value={inquiry.status || "new"} onChange={(event) => onUpdate(inquiry.id, event.target.value)}>
                  <option value="new">New</option>
                  <option value="in_progress">In progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <p>{inquiry.message || "No message"}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
