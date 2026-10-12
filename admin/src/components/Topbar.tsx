import { ArrowUpRight, Menu } from "lucide-react";
import { siteUrl } from "../lib/api";
import { Section } from "../types";
import { collectionLabels } from "../schema";

function greeting() {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning." : hour < 17 ? "Good afternoon." : "Good evening.";
}

export function Topbar({ section, onOpenMobile }: { section: Section; onOpenMobile: () => void }) {
  const label = section === "overview" ? "Overview" : section === "inquiries" ? "Inquiries" : collectionLabels[section];
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="icon-button menu-button" onClick={onOpenMobile}>
          <Menu size={21} />
        </button>
        <div>
          <p className="eyebrow">Brivent / {label}</p>
          <h2>{section === "overview" ? greeting() : label}</h2>
        </div>
        <a className="view-site" href={siteUrl} target="_blank" rel="noreferrer">
          View site <ArrowUpRight size={16} />
        </a>
      </div>
    </header>
  );
}