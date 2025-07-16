import assert from 'node:assert'
import { describe, it } from "mocha";

import { interpret } from "../mod.js";

describe("basic template interpolation", () => {
  it("should no-op an empty string", async () => {
    let res = await interpret("", {});
    assert.equal(res, "");
  });

  it("should pass through a fixed string", async () => {
    let res = await interpret("FOOBIE BLETCH", {});
    assert.equal(res, "FOOBIE BLETCH");
  });

  it("should ignore a comment", async () => {
    let res = await interpret("testing fish {{! comment}} and chips", {});
    assert.equal(res, "testing fish  and chips");
  });

  it("should render undefined as empty string", async () => {
    let res = await interpret("{{foo}}", {});
    assert.equal(res, "");
  });

  it("should inerpolate a simple variable", async () => {
    let res = await interpret("{{foo}}", { context: { foo: "HACKEM MUCHE" } });
    assert.equal(res, "HACKEM MUCHE");
  });

  it("should inerpolate a variable with text", async () => {
    let res = await interpret("you fail to read {{scroll}} because you are blind", {
      context: { scroll: "HACKEM MUCHE" },
    });
    assert.equal(res, "you fail to read HACKEM MUCHE because you are blind");
  });

  it("should interpret a numeric literal", async () => {
    let res = await interpret("{{ 5 }} scrolls", {});
    assert.equal(res, "5 scrolls");
  });
});
