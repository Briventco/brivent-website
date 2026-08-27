import { FileJson, Inbox, LayoutDashboard, LogOut, X } from "lucide-react";
import { User, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { collectionNames, Section } from "../types";
import { collectionLabels } from "../schema";

export function Sidebar({
  user,
  section,
  counts,
  mobileNav,
  onNavigate,
  onCloseMobile,
}: {
  user: User;
  section: Section;
  counts: Record<string, number>;
  mobileNav: boolean;
  onNavigate: (section: Section) => void;
  onCloseMobile: () => void;
}) {
  return (
    <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
      <div className="sidebar-top">
        <div className="brand-mark">
          B<span>/</span>
        </div>
        <button className="icon-button mobile-close" onClick={onCloseMobile}>
          <X size={19} />
        </button>
      </div>
      <p className="sidebar-label">Workspace</p>
      <nav>
        <button className={section === "overview" ? "active" : ""} onClick={() => onNavigate("overview")}>
          <LayoutDashboard size={17} /> Overview
        </button>
        <p className="sidebar-label">Content</p>
        {collectionNames.map((name) => (
          <button key={name} className={section === name ? "active" : ""} onClick={() => onNavigate(name)}>
            <FileJson size={17} /> {collectionLabels[name]}
            <span className="nav-count">{counts[name] ?? 0}</span>
          </button>
        ))}
        <button className={section === "inquiries" ? "active" : ""} onClick={() => onNavigate("inquiries")}>
          <Inbox size={17} /> Inquiries
          <span className="nav-count">{counts.inquiries ?? 0}</span>
        </button>
      </nav>
      <div className="sidebar-user">
        <div className="avatar">{(user.email || "A")[0].toUpperCase()}</div>
        <div>
          <strong>{user.email?.split("@")[0]}</strong>
          <small>Administrator</small>
        </div>
        <button className="icon-button" title="Sign out" onClick={() => signOut(auth)}>
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
