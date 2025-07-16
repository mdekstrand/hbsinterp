import assert from "node:assert/strict";

import { describe, it } from "mocha";

import { interpret } from "../mod.js";

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
    assert.equal(res, "LEP GEX VEN ZEA");
  });
});

describe("custom helpers", () => {
  it("should fail with an unnown helper", async () => {
    await assertRejects(() => interpret("{{unknown fish}}", {}));
  });

  it("should call a custom helper", async () => {
    let template = "{{lower scroll}}";
    let res = await interpret(template, {
      context: {
        scroll: "LEP GEX VEN ZEA",
      },
      helpers: {
        lower(val) {
          return val?.toString().toLowerCase();
        },
      },
    });
    assert.equal(res, "lep gex ven zea");
  });
});
