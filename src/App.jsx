import { useEffect, useMemo, useState } from "react";
import prompts from "./data/prompts.json";
import Sidebar from "./components/Sidebar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import PromptCard from "./components/PromptCard.jsx";
import PromptDetail from "./components/PromptDetail.jsx";
import TagFilter from "./components/TagFilter.jsx";
import EmptyState from "./components/EmptyState.jsx";
import {
  logPromptDataValidation,
  validatePromptData,
} from "./data/validatePromptData.js";

const CATEGORIES = [
  "全部",
  "视频风格提示词",
  "运镜提示词",
  "景别提示词",
  "镜头焦段与景深提示词",
  "构图提示词",
  "光影提示词",
  "色彩调性提示词",
  "材质质感提示词",
  "场景氛围提示词",
  "产品展示提示词",
  "人物状态提示词",
  "声音提示词",
  "动作提示词",
  "负面提示词",
];

const FAVORITE_STORAGE_KEY = "ai-video-prompt-dictionary:favorites";
let hasLoggedPromptValidation = false;

function getInitialFavorites() {
  try {
    const saved = window.localStorage.getItem(FAVORITE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function promptMatchesQuery(prompt, query) {
  const keyword = normalize(query);
  if (!keyword) {
    return true;
  }

  const searchableText = [
    prompt.title,
    prompt.category,
    prompt.englishPrompt,
    prompt.chineseExplain,
    ...prompt.tags,
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(keyword);
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fall back to the selection API in restricted browser contexts.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [favoriteOnly, setFavoriteOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState(getInitialFavorites);
  const [selectedPromptId, setSelectedPromptId] = useState(prompts[0]?.id || "");
  const [copiedId, setCopiedId] = useState("");

  useEffect(() => {
    if (hasLoggedPromptValidation) {
      return;
    }

    hasLoggedPromptValidation = true;
    logPromptDataValidation(validatePromptData(prompts, CATEGORIES));
  }, []);

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const counts = useMemo(() => {
    return prompts.reduce((result, prompt) => {
      result[prompt.category] = (result[prompt.category] || 0) + 1;
      return result;
    }, {});
  }, []);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesCategory =
        activeCategory === "全部" || prompt.category === activeCategory;
      const matchesFavorite = !favoriteOnly || favoriteSet.has(prompt.id);
      const matchesTag = !activeTag || prompt.tags.includes(activeTag);

      return (
        matchesCategory &&
        matchesFavorite &&
        matchesTag &&
        promptMatchesQuery(prompt, query)
      );
    });
  }, [activeCategory, activeTag, favoriteOnly, favoriteSet, query]);

  const selectedPrompt = useMemo(() => {
    return prompts.find((prompt) => prompt.id === selectedPromptId) || null;
  }, [selectedPromptId]);

  const visibleTags = useMemo(() => {
    const tagCounts = new Map();
    prompts
      .filter((prompt) => {
        if (activeCategory !== "全部" && prompt.category !== activeCategory) {
          return false;
        }

        if (favoriteOnly && !favoriteSet.has(prompt.id)) {
          return false;
        }

        return promptMatchesQuery(prompt, query);
      })
      .forEach((prompt) => {
        prompt.tags.forEach((tag) => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        });
      });

    return Array.from(tagCounts.entries())
      .sort((first, second) => second[1] - first[1] || first[0].localeCompare(second[0], "zh-CN"))
      .slice(0, 24)
      .map(([tag]) => tag);
  }, [activeCategory, favoriteOnly, favoriteSet, query]);

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITE_STORAGE_KEY,
      JSON.stringify(favoriteIds)
    );
  }, [favoriteIds]);

  useEffect(() => {
    if (filteredPrompts.length === 0) {
      setSelectedPromptId("");
      return;
    }

    const selectedStillVisible = filteredPrompts.some(
      (prompt) => prompt.id === selectedPromptId
    );

    if (!selectedStillVisible) {
      setSelectedPromptId(filteredPrompts[0].id);
    }
  }, [filteredPrompts, selectedPromptId]);

  useEffect(() => {
    if (!copiedId) {
      return undefined;
    }

    const timer = window.setTimeout(() => setCopiedId(""), 1400);
    return () => window.clearTimeout(timer);
  }, [copiedId]);

  function handleCategoryChange(category) {
    setActiveCategory(category);
    setActiveTag("");
  }

  function handleToggleFavorite(promptId) {
    setFavoriteIds((currentIds) => {
      if (currentIds.includes(promptId)) {
        return currentIds.filter((id) => id !== promptId);
      }

      return [...currentIds, promptId];
    });
  }

  async function handleCopy(prompt) {
    await copyToClipboard(prompt.copyText);
    setCopiedId(prompt.id);
  }

  function handleTagClick(tag) {
    setActiveTag((currentTag) => (currentTag === tag ? "" : tag));
  }

  return (
    <main className="app-shell min-h-screen px-4 py-4 md:px-6 md:py-5">
      <div className="mx-auto flex min-w-0 max-w-[1720px] flex-col gap-5">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          favoriteOnly={favoriteOnly}
          onToggleFavoriteOnly={() => setFavoriteOnly((value) => !value)}
          favoriteCount={favoriteIds.length}
        />

        <div className="grid min-w-0 gap-5 lg:grid-cols-[240px_minmax(0,1fr)_380px] xl:grid-cols-[260px_minmax(0,1fr)_420px]">
          <Sidebar
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            counts={counts}
            totalCount={prompts.length}
          />

          <section className="min-w-0 space-y-4">
            <div className="glass-panel flex flex-col gap-3 rounded-lg p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium tracking-[0.18em] text-slate-500">
                  当前分类
                </p>
                <h2 className="mt-1 text-lg font-semibold text-white">
                  {activeCategory}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-cyan">
                  显示 {filteredPrompts.length} 条
                </span>
                {activeTag ? (
                  <span className="rounded-full border border-mint/40 bg-mint/10 px-3 py-1 text-mint">
                    标签：{activeTag}
                  </span>
                ) : null}
              </div>
            </div>

            <TagFilter
              tags={visibleTags}
              activeTag={activeTag}
              onTagClick={handleTagClick}
              onClearTag={() => setActiveTag("")}
            />

            {filteredPrompts.length > 0 ? (
              <div className="grid gap-4 xl:grid-cols-2">
                {filteredPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    isSelected={prompt.id === selectedPromptId}
                    isFavorite={favoriteSet.has(prompt.id)}
                    copied={copiedId === prompt.id}
                    onSelect={() => setSelectedPromptId(prompt.id)}
                    onCopy={handleCopy}
                    onToggleFavorite={handleToggleFavorite}
                    onTagClick={handleTagClick}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </section>

          <PromptDetail
            prompt={selectedPrompt}
            isFavorite={selectedPrompt ? favoriteSet.has(selectedPrompt.id) : false}
            copied={selectedPrompt ? copiedId === selectedPrompt.id : false}
            onCopy={handleCopy}
            onToggleFavorite={handleToggleFavorite}
            onTagClick={handleTagClick}
          />
        </div>
      </div>
    </main>
  );
}
