import { useState } from "react";
import { Inbox, Mail, RotateCcw } from "lucide-react";
import { Inquiry } from "../types";
import { sectionMeta } from "../sectionmeta";
import { SectionHero } from "./SectionHero";

function toDate(createdAt: Inquiry["createdAt"]): Date | null {
  if (!createdAt) return null;
  if (typeof createdAt === "string") {
    const parsed = new Date(createdAt);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  const seconds = createdAt._seconds ?? (createdAt as { seconds?: number }).seconds;
  return seconds ? new Date(seconds * 1000) : null;
}

function formatDate(createdAt: Inquiry["createdAt"]): string {
  const date = toDate(createdAt);
  return date ? date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "";
}

const columns = [
  { key: "new", label: "New", hint: "Waiting for a reply" },
  { key: "in_progress", label: "In progress", hint: "Being handled" },
  { key: "resolved", label: "Resolved", hint: "All done" },
] as const;

type Status = (typeof columns)[number]["key"];

const moves: Record<Status, { to: Status; label: string; primary?: boolean }[]> = {
  new: [
    { to: "in_progress", label: "Start", primary: true },
    { to: "resolved", label: "Resolve" },
  ],
  in_progress: [
    { to: "resolved", label: "Resolve", primary: true },
    { to: "new", label: "Back to new" },
  ],
  resolved: [{ to: "new", label: "Reopen" }],
};

function statusOf(inquiry: Inquiry): Status {
  return inquiry.status === "in_progress" || inquiry.status === "resolved" ? inquiry.status : "new";
}

function InquiryCard({ inquiry, status, busy, onMove }: { inquiry: Inquiry; status: Status; busy: boolean; onMove: (to: Status) => void }) {
  const [open, setOpen] = useState(false);
  const message = inquiry.message || "No message";
  const long = message.length > 180;
  return (
    <article className={`k-card k-${status}`}>
      <div className="k-top">
        <span className="k-avatar">{(inquiry.name || inquiry.email || "?")[0].toUpperCase()}</span>
        <div className="k-who">
          <strong>{inquiry.name || "Unnamed contact"}</strong>
          <span>{inquiry.email}</span>
        </div>
      </div>
      <div className="k-tags">
        <span className="chip">{inquiry.enquiryType || "General"}</span>
        {formatDate(inquiry.createdAt) && <span className="when">{formatDate(inquiry.createdAt)}</span>}
      </div>
      <p className={open ? "k-msg" : "k-msg clamp-4"}>{message}</p>
      {long && (
        <button className="link-button" onClick={() => setOpen(!open)}>
          {open ? "Show less" : "Read more"}
        </button>
      )}
      <div className="k-actions">
        {moves[status].map((move) => (
          <button
            key={move.to}
            disabled={busy}
            className={move.primary ? "primary-button compact small" : "secondary-button small"}
            onClick={() => onMove(move.to)}
          >
            {move.to === "new" && <RotateCcw size={13} />} {move.label}
          </button>
        ))}
        {inquiry.email && (
          <a className="icon-button" title="Reply by email" href={`mailto:${inquiry.email}?subject=${encodeURIComponent("Re: your enquiry to Brivent")}`}>
            <Mail size={16} />
          </a>
        )}
      </div>
    </article>
  );
}

export function InquiryList({ inquiries, onUpdate }: { inquiries: Inquiry[]; onUpdate: (id: string, status: string) => Promise<void> }) {
  const [busy, setBusy] = useState<string | null>(null);
  const meta = sectionMeta.inquiries;
  const grouped: Record<Status, Inquiry[]> = { new: [], in_progress: [], resolved: [] };
  for (const inquiry of inquiries) grouped[statusOf(inquiry)].push(inquiry);
  const total = inquiries.length || 1;

  async function move(id: string, to: Status) {
    setBusy(id);
    try {
      await onUpdate(id, to);
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="section-block">
      <SectionHero
        icon={meta.icon}
        eyebrow={meta.eyebrow}
        title="Contact enquiries"
        description={meta.blurb}
        tone={meta.tone}
        stats={[
          { label: "Total", value: inquiries.length },
          { label: "New", value: grouped.new.length },
          { label: "In progress", value: grouped.in_progress.length },
          { label: "Resolved", value: grouped.resolved.length },
        ]}
      >
        <div className="pipe" aria-hidden="true">
          <span className="pipe-new" style={{ width: `${(grouped.new.length / total) * 100}%` }} />
          <span className="pipe-progress" style={{ width: `${(grouped.in_progress.length / total) * 100}%` }} />
          <span className="pipe-done" style={{ width: `${(grouped.resolved.length / total) * 100}%` }} />
        </div>
      </SectionHero>

      {inquiries.length === 0 ? (
        <div className="empty">
          <Inbox size={28} />
          <h3>No enquiries yet</h3>
          <p>New messages from the public site will appear here.</p>
        </div>
      ) : (
        <div className="k-board">
          {columns.map((column) => (
            <div className={`k-col k-col-${column.key}`} key={column.key}>
              <div className="k-col-head">
                <span className="k-dot" />
                <div>
                  <strong>{column.label}</strong>
                  <small>{column.hint}</small>
                </div>
                <span className="k-count">{grouped[column.key].length}</span>
              </div>
              <div className="k-stack">
                {grouped[column.key].length === 0 ? (
                  <p className="k-empty">Nothing here</p>
                ) : (
                  grouped[column.key].map((inquiry) => (
                    <InquiryCard
                      key={inquiry.id}
                      inquiry={inquiry}
                      status={column.key}
                      busy={busy === inquiry.id}
                      onMove={(to) => move(inquiry.id, to)}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}