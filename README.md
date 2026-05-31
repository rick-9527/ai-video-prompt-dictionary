# AI视频提示词词典

AI视频提示词词典是一个通用 AI 视频广告提示词分类词典，用于整理和浏览不同类型的视频生成提示词词条。

它不是完整提示词生成器，不负责自动生成完整视频提示词，也不包含后端、数据库、登录系统或付费系统。

## 项目定位

面向 AI 视频创作者、电商广告创作者、产品视频策划和内容运营人员，提供一个可搜索、可复制、可持续扩充的提示词分类库。

适用工具包括：

- 即梦
- 可灵
- Runway
- Seedance
- 其他 AI 视频生成工具

## 当前功能

- 左侧分类导航
- 中间提示词卡片列表
- 右侧提示词详情面板
- 一键复制提示词
- 收藏常用提示词
- 标签筛选
- 关键词搜索
- `prompts.json` 数据驱动

## 技术栈

- Vite
- React
- Tailwind CSS
- GitHub Pages
- GitHub Actions

## 本地运行

```bash
npm install
npm run dev
```

## 构建方式

```bash
npm run build
```

## 部署方式

项目使用 GitHub Actions + GitHub Pages 自动部署。

推送到 `main` 分支后，GitHub Actions 会自动执行：

```bash
npm ci
npm run build
```

并将 `dist` 目录发布到 GitHub Pages。

当前线上地址：

```text
https://rick-9527.github.io/ai-video-prompt-dictionary/
```

## 数据维护

提示词数据位于：

```text
src/data/prompts.json
```

新增词条时，可以参考模板：

```text
src/data/prompt-template.json
```

修改数据后建议运行：

```bash
npm run validate:data
```

## 当前版本

v1.0 初版上线

## 后续计划

- 搜索优化
- 标签筛选
- 移动端适配
- 收藏常用提示词
- 扩充 `prompts.json` 数据
