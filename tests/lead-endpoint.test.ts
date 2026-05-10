import assert from "node:assert/strict";
import { test } from "node:test";
import { getLeadEndpoint } from "../lib/leadEndpoint.ts";

test("uses the REG.RU PHP lead endpoint by default", () => {
  delete process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

  assert.equal(getLeadEndpoint(), "/api/lead.php");
});

test("allows overriding the lead endpoint at build time", () => {
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT = " /custom/lead-handler.php ";

  assert.equal(getLeadEndpoint(), "/custom/lead-handler.php");
});
