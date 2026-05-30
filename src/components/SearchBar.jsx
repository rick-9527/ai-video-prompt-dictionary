import { Search, Star } from "lucide-react";

export default function SearchBar({
  query,
  onQueryChange,
  favoriteOnly,
  onToggleFavoriteOnly,
  favoriteCount,
}) {
  return (
    <header className="glass-panel glow-border min-w-0 rounded-lg p-4 md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="mb-2 text-xs font-medium tracking-[0.24em] text-cyan">
            提示词词典
          </p>
          <h1 className="text-2xl font-semibold text-white md:text-3xl">
            AI视频提示词词典
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            面向 AI 视频创作者的提示词分类库
          </p>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-3 md:flex-row xl:max-w-3xl">
          <label className="relative min-w-0 flex-1">
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan"
            />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="搜索名称、分类、标签、英文提示词、中文解释"
              className="h-12 w-full rounded-lg border border-cyan/25 bg-ink/80 pl-11 pr-4 text-sm text-slate-100 shadow-[0_0_0_1px_rgba(77,215,247,0.05),0_14px_36px_rgba(0,0,0,0.24)] outline-none transition placeholder:text-slate-600 focus:border-cyan/80 focus:bg-ink focus:ring-2 focus:ring-cyan/20"
            />
          </label>

          <button
            type="button"
            onClick={onToggleFavoriteOnly}
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition ${
              favoriteOnly
                ? "border-amber/80 bg-amber/20 text-amber shadow-[0_0_22px_rgba(247,198,106,0.12)]"
                : "border-slate-700/80 bg-panelSoft/90 text-slate-300 hover:border-amber/70 hover:bg-amber/10 hover:text-amber"
            }`}
          >
            <Star
              aria-hidden="true"
              className={`h-4 w-4 ${favoriteOnly ? "fill-current" : ""}`}
            />
            已收藏
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {favoriteCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
