import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const privacyPage = readFileSync("app/privacy/page.tsx", "utf8");
const consentPage = readFileSync("app/personal-data-consent/page.tsx", "utf8");
const businessData = readFileSync("data/business.ts", "utf8");
const navigationData = readFileSync("data/navigation.ts", "utf8");
const footerSource = readFileSync("components/layout/Footer.tsx", "utf8");
const privacyDocument = `${privacyPage}\n${businessData}`;
const consentDocument = `${consentPage}\n${businessData}`;

test("privacy policy contains the current operator details and processing scope", () => {
  for (const requiredText of [
    'const documentDate = "10.05.2026"',
    "Федеральный закон от 27.07.2006 № 152-ФЗ",
    "Гиголашвили Бесик Гайозович",
    "Межрайонная инспекция Федеральной налоговой службы №23 по Московской области",
    "45.20 Техническое обслуживание и ремонт автотранспортных средств",
    "хешированный IP-адрес",
    "Яндекс.Метрика",
    "Telegram",
    "CRM",
    "трансграничная передача",
    "не принимает решений, порождающих юридические последствия"
  ]) {
    assert.match(privacyDocument, new RegExp(escapeRegExp(requiredText)), requiredText);
  }
});

test("personal data consent is a standalone consent for the lead forms", () => {
  for (const requiredText of [
    'const documentDate = "10.05.2026"',
    "свободно, своей волей и в своем интересе",
    "не является согласием на распространение персональных данных",
    "обработка моей заявки и обратная связь",
    "получение ориентировочной стоимости ремонта",
    "до достижения целей обработки",
    "g30107@gmail.com"
  ]) {
    assert.match(consentDocument, new RegExp(escapeRegExp(requiredText)), requiredText);
  }
});

test("form submissions use the current consent version", () => {
  assert.match(businessData, /consentVersion: "2026-05-10"/);
});

test("footer keeps legal documents in a compact legal row", () => {
  assert.match(navigationData, /export const legalFooterNavigation = \[/);
  assert.match(navigationData, /label: "Политика обработки персональных данных"/);
  assert.match(navigationData, /label: "Согласие на обработку персональных данных"/);
  assert.doesNotMatch(navigationData, /shortLabel/);
  assert.doesNotMatch(navigationData, /Политика конфиденциальности/);
  assert.doesNotMatch(navigationData, /Согласие на обработку ПДн/);
  assert.match(footerSource, /legalFooterNavigation\.map/);
  assert.doesNotMatch(footerSource, />\s*Документы\s*</);
  assert.match(footerSource, /Правовая информация и персональные данные/);
  assert.match(footerSource, />\s*\{item\.label\}\s*</);
  assert.doesNotMatch(footerSource, /item\.shortLabel/);

  const mainMenu = footerSource.slice(
    footerSource.indexOf("footerNavigation.map"),
    footerSource.indexOf("legalFooterNavigation.map")
  );

  assert.doesNotMatch(mainMenu, /privacy|personal-data-consent/);
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
