import { assertEquals } from "std/assert/mod.ts";
import { describe, it } from "std/testing/bdd.ts";

import { interpret, safe } from "../mod.ts";

describe("HTML escaping", () => {
  it("should escape HTML", async () => {
    let res = await interpret("{{html}}", { context: { html: "<br>" } });
    assertEquals(res, "&lt;br&gt;");
  });

  it("should pass through HTML with triple braces", async () => {
    let res = await interpret("{{{html}}}", { context: { html: "<br>" } });
    assertEquals(res, "<br>");
  });

  it("should escape helper results", async () => {
    let res = await interpret("{{lookup obj 'key'}}", {
      context: { obj: { key: "<br>&hello" } },
    });
    assertEquals(res, "&lt;br&gt;&amp;hello");
  });

  it("should pass through helper results with triple braces", async () => {
    let res = await interpret("{{{lookup obj 'key'}}}", {
      context: { obj: { key: "<br>&hello" } },
    });
    assertEquals(res, "<br>&hello");
  });

  it("should pass through safe helper results", async () => {
    let res = await interpret("{{hello 'world'}}", {
      context: {},
      helpers: {
        hello(object) {
          return safe(`Hello, <strong>${object}</strong>`);
        },
      },
    });
    assertEquals(res, "Hello, &lt;strong&gt;world&lt;/strong&gt;");
  });
});
