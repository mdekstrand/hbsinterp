import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";

import { interpret } from "../mod.ts";

describe("the #with helper", () => {
  it("should return content", async () => {
    let res = await interpret("{{#with scroll}}content{{/with}}", {});
    assertEquals(res, "content");
  });

  it("interpolates inner variable", async () => {
    let res = await interpret("{{#with scroll}}{{name}}{{/with}}", {
      context: { scroll: { name: "ELAM EBOW" } },
    });
    assertEquals(res, "ELAM EBOW");
  });

  it("can still access outer variable", async () => {
    let res = await interpret("{{#with scroll}}{{outer}}{{/with}}", {
      context: { scroll: { name: "ELAM EBOW" }, outer: "nope" },
    });
    assertEquals(res, "nope");
  });

  it("can mask outer variable", async () => {
    let res = await interpret("{{name}} or {{#with scroll}}{{name}}{{/with}}", {
      context: { scroll: { name: "ELAM EBOW" }, name: "HACKEM MUCHE" },
    });
    assertEquals(res, "HACKEM MUCHE or ELAM EBOW");
  });
});
