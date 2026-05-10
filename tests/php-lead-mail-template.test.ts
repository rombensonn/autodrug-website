import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const handler = readFileSync("public/api/lead.php", "utf8");

test("lead handler sends a multipart HTML email", () => {
  assert.match(handler, /function format_lead_html/);
  assert.match(handler, /multipart\/alternative/);
  assert.match(handler, /Content-Type: text\/html; charset=UTF-8/);
});

test("lead email template highlights the main lead fields", () => {
  assert.match(handler, /Новая заявка с сайта/);
  assert.match(handler, /Телефон/);
  assert.match(handler, /Проблема/);
  assert.match(handler, /<table/);
});
