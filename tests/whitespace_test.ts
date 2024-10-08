import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";

import { interpret } from "../mod.ts";

describe("Whitespace control", () => {
  it("should preserve whitespace", async () => {
    let res = await interpret("< {{scroll}} >", { context: { scroll: "PRIRUTSENIE" } });
    assertEquals(res, "< PRIRUTSENIE >");
  });

  it("should chomp right whitespace", async () => {
    let res = await interpret("< {{scroll ~}} >", { context: { scroll: "PRIRUTSENIE" } });
    assertEquals(res, "< PRIRUTSENIE>");
  });

  it("should chomp left whitespace", async () => {
    let res = await interpret("< {{~ scroll}} >", { context: { scroll: "PRIRUTSENIE" } });
    assertEquals(res, "<PRIRUTSENIE >");
  });

  it("should chomp both whitespace", async () => {
    let res = await interpret("< {{~ scroll ~}} >", { context: { scroll: "PRIRUTSENIE" } });
    assertEquals(res, "<PRIRUTSENIE>");
  });
});
