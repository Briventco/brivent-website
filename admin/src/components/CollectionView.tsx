import { ChevronRight, FileJson, Plus, RefreshCw, Search, Trash2, Upload } from "lucide-react";
import { Collection, RecordData } from "../types";
import { collectionLabels, collectionSingular, titleFor } from "../schema";
import { RecordForm } from "./RecordForm";

export function CollectionView({
  collection,
  items,
  loading,
  query,
  setQuery,
  selected,
  setSelected,
  onSave,
  onDelete,
  onRefresh,
  onExport,
  onImport,
}: {
  collection: Collection;
  items: RecordData[];
  loading: boolean;
  query: string;
  setQuery: (value: string) => void;
  selected: RecordData | null;
  setSelected: (value: RecordData | null) => void;
  onSave: (value: RecordData) => Promise<void>;
  onDelete: (value: RecordData) => void;
  onRefresh: () => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const label = collectionLabels[collection];
  return (
    <section className="section-block">
      <div className="toolbar">
        <div className="search">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${label.toLowerCase()}...`} />
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" onClick={onRefresh}>
            <RefreshCw size={16} className={loading ? "spin" : ""} /> Refresh
          </button>
          <button className="secondary-button" onClick={onExport} disabled={items.length === 0}>
            <Upload size={16} /> Export
          </button>
          <label className="secondary-button">
            <FileJson size={16} /> Import
            <input type="file" accept="application/json" onChange={onImport} hidden />
          </label>
          <button className="primary-button compact" onClick={() => setSelected({})}>
            <Plus size={16} /> New
          </button>
        </div>
      </div>
      {selected ? (
        <RecordForm collection={collection} value={selected} onCancel={() => setSelected(null)} onSave={onSave} />
      ) : loading ? (
        <div className="empty">
          <RefreshCw size={28} className="spin" />
          <h3>Loading {label.toLowerCase()}...</h3>
        </div>
      ) : (
        <div className="records">
          {items.length === 0 ? (
            <div className="empty">
              <FileJson size={28} />
              <h3>No {collectionSingular[collection]}s yet</h3>
              <p>Create the first one or import a JSON file.</p>
            </div>
          ) : (
            items.map((item) => (
              <article className="record" key={String(item.slug)} onClick={() => setSelected(item)}>
                <div className="record-number">{String(item.order ?? "—")}</div>
                <div className="record-body">
                  <strong>{titleFor(item)}</strong>
                  <span>
                    {String(item.slug || "No slug")}
                    {item.status ? (
                      <span className={`badge badge-${String(item.status).toLowerCase().replace(/\s+/g, "-")}`}>{String(item.status)}</span>
                    ) : null}
                  </span>
                </div>
                <button
                  className="icon-button danger-icon"
                  title="Delete"
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(item);
                  }}
                >
                  <Trash2 size={16} />
                </button>
                <ChevronRight size={18} className="record-chevron" />
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}
