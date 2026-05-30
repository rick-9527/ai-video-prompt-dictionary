import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  validatePromptData,
} from "../src/data/validatePromptData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const promptsPath = path.join(projectRoot, "src", "data", "prompts.json");

const categories = [
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

function readPrompts() {
  if (!fs.existsSync(promptsPath)) {
    console.error(`找不到数据文件：${promptsPath}`);
    process.exit(1);
    return [];
  }

  try {
    const raw = fs.readFileSync(promptsPath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error(`prompts.json 不是有效 JSON：${error.message}`);
    process.exit(1);
    return [];
  }
}

const prompts = readPrompts();
const report = validatePromptData(prompts, categories);

if (report.warnings.length > 0) {
  console.warn("数据校验警告：");
  report.warnings.forEach((warning) => console.warn(`- ${warning}`));
  console.warn("");
}

if (report.errors.length > 0) {
  console.error("数据校验失败：");
  report.errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`数据校验通过：共 ${prompts.length} 条提示词，字段结构统一。`);
