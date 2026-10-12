import { ComponentType } from "react";
import { FileJson, Plus, RefreshCw, Search, Upload } from "lucide-react";
import { Collection, RecordData } from "../types";
import { collectionLabels, collectionSingular } from "../schema";
import { sectionMeta } from "../sectionmeta";
import { RecordForm } from "./RecordForm";
import { HeroStat, SectionHero } from "./SectionHero";
import { BlogList, CareerList, ListProps, ProductGrid, TeamGrid, WorkGrid } from "./CollectionLists";

const views: Record<Collection, ComponentType<ListProps>> = {
  products: ProductGrid,
  blogPosts: BlogList,
  work: WorkGrid,
  team: TeamGrid,
  careers: CareerList,
};

const text = (value: unknown) => (value === undefined || value === null ? "" : String(value).trim());

function heroStats(collection: Collection, all: RecordData[]): HeroStat[] {
  const count = (test: (item: RecordData) => boolean) => all.filter(test).length;
  const unique = (key: string) => new Set(all.map((item) => text(item[key])).filter(Boolean)).size;
  switch (collection) {
    case "products":
      return [
        { label: "Products", value: all.length },
        { label: "Live", value: count((i) => text(i.status).toLowerCase() === "live") },
        { label: "Upcoming", value: count((i) => ["beta", "coming soon"].includes(text(i.status).toLowerCase())) },
      ];
    case "blogPosts":
      return [
        { label: "Posts", value: all.length },
        { label: "Pinned", value: count((i) => Boolean(i.pinned)) },
        { label: "Categories", value: unique("category") },
      ];
    case "work": {
      const tech = new Set(all.flatMap((i) => (Array.isArray(i.technology) ? i.technology.map(String) : [])));
      return [
        { label: "Case studies", value: all.length },
        { label: "Categories", value: unique("category") },
        { label: "Technologies", value: tech.size },
      ];
    }
    case "team":
      return [
        { label: "Members", value: all.length },
        { label: "Departments", value: unique("department") },
        { label: "Early builders", value: count((i) => Boolean(i.isEarlyBuilder)) },
      ];
    case "careers":
      return [
        { label: "Open roles", value: all.length },
        { label: "Departments", value: unique("department") },
        { label: "Locations", value: unique("location") },
      ];
  }
}

export function CollectionView({
  collection,
  items,
  allItems,
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
  allItems: RecordData[];
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
  const meta = sectionMeta[collection];
  const View = views[collection];
  const EmptyIcon = meta.icon;

  return (
    <section className="section-block">
      <SectionHero
        icon={meta.icon}
        eyebrow={meta.eyebrow}
        title={label}
        description={meta.blurb}
        tone={meta.tone}
        stats={heroStats(collection, allItems)}
      />

      <div className="toolbar">
        <div className="search">
          <Search size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${label.toLowerCase()}...`} />
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" onClick={onRefresh}>
            <RefreshCw size={16} className={loading ? "spin" : ""} /> Refresh
          </button>
          <button className="secondary-button" onClick={onExport} disabled={allItems.length === 0}>
            <Upload size={16} /> Export
          </button>
          <label className="secondary-button">
            <FileJson size={16} /> Import
            <input type="file" accept="application/json" onChange={onImport} hidden />
          </label>
          <button className="primary-button compact" onClick={() => setSelected({})}>
            <Plus size={16} /> New {collectionSingular[collection]}
          </button>
        </div>
      </div>

      {selected ? (
        <RecordForm collection={collection} value={selected} onCancel={() => setSelected(null)} onSave={onSave} />
      ) : loading && allItems.length === 0 ? (
        <div className="skeleton-grid">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <div className="skeleton" key={n} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="empty">
          <EmptyIcon size={28} />
          <h3>{query ? "Nothing matches your search" : `No ${collectionSingular[collection]}s yet`}</h3>
          <p>{query ? "Try a different word, or clear the search." : "Create the first one or import a JSON file."}</p>
        </div>
      ) : (
        <View items={items} onOpen={setSelected} onDelete={onDelete} />
      )}
    </section>
  );
}