import { ReactNode } from "react";
import { ArrowUpRight, ChevronRight, Inbox, Layers, LucideIcon, Package, PenLine, Users } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Collection, Inquiry, Insights, RecordData, Section, collectionNames } from "../types";
import { collectionLabels } from "../schema";
import { sectionMeta } from "../sectionmeta"
  ;
import { siteUrl } from "../lib/api";

/* Brivent palette: Persian Blue, tints, Deep Gulf Blue, and Flamingo used sparingly */
const BLUE = "#152bf9";
const MIX_COLORS: Record<Collection, string> = {
  products: "#152bf9",
  blogPosts: "#5b6bff",
  work: "#9aa4ff",
  team: "#03032d",
  careers: "#ff110b",
};
const AXIS_TICK = { fontSize: 11, fill: "#94a3b8" };

const today = new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });

type Slice = { name: string; value: number; color?: string };

/* ---------- data helpers ---------- */
function toDate(value: Inquiry["createdAt"]): Date | null {
  if (!value) return null;
  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  const seconds = value._seconds ?? (value as { seconds?: number }).seconds;
  return seconds ? new Date(seconds * 1000) : null;
}

function startOfWeek(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - ((copy.getDay() + 6) % 7));
  return copy;
}

function weeklyBuckets(inquiries: Inquiry[], weeks = 8) {
  const first = startOfWeek(new Date());
  const buckets = Array.from({ length: weeks }, (_, index) => {
    const start = new Date(first);
    start.setDate(start.getDate() - 7 * (weeks - 1 - index));
    return { start, label: start.toLocaleDateString(undefined, { month: "short", day: "numeric" }), count: 0 };
  });
  for (const inquiry of inquiries) {
    const date = toDate(inquiry.createdAt);
    if (!date) continue;
    for (let i = buckets.length - 1; i >= 0; i--) {
      if (date >= buckets[i].start) {
        buckets[i].count += 1;
        break;
      }
    }
  }
  return buckets.map(({ label, count }) => ({ label, count }));
}

