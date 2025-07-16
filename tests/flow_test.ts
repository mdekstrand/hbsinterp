import assert from "node:assert/strict";

import { describe, it } from "mocha";

import { interpret } from "../mod.js";

describe("the #if helper", () => {
  it("should omit on false", async () => {
    let res = await interpret("{{#if false}}yes{{/if}}", {});
    assert.equal(res, "");
  });

  it("should include on true", async () => {
    let res = await interpret("{{#if true}}yes{{/if}}", {});
    assert.equal(res, "yes");
  });

  it("should return else on false", async () => {
    let res = await interpret("{{#if false}}yes{{else}}no{{/if}}", {});
    assert.equal(res, "no");
  });
  it("should ignore else on true", async () => {
    let res = await interpret("{{#if true}}yes{{else}}no{{/if}}", {});
    assert.equal(res, "yes");
  });

  it("should switch on variable", async () => {
    let t = "{{#if flag}}yes{{else}}no{{/if}}";
    let res = await interpret(t, { context: { flag: true } });
    assert.equal(res, "yes");

    res = await interpret(t, { context: { flag: false } });
    assert.equal(res, "no");
  });
});

describe("the #each helper", () => {
  it("should omit on empty", async () => {
    let res = await interpret("{{#each list}}yes{{/each}}", { context: { list: [] } });
    assert.equal(res, "");
  });
  it("should omit on undefined", async () => {
    let res = await interpret("{{#each list}}yes{{/each}}", {});
    assert.equal(res, "");
  });
  it("should include on single value", async () => {
    let res = await interpret("{{#each list}}yes{{/each}}", {
      context: { list: ["HACKEM MUCHE"] },
    });
    assert.equal(res, "yes");
  });
  it("should interpolate {{this}} on single value", async () => {
    let res = await interpret("{{#each list}}{{this}}{{/each}}", {
      context: { list: ["HACKEM MUCHE"] },
    });
    assert.equal(res, "HACKEM MUCHE");
  });

  it("should return else on empty", async () => {
    let res = await interpret("{{#each list}}yes{{else}}no{{/each}}", { context: { list: [] } });
    assert.equal(res, "no");
  });

  it("should interpolate indexes", async () => {
    let res = await interpret("{{#each list}}\n{{@index}}. {{this}}\n{{/each}}", {
      context: { list: ["HACKEM MUCHE", "FOOBIE BLETCH"] },
    });
    assert.equal(res, "0. HACKEM MUCHE\n" + "1. FOOBIE BLETCH\n");
  });

  it("should iterate objects", async () => {
    let res = await interpret("{{#each record}}\n{{@key}}. {{this}}\n{{/each}}", {
      context: { record: { current: "HACKEM MUCHE", previous: "READ ME" } },
    });
    assert.equal(res, "current. HACKEM MUCHE\n" + "previous. READ ME\n");
  });
});
