import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const formFiles = [
  "components/forms/LeadForm.tsx",
  "components/forms/QuickLeadForm.tsx",
  "components/forms/ServiceQuiz.tsx"
];

const requiredConsentCopy =
  "Даю согласие на обработку персональных данных для обработки моей заявки и обратной связи.";
const requiredPrivacyCopy =
  "Подтверждаю, что ознакомлен(а) с Политикой обработки персональных данных.";
const requiredConsentLinkText = "согласие на обработку персональных данных";
const requiredPrivacyLinkText = "Политикой обработки персональных данных";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function visibleJsxText(source: string) {
  return source
    .replace(/\{" "\}/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .trim();
}

test("all lead forms use the required personal data checkbox copy", () => {
  for (const file of formFiles) {
    const source = readFileSync(file, "utf8");
    const visibleText = visibleJsxText(source);

    assert.match(visibleText, new RegExp(escapeRegExp(requiredConsentCopy)), file);
    assert.match(visibleText, new RegExp(escapeRegExp(requiredPrivacyCopy)), file);
    assert.match(
      source,
      new RegExp(`<Link\\s+[^>]*href="/personal-data-consent"[^>]*>\\s*${escapeRegExp(requiredConsentLinkText)}\\s*</Link>`),
      file
    );
    assert.match(
      source,
      new RegExp(`<Link\\s+[^>]*href="/privacy"[^>]*>\\s*${escapeRegExp(requiredPrivacyLinkText)}\\s*</Link>`),
      file
    );
  }
});
