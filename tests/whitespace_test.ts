import assert from "node:assert";

import { describe, it } from "mocha";

import { interpret } from "../mod.js";

describe("Whitespace control", () => {
  it("should preserve whitespace", async () => {
    let res = await interpret("< {{scroll}} >", { context: { scroll: "PRIRUTSENIE" } });
    assert.equal(res, "< PRIRUTSENIE >");
  });

  it("should chomp right whitespace", async () => {
    let res = await interpret("< {{scroll ~}} >", { context: { scroll: "PRIRUTSENIE" } });
    assert.equal(res, "< PRIRUTSENIE>");
  });

  it("should chomp left whitespace", async () => {
    let res = await interpret("< {{~ scroll}} >", { context: { scroll: "PRIRUTSENIE" } });
    assert.equal(res, "<PRIRUTSENIE >");
  });

  it("should chomp both whitespace", async () => {
    let res = await interpret("< {{~ scroll ~}} >", { context: { scroll: "PRIRUTSENIE" } });
    assert.equal(res, "<PRIRUTSENIE>");
  });
});
