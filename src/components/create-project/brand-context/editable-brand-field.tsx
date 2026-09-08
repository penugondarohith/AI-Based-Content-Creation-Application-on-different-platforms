"use client";

import { useState, useRef } from "react";
import { Pencil, Check, X, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FieldMode = "text" | "textarea" | "tags";

interface EditableBrandFieldProps {
  label: string;
  mode: FieldMode;
  /** For text / textarea mode */
  value?: string;
  /** For tags mode */
  tags?: string[];
  onSave: (value: string | string[]) => void;
}

export function EditableBrandField({
  label,
  mode,
  value = "",
  tags = [],
  onSave,
}: EditableBrandFieldProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [draftTags, setDraftTags] = useState<string[]>(tags);
  const [newTag, setNewTag] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = () => {
    setDraft(value);
    setDraftTags([...tags]);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const cancel = () => setEditing(false);

  const save = () => {
    if (mode === "tags") {
      onSave(draftTags);
    } else {
      onSave(draft);
    }
    setEditing(false);
  };

  const addTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !draftTags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      setDraftTags([...draftTags, trimmed]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setDraftTags(draftTags.filter((_, i) => i !== index));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="group rounded-lg border border-border bg-surface p-4 transition hover:shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-[10px] font-semibold uppercase tracking-wider text-muted">
          {label}
        </h4>
        {!editing ? (
          <button
            type="button"
            onClick={startEdit}
            className="flex items-center gap-1 rounded px-2 py-1 text-[10px] text-muted opacity-0 transition hover:bg-surface-muted hover:text-foreground group-hover:opacity-100"
            aria-label={`Edit ${label}`}
          >
            <Pencil size={11} />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={save}
              className="flex items-center gap-1 rounded bg-primary px-2 py-1 text-[10px] text-white transition hover:bg-primary-strong"
              aria-label={`Save ${label}`}
            >
              <Check size={11} />
              Save
            </button>
            <button
              type="button"
              onClick={cancel}
              className="flex items-center gap-1 rounded px-2 py-1 text-[10px] text-muted transition hover:bg-surface-muted hover:text-foreground"
              aria-label={`Cancel editing ${label}`}
            >
              <X size={11} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-2">
        {!editing ? (
          /* ---- Display mode ---- */
          mode === "tags" ? (
            <div className="flex flex-wrap gap-1.5">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-primary-soft px-2.5 py-1 text-xs text-primary-strong"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted/60 italic">Not set</span>
              )}
            </div>
          ) : (
            <p className="text-sm leading-6 text-foreground">
              {value || (
                <span className="text-muted/60 italic">Not set</span>
              )}
            </p>
          )
        ) : (
          /* ---- Edit mode ---- */
          <AnimatePresence mode="wait">
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              {mode === "text" && (
                <input
                  ref={inputRef}
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              )}

              {mode === "textarea" && (
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm leading-6 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              )}

              {mode === "tags" && (
                <div>
                  <div className="flex flex-wrap gap-1.5">
                    {draftTags.map((tag, i) => (
                      <span
                        key={`${tag}-${i}`}
                        className="inline-flex items-center gap-1 rounded-md bg-primary-soft px-2 py-1 text-xs text-primary-strong"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(i)}
                          className="ml-0.5 rounded p-0.5 transition hover:bg-primary/10"
                          aria-label={`Remove ${tag}`}
                        >
                          <Trash2 size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      placeholder="Add item..."
                      className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      disabled={!newTag.trim()}
                      className="flex items-center gap-1 rounded-lg bg-surface-muted px-2.5 py-1.5 text-xs text-muted transition hover:bg-primary-soft hover:text-primary disabled:opacity-40"
                    >
                      <Plus size={12} />
                      Add
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
