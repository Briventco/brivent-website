import { useEffect } from "react";
import { AlertTriangle, Check, X } from "lucide-react";

export type ToastState = { message: string; tone: "success" | "error" } | null;

export function Toast({ toast, onDismiss }: { toast: ToastState; onDismiss: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;
  return (
    <div className={`notice ${toast.tone === "error" ? "notice-error" : ""}`}>
      {toast.tone === "error" ? <AlertTriangle size={16} /> : <Check size={16} />} {toast.message}
      <button onClick={onDismiss} aria-label="Dismiss">
        <X size={15} />
      </button>
    </div>
  );
}
