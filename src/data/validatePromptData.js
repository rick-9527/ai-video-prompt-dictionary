export const PROMPT_REQUIRED_FIELDS = [
  "id",
  "category",
  "title",
  "englishPrompt",
  "chineseExplain",
  "suitableFor",
  "notSuitableFor",
  "matchWith",
  "tags",
  "copyText",
];

export const PROMPT_ARRAY_FIELDS = [
  "suitableFor",
  "notSuitableFor",
  "matchWith",
  "tags",
];

export const PROMPT_STRING_FIELDS = [
  "id",
  "category",
  "title",
  "englishPrompt",
  "chineseExplain",
  "copyText",
];

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function normalizeCategories(categories) {
  if (!Array.isArray(categories)) {
    return [];
  }

  return categories.filter((category) => category !== "全部");
}

function formatPromptLabel(prompt, index) {
  if (prompt && typeof prompt.id === "string" && prompt.id.trim()) {
    return `第 ${index + 1} 条（${prompt.id}）`;
  }

  return `第 ${index + 1} 条`;
}

export function validatePromptData(prompts, categories) {
  const errors = [];
  const warnings = [];
  const allowedCategories = normalizeCategories(categories);
  const seenIds = new Set();

  if (!Array.isArray(prompts)) {
    return {
      errors: ["prompts.json 根结构必须是数组。"],
      warnings,
      total: 0,
      allowedCategories,
    };
  }

  prompts.forEach((prompt, index) => {
    const label = formatPromptLabel(prompt, index);

    if (!isPlainObject(prompt)) {
      errors.push(`${label}: 每条提示词必须是对象。`);
      return;
    }

    const fields = Object.keys(prompt);
    const missingFields = PROMPT_REQUIRED_FIELDS.filter(
      (field) => !fields.includes(field)
    );
    const extraFields = fields.filter(
      (field) => !PROMPT_REQUIRED_FIELDS.includes(field)
    );

    if (missingFields.length > 0) {
      errors.push(`${label}: 缺少字段：${missingFields.join(", ")}。`);
    }

    if (extraFields.length > 0) {
      errors.push(`${label}: 存在未定义字段：${extraFields.join(", ")}。`);
    }

    PROMPT_STRING_FIELDS.forEach((field) => {
      if (!(field in prompt)) {
        return;
      }

      if (typeof prompt[field] !== "string") {
        errors.push(`${label}: ${field} 必须是字符串。`);
        return;
      }

      if (!prompt[field].trim()) {
        errors.push(`${label}: ${field} 不能为空。`);
      }
    });

    PROMPT_ARRAY_FIELDS.forEach((field) => {
      if (!(field in prompt)) {
        return;
      }

      if (!Array.isArray(prompt[field])) {
        errors.push(`${label}: ${field} 必须是数组格式。`);
        return;
      }

      if (prompt[field].length === 0) {
        errors.push(`${label}: ${field} 不能是空数组。`);
      }

      prompt[field].forEach((item, itemIndex) => {
        if (typeof item !== "string" || !item.trim()) {
          errors.push(`${label}: ${field}[${itemIndex}] 必须是非空字符串。`);
        }
      });
    });

    if (typeof prompt.id === "string") {
      if (seenIds.has(prompt.id)) {
        errors.push(`${label}: id 重复：${prompt.id}。`);
      }
      seenIds.add(prompt.id);
    }

    if (
      typeof prompt.category === "string" &&
      !allowedCategories.includes(prompt.category)
    ) {
      errors.push(
        `${label}: category 不属于当前页面分类：${prompt.category}。`
      );
    }

    if (
      typeof prompt.copyText === "string" &&
      typeof prompt.englishPrompt === "string" &&
      prompt.copyText.trim() !== prompt.englishPrompt.trim()
    ) {
      warnings.push(`${label}: copyText 与 englishPrompt 不一致，请确认是否有意如此。`);
    }
  });

  return {
    errors,
    warnings,
    total: prompts.length,
    allowedCategories,
  };
}

export function logPromptDataValidation(report) {
  const prefix = "[AI视频提示词词典] prompts.json 数据校验";

  if (report.errors.length > 0) {
    console.group(`${prefix}失败`);
    console.error(`发现 ${report.errors.length} 个错误，请检查 src/data/prompts.json。`);
    report.errors.forEach((error) => console.error(error));

    if (report.warnings.length > 0) {
      console.warn(`另有 ${report.warnings.length} 个警告：`);
      report.warnings.forEach((warning) => console.warn(warning));
    }

    console.info("允许的分类：", report.allowedCategories);
    console.groupEnd();
    return;
  }

  if (report.warnings.length > 0) {
    console.group(`${prefix}通过，但有警告`);
    console.info(`共 ${report.total} 条提示词，必填字段、数组格式、id 和分类检查通过。`);
    report.warnings.forEach((warning) => console.warn(warning));
    console.groupEnd();
    return;
  }

  console.info(`${prefix}通过：共 ${report.total} 条提示词。`);
}
