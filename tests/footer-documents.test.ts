import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const footer = readFileSync("components/layout/Footer.tsx", "utf8");
const navigation = readFileSync("data/navigation.ts", "utf8");

test("footer legal documents are rendered as compact footer links", () => {
  assert.doesNotMatch(footer, />\s*Документы\s*</);
  assert.match(footer, /border-t border-white\/10/);
  assert.match(footer, />\s*\{item\.label\}\s*</);
  assert.doesNotMatch(footer, /item\.shortLabel/);
  assert.match(navigation, /label: "Политика обработки персональных данных"/);
  assert.match(navigation, /label: "Согласие на обработку персональных данных"/);
  assert.doesNotMatch(navigation, /shortLabel/);
});
