import { useState } from "react";
import { ArrowUpRight, ChevronRight, Clock, MapPin, Pin, Star, Trash2 } from "lucide-react";
import { RecordData } from "../types";
import { resolveImageUrl } from "../lib/image";

export type ListProps = {
    items: RecordData[];
    onOpen: (item: RecordData) => void;
    onDelete: (item: RecordData) => void;
};

const str = (value: unknown): string => (value === undefined || value === null ? "" : String(value));
const list = (value: unknown): string[] => (Array.isArray(value) ? value.map(String) : []);

function fmtDate(value: unknown): string {
    const text = str(value);
    if (!text) return "";
    const date = new Date(text);
    return Number.isNaN(date.getTime()) ? text : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function Media({ src, alt = "", className = "" }: { src: unknown; alt?: string; className?: string }) {
    const [broken, setBroken] = useState(false);
    const url = resolveImageUrl(src);
    if (!url || broken) {
        return (
            <div className={`media-fallback ${className}`}>
                <img src="/logo-mark.png" alt="" />
            </div>
        );
    }
    return <img className={className} src={url} alt={alt} loading="lazy" onError={() => setBroken(true)} />;
}

function DeleteButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="icon-button danger-icon"
            title="Delete"
            onClick={(event) => {
                event.stopPropagation();
                onClick();
            }}
        >
            <Trash2 size={16} />
        </button>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (!status) return null;
    return <span className={`badge badge-${status.toLowerCase().replace(/\s+/g, "-")}`}>{status}</span>;
}

/* ---------------- Products: showcase cards ---------------- */
export function ProductGrid({ items, onOpen, onDelete }: ListProps) {
    return (
        <div className="p-grid">
            {items.map((item) => (
                <article className="p-card" key={str(item.slug)} onClick={() => onOpen(item)}>
                    <div className="p-media">
                        <Media key={str(item.image)} src={item.image} alt={str(item.name)} />
                        <StatusBadge status={str(item.status)} />
                    </div>
                    <div className="p-body">
                        {str(item.category) && <span className="chip">{str(item.category)}</span>}
                        <h4>{str(item.name) || "Untitled"}</h4>
                        <p className="clamp-2">{str(item.tagline) || str(item.description) || "No description yet."}</p>
                    </div>
                    <div className="card-foot">
                        <span className="slug">/{str(item.slug)}</span>
                        <span className="order-tag">#{str(item.order) || "-"}</span>
                        <DeleteButton onClick={() => onDelete(item)} />
                    </div>
                </article>
            ))}
        </div>
    );
}

/* ---------------- Blog: editorial rows ---------------- */
export function BlogList({ items, onOpen, onDelete }: ListProps) {
    return (
        <div className="b-list">
            {items.map((item) => (
                <article className="b-row" key={str(item.slug)} onClick={() => onOpen(item)}>
                    <div className="b-cover">
                        <Media key={str(item.coverImage)} src={item.coverImage} alt={str(item.title)} />
                    </div>
                    <div className="b-body">
                        <div className="b-meta">
                            {str(item.category) && <span className="chip">{str(item.category)}</span>}
                            {item.pinned ? (
                                <span className="pin">
                                    <Pin size={12} /> Pinned
                                </span>
                            ) : null}
                            {fmtDate(item.publishedAt) && (
                                <span className="when">
                                    <Clock size={12} /> {fmtDate(item.publishedAt)}
                                </span>
                            )}
                        </div>
                        <h4>{str(item.title) || "Untitled"}</h4>
                        <p className="clamp-2">{str(item.excerpt) || "No excerpt yet."}</p>
                        <div className="b-author">
                            {str(item.author) ? `By ${str(item.author)}` : "No author"} · <span className="slug">/{str(item.slug)}</span>
                        </div>
                    </div>
                    <div className="row-actions">
                        <DeleteButton onClick={() => onDelete(item)} />
                        <ChevronRight size={18} className="record-chevron" />
                    </div>
                </article>
            ))}
        </div>
    );
}

/* ---------------- Work: portfolio tiles ---------------- */
export function WorkGrid({ items, onOpen, onDelete }: ListProps) {
    return (
        <div className="w-grid">
            {items.map((item) => {
                const tech = list(item.technology);
                return (
                    <article className="w-tile" key={str(item.slug)} onClick={() => onOpen(item)}>
                        <Media key={str(item.image)} src={item.image} alt={str(item.title)} className="w-img" />
                        <div className="w-overlay" />
                        <div className="w-delete">
                            <DeleteButton onClick={() => onDelete(item)} />
                        </div>
                        <div className="w-info">
                            {str(item.category) && <span className="chip chip-light">{str(item.category)}</span>}
                            <h4>{str(item.title) || "Untitled"}</h4>
                            <p className="clamp-2">{str(item.description) || str(item.outcome)}</p>
                            {tech.length > 0 && (
                                <div className="w-tech">
                                    {tech.slice(0, 4).map((name) => (
                                        <span key={name}>{name}</span>
                                    ))}
                                    {tech.length > 4 && <span>+{tech.length - 4}</span>}
                                </div>
                            )}
                        </div>
                    </article>
                );
            })}
        </div>
    );
}

/* ---------------- Team: people cards ---------------- */
export function TeamGrid({ items, onOpen, onDelete }: ListProps) {
    return (
        <div className="t-grid">
            {items.map((item) => (
                <article className="t-card" key={str(item.slug)} onClick={() => onOpen(item)}>
                    <div className="t-actions">
                        <DeleteButton onClick={() => onDelete(item)} />
                    </div>
                    <div className="t-photo">
                        <Media key={str(item.photo)} src={item.photo} alt={str(item.name)} />
                        {item.isEarlyBuilder ? (
                            <span className="t-star" title="Early builder">
                                <Star size={12} fill="currentColor" />
                            </span>
                        ) : null}
                    </div>
                    <h4>{str(item.name) || "Unnamed"}</h4>
                    <p className="t-role">{str(item.role) || "No role set"}</p>
                    {str(item.department) && <span className="chip">{str(item.department)}</span>}
                </article>
            ))}
        </div>
    );
}

/* ---------------- Careers: role rows ---------------- */
export function CareerList({ items, onOpen, onDelete }: ListProps) {
    return (
        <div className="c-list">
            <div className="c-head">
                <span>Role</span>
                <span>Location</span>
                <span>Type</span>
                <span>Apply</span>
                <span />
            </div>
            {items.map((item) => (
                <article className="c-row" key={str(item.slug)} onClick={() => onOpen(item)}>
                    <div className="c-title">
                        <strong>{str(item.title) || "Untitled"}</strong>
                        <span>{str(item.department) || "No department"}</span>
                    </div>
                    <span className="c-cell">
                        <MapPin size={13} /> {str(item.location) || "Remote"}
                    </span>
                    <span className="c-cell">
                        <span className="chip">{str(item.employmentType) || "Full-time"}</span>
                    </span>
                    <span className="c-cell c-apply">
                        {str(item.applyUrl) ? (
                            <>
                                <ArrowUpRight size={13} /> {str(item.applyUrl)}
                            </>
                        ) : (
                            "Not set"
                        )}
                    </span>
                    <span className="row-actions">
                        <DeleteButton onClick={() => onDelete(item)} />
                        <ChevronRight size={18} className="record-chevron" />
                    </span>
                </article>
            ))}
        </div>
    );
}