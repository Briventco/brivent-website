import { Activity, ChevronRight } from "lucide-react";
import { Collection, collectionNames } from "../types";
import { collectionLabels } from "../schema";

const today = new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });

export function Overview({ counts, onNavigate }: { counts: Record<string, number>; onNavigate: (section: Collection) => void }) {
  const total = collectionNames.reduce((sum, key) => sum + (counts[key] || 0), 0);
  return (
    <>
      <section className="welcome">
        <div>
          <p className="eyebrow">{today}</p>
          <h1>The work is in your hands.</h1>
          <p className="muted">A clear view of the content and conversations shaping Brivent.</p>
        </div>
        <Activity size={45} strokeWidth={1.2} />
      </section>
      <div className="metric-grid">
        <Metric label="Published content" value={total} />
        <Metric label="Open enquiries" value={counts.inquiries || 0} />
        <Metric label="Collections" value={collectionNames.length} />
      </div>
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Content map</p>
            <h3>Collections</h3>
          </div>
          <span className="muted">Select a collection to edit</span>
        </div>
        <div className="collection-grid">
          {collectionNames.map((key, index) => (
            <button className="collection-card" key={key} onClick={() => onNavigate(key)}>
              <span className="card-index">0{index + 1}</span>
              <strong>{collectionLabels[key]}</strong>
              <span>
                {counts[key] || 0} records <ChevronRight size={15} />
              </span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>Live now</small>
    </div>
  );
}
