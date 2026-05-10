import assert from "node:assert/strict";
import { test } from "node:test";
import {
  preventRussianPrepositionOrphans,
  preventTrailingRussianPrepositionOrphan,
  startsWithWrappableWord
} from "../lib/typography.ts";

test("keeps Russian prepositions with the following word", () => {
  assert.equal(
    preventRussianPrepositionOrphans("В сервисе на диагностике с мастером"),
    "В\u00a0сервисе на\u00a0диагностике с\u00a0мастером"
  );
});

test("handles long and hyphenated Russian prepositions", () => {
  assert.equal(
    preventRussianPrepositionOrphans("Из-за шума около машины через 10 минут благодаря диагностике"),
    "Из-за\u00a0шума около\u00a0машины через\u00a010 минут благодаря\u00a0диагностике"
  );
});

test("does not touch matching letters inside words", () => {
  assert.equal(preventRussianPrepositionOrphans("внутренняя диагностика"), "внутренняя диагностика");
});

test("keeps prepositions with words split by inline elements", () => {
  assert.equal(preventTrailingRussianPrepositionOrphan("согласие на "), "согласие на\u00a0");
  assert.equal(startsWithWrappableWord("обработку данных"), true);
});
