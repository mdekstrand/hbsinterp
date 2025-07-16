import assert from "node:assert/strict";

import { describe, it } from "mocha";

import { interpret } from "../mod.js";

describe("the #with helper", () => {
  it("should return content", async () => {
    let res = await interpret("{{#with scroll}}content{{/with}}", {});
    assert.equal(res, "content");
  });

  it("interpolates inner variable", async () => {
    let res = await interpret("{{#with scroll}}{{name}}{{/with}}", {
      context: { scroll: { name: "ELAM EBOW" } },
    });
    assert.equal(res, "ELAM EBOW");
  });

  it("can still access outer variable", async () => {
    let res = await interpret("{{#with scroll}}{{outer}}{{/with}}", {
      context: { scroll: { name: "ELAM EBOW" }, outer: "nope" },
    });
    assert.equal(res, "nope");
  });

  it("can mask outer variable", async () => {
    let res = await interpret("{{name}} or {{#with scroll}}{{name}}{{/with}}", {
      context: { scroll: { name: "ELAM EBOW" }, name: "HACKEM MUCHE" },
    });
    assert.equal(res, "HACKEM MUCHE or ELAM EBOW");
  });
});
