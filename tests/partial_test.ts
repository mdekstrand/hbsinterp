import { assertEquals, assertRejects } from "std/assert/mod.ts";
import { describe, it } from "std/testing/bdd.ts";

import { interpret } from "../mod.ts";

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
    assertEquals(res, "ANDOVA BEGARIN");
  });

  it("should include partial", async () => {
    let res = await interpret("{{>include}}", {
      partials: {
        include: "ANDOVA BEGARIN",
      },
    });
    assertEquals(res, "ANDOVA BEGARIN");
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
    assertEquals(res, "ANDOVA BEGARIN");
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
    assertEquals(res, "VERR YED HORRE");
  });

  it("should set parameters", async () => {
    let res = await interpret('{{> include name="KIRJE" }}', {
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
    assertEquals(res, "KIRJE");
  });
});
