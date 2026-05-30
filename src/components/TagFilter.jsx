import { X } from "lucide-react";

export default function TagFilter({ tags, activeTag, onTagClick, onClearTag }) {
  if (!activeTag && tags.length === 0) {
    return null;
  }

  return (
    <section className="glass-panel rounded-lg p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-white">标签筛选</h2>
        {activeTag ? (
          <button
            type="button"
            onClick={onClearTag}
            className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300 transition hover:border-cyan/60 hover:text-cyan"
          >
            <X aria-hidden="true" className="h-3.5 w-3.5" />
            清除 {activeTag}
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagClick(tag)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              activeTag === tag
                ? "border-mint/70 bg-mint/20 text-mint shadow-[0_0_18px_rgba(99,230,190,0.1)]"
                : "tag-pill hover:border-mint/60 hover:bg-mint/10 hover:text-mint"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
}
