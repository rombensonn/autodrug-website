const NBSP = "\u00a0";

const RUSSIAN_PREPOSITIONS = [
  "благодаря",
  "без",
  "безо",
  "близ",
  "в",
  "ввиду",
  "вдоль",
  "взамен",
  "включая",
  "вместо",
  "вне",
  "внизу",
  "внутри",
  "внутрь",
  "во",
  "возле",
  "вокруг",
  "вопреки",
  "впереди",
  "вроде",
  "вслед",
  "вследствие",
  "для",
  "до",
  "за",
  "исключая",
  "из",
  "из-за",
  "из-под",
  "изо",
  "к",
  "ко",
  "кроме",
  "меж",
  "между",
  "мимо",
  "навстречу",
  "наперекор",
  "наподобие",
  "напротив",
  "на",
  "над",
  "надо",
  "насчет",
  "невзирая",
  "несмотря",
  "о",
  "об",
  "обо",
  "около",
  "относительно",
  "от",
  "ото",
  "перед",
  "передо",
  "по",
  "под",
  "подо",
  "помимо",
  "поперек",
  "после",
  "посреди",
  "посредством",
  "при",
  "про",
  "против",
  "путем",
  "ради",
  "с",
  "сверх",
  "свыше",
  "согласно",
  "сообразно",
  "соответственно",
  "сквозь",
  "со",
  "спустя",
  "среди",
  "у",
  "через",
  "чрез"
].sort((left, right) => right.length - left.length);

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const RUSSIAN_PREPOSITION_ORPHAN_PATTERN = new RegExp(
  `(^|[\\s([{«„"'“])(${RUSSIAN_PREPOSITIONS.map(escapeRegExp).join("|")})([ \\t\\n\\r]+)(?=[A-Za-zА-Яа-яЁё0-9«„"'“])`,
  "giu"
);

const TRAILING_RUSSIAN_PREPOSITION_ORPHAN_PATTERN = new RegExp(
  `(^|[\\s([{«„"'“])(${RUSSIAN_PREPOSITIONS.map(escapeRegExp).join("|")})([ \\t\\n\\r]+)$`,
  "iu"
);

const WRAPPABLE_WORD_START_PATTERN = /^[ \t\n\r]*[A-Za-zА-Яа-яЁё0-9«„"'“]/u;

export function preventRussianPrepositionOrphans(text: string) {
  return text.replace(RUSSIAN_PREPOSITION_ORPHAN_PATTERN, `$1$2${NBSP}`);
}

export function preventTrailingRussianPrepositionOrphan(text: string) {
  return text.replace(TRAILING_RUSSIAN_PREPOSITION_ORPHAN_PATTERN, `$1$2${NBSP}`);
}

export function startsWithWrappableWord(text: string) {
  return WRAPPABLE_WORD_START_PATTERN.test(text);
}
