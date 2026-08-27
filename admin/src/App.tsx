import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { RefreshCw } from "lucide-react";
import { auth } from "./lib/firebase";
import { api } from "./lib/api";
import { Collection, Inquiry, RecordData, Section } from "./types";
import { titleFor } from "./schema";
import { Login } from "./components/Login";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Overview } from "./components/Overview";
import { CollectionView } from "./components/CollectionView";
import { InquiryList } from "./components/InquiryList";
import { Toast, ToastState } from "./components/Toast";
import { ConfirmDialog, ConfirmState } from "./components/ConfirmDialog";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => onAuthStateChanged(auth, (next) => { setUser(next); setLoading(false); }), []);
  if (loading) return <div className="loading-screen"><RefreshCw className="spin" /> Loading workspace</div>;
  return user ? <Dashboard user={user} /> : <Login />;
}

function Dashboard({ user }: { user: User }) {
  const [section, setSection] = useState<Section>("overview");
  const [items, setItems] = useState<RecordData[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<RecordData | null>(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<ToastState>(null);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [loadingSection, setLoadingSection] = useState(false);

  async function token() {
    return user.getIdToken();
  }

  function notifyError(error: unknown) {
    setToast({ message: error instanceof Error ? error.message : "Something went wrong.", tone: "error" });
  }

  async function refresh() {
    setLoadingSection(true);
    try {
      const authToken = await token();
      const summary = await api.summary(authToken);
      setCounts(summary.counts);
      if (section === "inquiries") setInquiries(await api.inquiries(authToken));
      else if (section !== "overview") setItems(await api.list(authToken, section as Collection));
    } catch (error) {
      notifyError(error);
    } finally {
      setLoadingSection(false);
    }
  }

  useEffect(() => {
    setSelected(null);
    setQuery("");
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  async function save(data: RecordData) {
    const slug = String(data.slug || "").trim();
    if (!slug) throw new Error("Every item needs a slug.");
    const authToken = await token();
    await api.save(authToken, section as Collection, slug, data);
    setSelected(null);
    setToast({ message: "Saved and published", tone: "success" });
    await refresh();
  }

  function requestDelete(item: RecordData) {
    setConfirm({
      title: `Delete ${titleFor(item)}?`,
      body: "This removes it from the live site immediately. This can't be undone.",
      onConfirm: async () => {
        try {
          await api.remove(await token(), section as Collection, String(item.slug));
          setToast({ message: "Item deleted", tone: "success" });
          await refresh();
        } catch (error) {
          notifyError(error);
        }
      },
    });
  }

  async function updateInquiry(id: string, status: string) {
    try {
      await api.updateInquiry(await token(), id, status);
      setToast({ message: "Inquiry updated", tone: "success" });
      await refresh();
    } catch (error) {
      notifyError(error);
    }
  }

  function exportItems() {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${section}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function importItems(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || section === "overview" || section === "inquiries") return;
    try {
      const parsed = JSON.parse(await file.text());
      const values = Array.isArray(parsed) ? parsed : [parsed];
      for (const value of values) await save(value);
      setToast({ message: `${values.length} item(s) imported`, tone: "success" });
    } catch (error) {
      notifyError(error);
    }
  }

  const filtered = items.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="app-shell">
      <Sidebar
        user={user}
        section={section}
        counts={counts}
        mobileNav={mobileNav}
        onNavigate={(next) => {
          setSection(next);
          setMobileNav(false);
        }}
        onCloseMobile={() => setMobileNav(false)}
      />
      <div className="main-area">
        <Topbar section={section} onOpenMobile={() => setMobileNav(true)} />
        <main className="content">
          <Toast toast={toast} onDismiss={() => setToast(null)} />
          {section === "overview" ? (
            <Overview counts={counts} onNavigate={setSection} />
          ) : section === "inquiries" ? (
            <InquiryList inquiries={inquiries} onUpdate={updateInquiry} />
          ) : (
            <CollectionView
              collection={section}
              items={filtered}
              loading={loadingSection}
              query={query}
              setQuery={setQuery}
              selected={selected}
              setSelected={setSelected}
              onSave={save}
              onDelete={requestDelete}
              onRefresh={refresh}
              onExport={exportItems}
              onImport={importItems}
            />
          )}
        </main>
      </div>
      <ConfirmDialog state={confirm} onCancel={() => setConfirm(null)} />
    </div>
  );
}

export default App;
