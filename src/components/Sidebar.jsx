export default function Sidebar({
  categories,
  activeCategory,
  onCategoryChange,
  counts,
  totalCount,
}) {
  return (
    <aside className="glass-panel min-w-0 rounded-lg p-3 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)]">
      <div className="mb-4 px-2">
        <h2 className="text-sm font-semibold text-white">分类导航</h2>
        <p className="mt-1 text-xs text-slate-500">共 {totalCount} 条词条</p>
      </div>

      <nav className="scrollbar-soft flex w-full min-w-0 max-w-full gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1.5 lg:overflow-visible">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const count = category === "全部" ? totalCount : counts[category] || 0;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`relative flex min-w-max items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition lg:w-full ${
                isActive
                  ? "border-cyan/60 bg-gradient-to-r from-cyan/20 to-violet-500/10 text-white shadow-[0_0_24px_rgba(77,215,247,0.12)]"
                  : "border-transparent text-slate-400 hover:border-slate-700 hover:bg-white/[0.04] hover:text-slate-100"
              }`}
            >
              <span
                className={`absolute left-0 top-2 bottom-2 w-0.5 rounded-full transition ${
                  isActive ? "bg-cyan" : "bg-transparent"
                }`}
              />
              <span className="pl-1">{category}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive
                    ? "bg-cyan/20 text-cyan"
                    : "bg-white/5 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
