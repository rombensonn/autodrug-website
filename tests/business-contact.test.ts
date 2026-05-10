import assert from "node:assert/strict";
import { test } from "node:test";
import { business } from "../data/business.ts";

test("business contact email is configured everywhere from one source", () => {
  assert.equal(business.emailDisplay, "g30107@gmail.com");
  assert.equal(business.emailHref, "mailto:g30107@gmail.com");
  assert.equal(business.legal.personalDataEmail, business.emailDisplay);
});
