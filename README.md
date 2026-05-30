# AI视频提示词词典

面向 AI 视频创作者的提示词分类库。项目只做提示词词条浏览、搜索、筛选、复制和收藏，不包含完整提示词生成、AI 自动生成、登录、数据库或后台管理功能。

## 本地运行

```bash
npm install
npm run dev
```

构建生产版本：

```bash
npm run build
```

预览构建结果：

```bash
npm run preview
```

## 主要结构

```text
src/
  App.jsx
  main.jsx
  index.css
  data/
    prompts.json
    prompt-template.json
  scripts/
    validate-prompts.mjs
  components/
    Sidebar.jsx
    SearchBar.jsx
    PromptCard.jsx
    PromptDetail.jsx
    TagFilter.jsx
    EmptyState.jsx
```

## 修改和新增提示词

所有词条数据都在 `src/data/prompts.json`。

新增词条时，可以先复制 `src/data/prompt-template.json` 的对象结构，再追加到 `src/data/prompts.json` 数组末尾：

```json
{
  "id": "style_cyberpunk_001",
  "category": "视频风格提示词",
  "title": "赛博朋克视觉风格",
  "englishPrompt": "cyberpunk visual style, neon lighting, futuristic city atmosphere",
  "chineseExplain": "适合未来科技、AI、机器人、数码产品类视频。",
  "suitableFor": ["科技产品", "AI工具"],
  "notSuitableFor": ["儿童文具", "温馨家庭场景"],
  "matchWith": ["低机位推进", "冷蓝轮廓光"],
  "tags": ["科技感", "霓虹", "未来感"],
  "copyText": "cyberpunk visual style, neon lighting, futuristic city atmosphere"
}
```

`category` 需要与页面左侧分类名称一致。新增分类时，还需要在 `src/App.jsx` 的 `CATEGORIES` 中补上分类名称。

新增或修改数据后，运行校验：

```bash
npm run validate:data
```

校验会检查必填字段、字段类型、分类是否合法、数组内容、id 是否重复，以及 `copyText` 是否为空。

页面加载时也会自动检查 `src/data/prompts.json`。如果字段缺失、id 重复、数组格式错误、分类不合法或 `copyText` 为空，浏览器开发者工具的 Console 面板会显示 `[AI视频提示词词典] prompts.json 数据校验失败`，并列出具体是哪一条数据出错。

## 后续 UI 优化入口

- 页面整体布局：`src/App.jsx`
- 顶部搜索和收藏筛选：`src/components/SearchBar.jsx`
- 左侧分类导航：`src/components/Sidebar.jsx`
- 中间卡片：`src/components/PromptCard.jsx`
- 右侧详情：`src/components/PromptDetail.jsx`
- 标签筛选：`src/components/TagFilter.jsx`
- 全局视觉、滚动条、文字截断：`src/index.css`
- Tailwind 主题色和字体：`tailwind.config.js`