function tally(items: RecordData[], key: string, fallback = "Other"): Slice[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    const name = String(item[key] ?? "").trim() || fallback;
    counts.set(name, (counts.get(name) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

/* ---------- chart pieces ---------- */
type TipProps = {
  active?: boolean;
  payload?: ReadonlyArray<{ name?: string | number; value?: number | string; payload?: { name?: string } }>;
  label?: string | number;
};

function ChartTip({ active, payload, label }: TipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const row = payload[0];
  return (
    <div className="chart-tip">
      <span>{label ?? row.payload?.name ?? row.name}</span>
      <strong>{row.value}</strong>
    </div>
  );
}

function ChartCard({ title, subtitle, className = "", children }: { title: string; subtitle: string; className?: string; children: ReactNode }) {
  return (
    <section className={`chart-card ${className}`}>
      <div className="chart-head">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

function ChartEmpty({ loading }: { loading: boolean }) {
  return <div className="chart-empty">{loading ? "Loading data..." : "Nothing to chart yet"}</div>;
}

function Donut({ data, total, label, loading }: { data: Slice[]; total: number; label: string; loading: boolean }) {
  if (total === 0) return <ChartEmpty loading={loading} />;
  return (
    <div className="chart-box donut-box">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius="64%" outerRadius="92%" paddingAngle={3} cornerRadius={6} stroke="none">
            {data.map((slice) => (
              <Cell key={slice.name} fill={slice.color || BLUE} />
            ))}
          </Pie>
          <Tooltip content={<ChartTip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="donut-center">
        <strong>{total}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function Legend({ data, onClick }: { data: Slice[]; onClick?: (name: string) => void }) {
  return (
    <ul className="legend">
      {data.map((slice) => (
        <li key={slice.name}>
          <button type="button" onClick={() => onClick?.(slice.name)} disabled={!onClick}>
            <i style={{ background: slice.color || BLUE }} />
            <span>{slice.name}</span>
            <b>{slice.value}</b>
          </button>
        </li>
      ))}
    </ul>
  );
}

function HBars({ data, loading }: { data: Slice[]; loading: boolean }) {
  if (data.length === 0) return <ChartEmpty loading={loading} />;
  return (
    <div className="chart-box">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 4, right: 16, top: 4, bottom: 4 }}>
          <XAxis type="number" hide allowDecimals={false} />
          <YAxis type="category" dataKey="name" width={104} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
          <Tooltip content={<ChartTip />} cursor={{ fill: "rgba(21,43,249,.06)" }} />
          <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={16} fill={BLUE} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Metric({ label, value, note, icon: Icon, onClick }: { label: string; value: number; note: string; icon: LucideIcon; onClick?: () => void }) {
  return (
    <button type="button" className="metric" onClick={onClick}>
      <div className="metric-top">
        <span>{label}</span>
        <i className="metric-icon">
          <Icon size={16} />
        </i>
      </div>
      <strong>{value}</strong>
      <small>{note}</small>
    </button>
  );
}

/* ---------- page ---------- */
export function Overview({
  counts,
  insights,
  onNavigate,
}: {
  counts: Record<string, number>;
  insights: Insights | null;
  onNavigate: (section: Section) => void;
}) {
  const loading = insights === null;
  const inquiries = insights?.inquiries ?? [];
  const products = insights?.collections.products ?? [];
  const blogPosts = insights?.collections.blogPosts ?? [];
  const team = insights?.collections.team ?? [];

  const total = collectionNames.reduce((sum, key) => sum + (counts[key] || 0), 0);
  const statusCount = (status: string) => inquiries.filter((item) => (item.status || "new") === status).length;
  const openEnquiries = loading ? counts.inquiries || 0 : statusCount("new") + statusCount("in_progress");
  const liveProducts = products.filter((item) => String(item.status).toLowerCase() === "live").length;

  const mix: Slice[] = collectionNames.map((key) => ({ name: collectionLabels[key], value: counts[key] || 0, color: MIX_COLORS[key] }));
  const pipeline: Slice[] = [
    { name: "New", value: statusCount("new"), color: "#ff110b" },
    { name: "In progress", value: statusCount("in_progress"), color: "#152bf9" },
    { name: "Resolved", value: statusCount("resolved"), color: "#9aa4ff" },
  ];
  const weekly = weeklyBuckets(inquiries);
  const weeklyTotal = weekly.reduce((sum, bucket) => sum + bucket.count, 0);

  return (
    <>
      <section className="welcome">
        <img className="welcome-mark" src="/logo-mark-reverse.png" alt="" aria-hidden="true" />
        <div>
          <p className="eyebrow">{today}</p>
          <h1>The work is in your hands.</h1>
          <p className="muted">A clear view of the content and conversations shaping Brivent.</p>
        </div>
        <div className="welcome-actions">
          <button className="hero-button" onClick={() => onNavigate("blogPosts")}>
            <PenLine size={15} /> Write a post
          </button>
          <button className="hero-button ghost" onClick={() => onNavigate("inquiries")}>
            <Inbox size={15} /> Review enquiries
          </button>
        </div>
      </section>

      <div className="metric-grid">
        <Metric label="Published content" value={total} note={`across ${collectionNames.length} collections`} icon={Layers} onClick={() => onNavigate("products")} />
        <Metric label="Open enquiries" value={openEnquiries} note={openEnquiries === 0 ? "Inbox is clear" : "Waiting on a reply"} icon={Inbox} onClick={() => onNavigate("inquiries")} />
        <Metric label="Live products" value={loading ? counts.products || 0 : liveProducts} note="Visible on the site" icon={Package} onClick={() => onNavigate("products")} />
        <Metric label="Team members" value={counts.team || 0} note="Building Brivent" icon={Users} onClick={() => onNavigate("team")} />
      </div>

      <div className="chart-grid-top">
        <ChartCard title="Content mix" subtitle="Published records by collection">
          <Donut data={mix} total={total} label="records" loading={loading && total === 0} />
          <Legend data={mix} onClick={(name) => onNavigate(collectionNames.find((key) => collectionLabels[key] === name) || "products")} />
        </ChartCard>

        <ChartCard title="Enquiries over time" subtitle="New messages per week, last 8 weeks">
          {loading || weeklyTotal === 0 ? (
            <ChartEmpty loading={loading} />
          ) : (
            <div className="chart-box tall">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekly} margin={{ left: -8, right: 8, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="enquiryFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={BLUE} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={BLUE} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#e7e9f0" strokeDasharray="4 4" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={AXIS_TICK} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={AXIS_TICK} width={36} />
                  <Tooltip content={<ChartTip />} />
                  <Area type="monotone" dataKey="count" stroke={BLUE} strokeWidth={2.5} fill="url(#enquiryFill)" activeDot={{ r: 5, fill: BLUE, stroke: "#fff", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>
      </div>

      <div className="chart-grid-bottom">
        <ChartCard title="Enquiry pipeline" subtitle="Where every message stands">
          <Donut data={pipeline} total={inquiries.length} label="enquiries" loading={loading} />
          <Legend data={pipeline} />
        </ChartCard>
        <ChartCard title="Blog by category" subtitle="Posts per topic">
          <HBars data={tally(blogPosts, "category")} loading={loading} />
        </ChartCard>
        <ChartCard title="Team by department" subtitle="Who is building what">
          <HBars data={tally(team, "department")} loading={loading} />
        </ChartCard>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Content map</p>
            <h3>Jump to a collection</h3>
          </div>
          <span className="muted">Select a collection to edit</span>
        </div>
        <div className="collection-grid">
          {collectionNames.map((key) => {
            const Icon = sectionMeta[key].icon;
            return (
              <button className="collection-card" key={key} onClick={() => onNavigate(key)}>
                <span className="card-icon">
                  <Icon size={18} />
                </span>
                <strong>{collectionLabels[key]}</strong>
                <span className="card-meta">
                  {counts[key] || 0} records <ChevronRight size={15} />
                </span>
              </button>
            );
          })}
          <button className="collection-card card-link" onClick={() => window.open(siteUrl, "_blank", "noreferrer")}>
            <span className="card-icon">
              <ArrowUpRight size={18} />
            </span>
            <strong>View live site</strong>
            <span className="card-meta">
              See your changes <ChevronRight size={15} />
            </span>
          </button>
        </div>
      </section>
    </>
  );
}