import { SearchX } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="glass-panel flex min-h-[320px] flex-col items-center justify-center rounded-lg border-dashed p-8 text-center">
      <SearchX aria-hidden="true" className="mb-3 h-8 w-8 text-cyan/70" />
      <p className="text-base font-medium text-white">没有找到相关提示词</p>
    </div>
  );
}
