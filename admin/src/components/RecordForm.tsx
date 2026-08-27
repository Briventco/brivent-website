import { useState } from "react";
import { ImageOff, Save, UploadCloud, X, ZoomIn } from "lucide-react";
import { Collection, FieldSchema, RecordData } from "../types";
import { schemas, titleField } from "../schema";
import { slugify } from "../lib/slug";
import { api, siteUrl } from "../lib/api";
import { auth } from "../lib/firebase";

function resolveImageUrl(value: string): string {
  if (!value) return "";
  if (/^(https?:)?\/\//.test(value) || value.startsWith("data:")) return value;
  return `${siteUrl}${value.startsWith("/") ? "" : "/"}${value}`;
}

function TagsInput({ value, onChange }: { value: string[]; onChange: (next: string[]) => void }) {
  const [draft, setDraft] = useState("");
  function commit() {
    const next = draft.trim();
    if (next) onChange([...value, next]);
    setDraft("");
  }
  return (
    <div className="tags-input">
      {value.map((tag, index) => (
        <span className="tag-pill" key={`${tag}-${index}`}>
          {tag}
          <button type="button" onClick={() => onChange(value.filter((_, i) => i !== index))}>
            <X size={11} />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            commit();
          } else if (event.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={commit}
        placeholder="Type and press Enter"
      />
    </div>
  );
}

function ImageField({ collection, value, onChange }: { collection: Collection; value: string; onChange: (next: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [lightbox, setLightbox] = useState(false);
  const [broken, setBroken] = useState(false);
  const resolved = resolveImageUrl(value);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("You need to be signed in to upload.");
      const url = await api.upload(token, file, collection);
      setBroken(false);
      onChange(url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="image-field">
      <button
        type="button"
        className="image-preview"
        onClick={() => value && !broken && setLightbox(true)}
        disabled={!value || broken}
        title={value ? (broken ? "Image failed to load" : "View full size") : undefined}
      >
        {value && !broken ? (
          <>
            <img key={resolved} src={resolved} alt="" onError={() => setBroken(true)} onLoad={() => setBroken(false)} />
            <span className="image-preview-zoom">
              <ZoomIn size={14} />
            </span>
          </>
        ) : (
          <ImageOff size={16} />
        )}
      </button>
      <div className="image-field-body">
        <input
          type="text"
          value={value}
          onChange={(event) => {
            setBroken(false);
            onChange(event.target.value);
          }}
          placeholder="Upload a file, or paste a full image URL"
        />
        <label className={`secondary-button compact upload-button ${uploading ? "is-uploading" : ""}`}>
          {uploading ? "Uploading..." : (
            <>
              <UploadCloud size={14} /> Upload
            </>
          )}
          <input type="file" accept="image/*" hidden onChange={handleFile} disabled={uploading} />
        </label>
      </div>
      {value && broken && <p className="error">Couldn't load this image — the path doesn't resolve to a real file. Try Upload instead.</p>}
      {error && <p className="error">{error}</p>}
      {lightbox && (
        <div className="dialog-backdrop" onClick={() => setLightbox(false)}>
          <img src={resolved} alt="" className="lightbox-image" onClick={(event) => event.stopPropagation()} />
          <button className="icon-button lightbox-close" onClick={() => setLightbox(false)}>
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

function Field({ collection, field, value, onChange }: { collection: Collection; field: FieldSchema; value: unknown; onChange: (next: unknown) => void }) {
  const wide = field.type === "textarea" || field.type === "image";
  return (
    <label className={`form-field ${wide ? "form-field-wide" : ""}`}>
      <span>
        {field.label}
        {field.required && <em>*</em>}
      </span>
      {field.type === "textarea" ? (
        <textarea value={String(value ?? "")} onChange={(event) => onChange(event.target.value)} rows={4} />
      ) : field.type === "boolean" ? (
        <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
      ) : field.type === "number" ? (
        <input
          type="number"
          value={value === undefined || value === null || value === "" ? "" : String(value)}
          onChange={(event) => onChange(event.target.value === "" ? "" : Number(event.target.value))}
        />
      ) : field.type === "select" ? (
        <select value={String(value ?? "")} onChange={(event) => onChange(event.target.value)}>
          <option value="">Select...</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "tags" ? (
        <TagsInput value={Array.isArray(value) ? value.map(String) : []} onChange={onChange} />
      ) : field.type === "image" ? (
        <ImageField collection={collection} value={String(value ?? "")} onChange={onChange} />
      ) : (
        <input type={field.type === "url" ? "url" : "text"} value={String(value ?? "")} onChange={(event) => onChange(event.target.value)} required={field.required} />
      )}
      {field.hint && <small>{field.hint}</small>}
    </label>
  );
}

export function RecordForm({
  collection,
  value,
  onCancel,
  onSave,
}: {
  collection: Collection;
  value: RecordData;
  onCancel: () => void;
  onSave: (value: RecordData) => Promise<void>;
}) {
  const isNew = !value.slug;
  const [data, setData] = useState<RecordData>(value);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const fields = schemas[collection];

  function setField(key: string, next: unknown) {
    setData((prev) => ({ ...prev, [key]: next }));
  }

  async function submit() {
    setError("");
    const source = titleField[collection];
    const slug = isNew ? slugify(String(data[source] || "")) : String(data.slug || "");
    if (!slug) {
      setError(`Enter a ${source} before saving — it's used to generate the URL.`);
      return;
    }
    setSaving(true);
    try {
      await onSave({ ...data, slug });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="editor">
      <div className="editor-head">
        <div>
          <p className="eyebrow">{isNew ? "New document" : "Document editor"}</p>
          <h3>{isNew ? "New item" : titleFieldValue(data, collection)}</h3>
          {!isNew && <p className="editor-slug">/{String(data.slug)}</p>}
        </div>
        <button className="icon-button" onClick={onCancel}>
          <X size={18} />
        </button>
      </div>

      <div className="form-grid">
        {fields.map((field) => (
          <Field key={field.key} collection={collection} field={field} value={data[field.key]} onChange={(next) => setField(field.key, next)} />
        ))}
      </div>

      {error && <p className="error">{error}</p>}
      <div className="editor-actions">
        <button className="secondary-button" onClick={onCancel}>
          Cancel
        </button>
        <button className="primary-button" onClick={submit} disabled={saving}>
          <Save size={16} /> {saving ? "Saving..." : "Save & publish"}
        </button>
      </div>
    </div>
  );
}

function titleFieldValue(data: RecordData, collection: Collection): string {
  return String(data[titleField[collection]] || "Untitled");
}
