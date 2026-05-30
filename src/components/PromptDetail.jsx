import { Copy, Star } from "lucide-react";

function PillList({ items, tone = "default", onTagClick }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-slate-500">暂无</p>;
  }

  const toneClass =
    tone === "tag"
      ? "tag-pill hover:border-mint"
      : "border border-slate-700/80 bg-white/[0.04] text-slate-300";

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const Tag = onTagClick ? "button" : "span";
        return (
          <Tag
            key={item}
            type={onTagClick ? "button" : undefined}
            onClick={onTagClick ? () => onTagClick(item) : undefined}
            className={`rounded-full px-3 py-1 text-xs transition ${toneClass}`}
          >
            {item}
          </Tag>
        );
      })}
    </div>
  );
}

function DetailBlock({ title, children }) {
  return (
    <section className="border-t border-slate-800/80 pt-5 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-xs font-semibold tracking-[0.18em] text-slate-500">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function PromptDetail({
  prompt,
  isFavorite,
  copied,
  onCopy,
  onToggleFavorite,
  onTagClick,
}) {
  if (!prompt) {
    return (
      <aside className="glass-panel flex min-h-[360px] min-w-0 items-center justify-center rounded-lg p-6 text-center lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]">
        <p className="text-sm text-slate-400">请选择一个提示词词条查看详情</p>
      </aside>
    );
  }

  return (
    <aside className="glass-panel glow-border min-w-0 rounded-lg lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]">
      <div className="flex h-full flex-col">
        <div className="border-b border-slate-800/90 p-5">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="inline-flex rounded-full border border-cyan/25 bg-cyan/10 px-2.5 py-1 text-xs text-cyan">
                {prompt.category}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-white">
                {prompt.title}
              </h2>
            </div>
            <button
              type="button"
              aria-label={isFavorite ? "取消收藏" : "收藏词条"}
              onClick={() => onToggleFavorite(prompt.id)}
              className={`grid h-10 w-10 flex-none place-items-center rounded-lg border transition ${
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

          <button
            type="button"
            onClick={() => onCopy(prompt)}
            className="primary-action inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition"
          >
            <Copy aria-hidden="true" className="h-4 w-4" />
            {copied ? "已复制" : "一键复制英文提示词"}
          </button>
        </div>

        <div className="scrollbar-soft flex-1 space-y-5 overflow-y-auto p-5">
          <DetailBlock title="英文提示词">
            <p className="break-words rounded-lg border border-cyan/20 bg-cyan/5 p-3 text-sm leading-6 text-slate-100">
              {prompt.englishPrompt}
            </p>
          </DetailBlock>

          <DetailBlock title="中文解释">
            <p className="text-sm leading-7 text-slate-300">
              {prompt.chineseExplain}
            </p>
          </DetailBlock>

          <DetailBlock title="适合场景">
            <PillList items={prompt.suitableFor} />
          </DetailBlock>

          <DetailBlock title="不适合场景">
            <PillList items={prompt.notSuitableFor} />
          </DetailBlock>

          <DetailBlock title="搭配建议">
            <PillList items={prompt.matchWith} />
          </DetailBlock>

          <DetailBlock title="标签">
            <PillList items={prompt.tags} tone="tag" onTagClick={onTagClick} />
          </DetailBlock>
        </div>
      </div>
    </aside>
  );
}
