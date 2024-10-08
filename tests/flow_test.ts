import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";

import { interpret } from "../mod.ts";

describe("the #if helper", () => {
  it("should omit on false", async () => {
    let res = await interpret("{{#if false}}yes{{/if}}", {});
    assertEquals(res, "");
  });

  it("should include on true", async () => {
    let res = await interpret("{{#if true}}yes{{/if}}", {});
    assertEquals(res, "yes");
  });

  it("should return else on false", async () => {
    let res = await interpret("{{#if false}}yes{{else}}no{{/if}}", {});
    assertEquals(res, "no");
  });
  it("should ignore else on true", async () => {
    let res = await interpret("{{#if true}}yes{{else}}no{{/if}}", {});
    assertEquals(res, "yes");
  });

  it("should switch on variable", async () => {
    let t = "{{#if flag}}yes{{else}}no{{/if}}";
    let res = await interpret(t, { context: { flag: true } });
    assertEquals(res, "yes");

    res = await interpret(t, { context: { flag: false } });
    assertEquals(res, "no");
  });
});

describe("the #each helper", () => {
  it("should omit on empty", async () => {
    let res = await interpret("{{#each list}}yes{{/each}}", { context: { list: [] } });
    assertEquals(res, "");
  });
  it("should omit on undefined", async () => {
    let res = await interpret("{{#each list}}yes{{/each}}", {});
    assertEquals(res, "");
  });
  it("should include on single value", async () => {
    let res = await interpret("{{#each list}}yes{{/each}}", {
      context: { list: ["HACKEM MUCHE"] },
    });
    assertEquals(res, "yes");
  });
  it("should interpolate {{this}} on single value", async () => {
    let res = await interpret("{{#each list}}{{this}}{{/each}}", {
      context: { list: ["HACKEM MUCHE"] },
    });
    assertEquals(res, "HACKEM MUCHE");
  });

  it("should return else on empty", async () => {
    let res = await interpret("{{#each list}}yes{{else}}no{{/each}}", { context: { list: [] } });
    assertEquals(res, "no");
  });

  it("should interpolate indexes", async () => {
    let res = await interpret("{{#each list}}\n{{@index}}. {{this}}\n{{/each}}", {
      context: { list: ["HACKEM MUCHE", "FOOBIE BLETCH"] },
    });
    assertEquals(res, "0. HACKEM MUCHE\n" + "1. FOOBIE BLETCH\n");
  });

  it("should iterate objects", async () => {
    let res = await interpret("{{#each record}}\n{{@key}}. {{this}}\n{{/each}}", {
      context: { record: { current: "HACKEM MUCHE", previous: "READ ME" } },
    });
    assertEquals(res, "current. HACKEM MUCHE\n" + "previous. READ ME\n");
  });
});
