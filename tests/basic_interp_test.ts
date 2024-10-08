import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";

import { interpret } from "../mod.ts";

describe("basic template interpolation", () => {
  it("should no-op an empty string", async () => {
    let res = await interpret("", {});
    assertEquals(res, "");
  });

  it("should pass through a fixed string", async () => {
    let res = await interpret("FOOBIE BLETCH", {});
    assertEquals(res, "FOOBIE BLETCH");
  });

  it("should ignore a comment", async () => {
    let res = await interpret("testing fish {{! comment}} and chips", {});
    assertEquals(res, "testing fish  and chips");
  });

  it("should render undefined as empty string", async () => {
    let res = await interpret("{{foo}}", {});
    assertEquals(res, "");
  });

  it("should inerpolate a simple variable", async () => {
    let res = await interpret("{{foo}}", { context: { foo: "HACKEM MUCHE" } });
    assertEquals(res, "HACKEM MUCHE");
  });

  it("should inerpolate a variable with text", async () => {
    let res = await interpret("you fail to read {{scroll}} because you are blind", {
      context: { scroll: "HACKEM MUCHE" },
    });
    assertEquals(res, "you fail to read HACKEM MUCHE because you are blind");
  });

  it("should interpret a numeric literal", async () => {
    let res = await interpret("{{ 5 }} scrolls", {});
    assertEquals(res, "5 scrolls");
  });
});
