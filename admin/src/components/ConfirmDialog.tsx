import { AlertTriangle } from "lucide-react";

export type ConfirmState = { title: string; body: string; onConfirm: () => void } | null;

export function ConfirmDialog({ state, onCancel }: { state: ConfirmState; onCancel: () => void }) {
  if (!state) return null;
  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <div className="dialog" onClick={(event) => event.stopPropagation()}>
        <AlertTriangle size={22} className="dialog-icon" />
        <h3>{state.title}</h3>
        <p>{state.body}</p>
        <div className="dialog-actions">
          <button className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="danger-button"
            onClick={() => {
              state.onConfirm();
              onCancel();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
