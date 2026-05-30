import { Copy, Star } from "lucide-react";

export default function PromptCard({
  prompt,
  isSelected,
  isFavorite,
  copied,
  onSelect,
  onCopy,
  onToggleFavorite,
  onTagClick,
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className={`soft-card rounded-lg p-4 text-left transition duration-200 ${
        isSelected
          ? "border-cyan/75 shadow-[0_20px_54px_rgba(77,215,247,0.14),inset_0_1px_0_rgba(255,255,255,0.08)] ring-2 ring-cyan/20"
          : "hover:border-cyan/50 hover:bg-panelSoft hover:shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-white">{prompt.title}</h3>
          <p className="mt-2 inline-flex rounded-full border border-cyan/20 bg-cyan/10 px-2.5 py-0.5 text-xs text-cyan">
            {prompt.category}
          </p>
        </div>
        <button
          type="button"
          aria-label={isFavorite ? "取消收藏" : "收藏词条"}
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(prompt.id);
          }}
          className={`grid h-9 w-9 flex-none place-items-center rounded-lg border transition ${
            isFavorite
              ? "border-amber/80 bg-amber/20 text-amber shadow-[0_0_20px_rgba(247,198,106,0.16)]"
              : "border-slate-700 bg-ink/70 text-slate-500 hover:border-amber/70 hover:bg-amber/10 hover:text-amber"
          }`}
        >
          <Star
            aria-hidden="true"
            className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
          />
        </button>
      </div>

      <p className="line-clamp-2 break-words rounded-lg border border-white/[0.06] bg-white/[0.035] px-3 py-2 text-sm leading-6 text-slate-200">
        {prompt.englishPrompt}
      </p>
      <p className="line-clamp-3 mt-2 text-sm leading-6 text-slate-400">
        {prompt.chineseExplain}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onTagClick(tag);
            }}
            className="tag-pill rounded-full px-2.5 py-1 text-xs transition hover:border-mint/70 hover:bg-mint/10 hover:text-mint"
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onCopy(prompt);
          }}
          className="primary-action inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3.5 text-sm font-medium transition"
        >
          <Copy aria-hidden="true" className="h-4 w-4" />
          {copied ? "已复制" : "复制"}
        </button>
      </div>
    </article>
  );
}
