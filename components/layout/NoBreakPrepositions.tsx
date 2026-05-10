"use client";

import { useEffect } from "react";
import {
  preventRussianPrepositionOrphans,
  preventTrailingRussianPrepositionOrphan,
  startsWithWrappableWord
} from "@/lib/typography";

const SKIPPED_TEXT_CONTAINERS =
  "script, style, noscript, code, pre, kbd, samp, textarea, input, select, option, svg, math, [contenteditable='true']";

function shouldSkipTextNode(node: Text) {
  return !node.parentElement || Boolean(node.parentElement.closest(SKIPPED_TEXT_CONTAINERS));
}

function processTextNode(node: Text) {
  const nextValue = preventRussianPrepositionOrphans(node.nodeValue ?? "");

  if (nextValue !== node.nodeValue) {
    node.nodeValue = nextValue;
  }
}

function collectTextNodes(root: Node) {
  const textNodes: Text[] = [];

  if (root.nodeType === Node.TEXT_NODE) {
    const textNode = root as Text;

    if (!shouldSkipTextNode(textNode)) {
      textNodes.push(textNode);
    }

    return textNodes;
  }

  if (
    root.nodeType !== Node.ELEMENT_NODE &&
    root.nodeType !== Node.DOCUMENT_NODE &&
    root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
  ) {
    return textNodes;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();

  while (current) {
    const textNode = current as Text;

    if (!shouldSkipTextNode(textNode)) {
      textNodes.push(textNode);
    }

    current = walker.nextNode();
  }

  return textNodes;
}

function processTextNodeBoundaries(textNodes: Text[]) {
  for (let index = 0; index < textNodes.length - 1; index += 1) {
    const current = textNodes[index];
    const next = textNodes[index + 1];

    if (!startsWithWrappableWord(next.nodeValue ?? "")) {
      continue;
    }

    const nextValue = preventTrailingRussianPrepositionOrphan(current.nodeValue ?? "");

    if (nextValue !== current.nodeValue) {
      current.nodeValue = nextValue;
    }
  }
}

function processSubtree(root: Node) {
  const textNodes = collectTextNodes(root);

  textNodes.forEach(processTextNode);
  processTextNodeBoundaries(textNodes);
}

export function NoBreakPrepositions() {
  useEffect(() => {
    let animationFrame = 0;

    const scheduleProcess = () => {
      if (animationFrame) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        processSubtree(document.body);
      });
    };

    processSubtree(document.body);

    const observer = new MutationObserver(scheduleProcess);

    observer.observe(document.body, {
      characterData: true,
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return null;
}
