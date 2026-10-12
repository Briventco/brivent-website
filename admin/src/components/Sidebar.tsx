import { LayoutDashboard, LogOut, X } from "lucide-react";
import { User, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { collectionNames, Section } from "../types";
import { collectionLabels } from "../schema";
import { sectionMeta } from "../sectionMeta";

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
  const InboxIcon = sectionMeta.inquiries.icon;
  return (
    <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
      <div className="sidebar-top">
        <a className="brand-lockup" href="/" aria-label="Brivent admin home">
          <img className="brand-logo" src="/logo-reverse.png" alt="Brivent" />
          <span className="brand-tag">Command centre</span>
        </a>
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
        {collectionNames.map((name) => {
          const Icon = sectionMeta[name].icon;
          return (
            <button key={name} className={section === name ? "active" : ""} onClick={() => onNavigate(name)}>
              <Icon size={17} /> {collectionLabels[name]}
              <span className="nav-count">{counts[name] ?? 0}</span>
            </button>
          );
        })}
        <p className="sidebar-label">Inbox</p>
        <button className={section === "inquiries" ? "active" : ""} onClick={() => onNavigate("inquiries")}>
          <InboxIcon size={17} /> Inquiries
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