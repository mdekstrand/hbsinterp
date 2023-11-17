import { assertEquals } from "std/assert/mod.ts";
import { describe, it } from "std/testing/bdd.ts";

import { interpret } from "../mod.ts";

describe("lookup helper", () => {
  it("should lookup a value", async () => {
    let template = "{{lookup obj key}}";
    let res = await interpret(template, {
      context: {
        obj: {
          foo: "LEP GEX VEN ZEA",
          bar: "PRIRUTSENIE",
        },
        key: "foo",
      },
    });
    assertEquals(res, "LEP GEX VEN ZEA");
  });
});
