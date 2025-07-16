import assert from "node:assert";

import { describe, it } from "mocha";

import { interpret } from "../mod.js";

describe("partials", () => {
  it("should fail on empty partial", async () => {
    await assertRejects(async () => {
      await interpret("{{>partial}}", {});
    });
  });

  it("should include partial", async () => {
    let res = await interpret("{{>include}}", {
      partials: {
        include: "ANDOVA BEGARIN",
      },
    });
    assert.equal(res, "ANDOVA BEGARIN");
  });

  it("should resolve variable", async () => {
    let res = await interpret("{{>include}}", {
      context: {
        name: "ANDOVA BEGARIN",
        child: {
          name: "VERR YED HORRE",
        },
      },
      partials: {
        include: "{{name}}",
      },
    });
    assert.equal(res, "ANDOVA BEGARIN");
  });

  it("should pass context", async () => {
    let res = await interpret("{{> include child }}", {
      context: {
        name: "ANDOVA BEGARIN",
        child: {
          name: "VERR YED HORRE",
        },
      },
      partials: {
        include: "{{name}}",
      },
    });
    assert.equal(res, "VERR YED HORRE");
  });

  it("should set parameters", async () => {
    let res = await interpret("{{> include name=\"KIRJE\" }}", {
      context: {
        name: "ANDOVA BEGARIN",
        child: {
          name: "VERR YED HORRE",
        },
      },
      partials: {
        include: "{{name}}",
      },
    });
    assert.equal(res, "KIRJE");
  });
});
