import { assert } from "std/assert/mod.ts";
import { escape } from "std/html/mod.ts";

import { AST, parseTemplate, requirePathExpression } from "../hbs.ts";
import { Context, Environment } from "./environment.ts";
import { interpretExpression, interpretHash } from "./expression.ts";
import { visit, VisitHandlers } from "./visit.ts";
import { BLOCK_HELPERS, HELPERS, wrapBasicHelper } from "./helpers.ts";
import { SafeString } from "./strings.ts";

const HANDLERS: VisitHandlers<Environment> = {
  ContentStatement(stmt) {
    return stmt.value;
  },
  CommentStatement() {
    // noop
    return "";
  },

  async MustacheStatement(stmt) {
    let result: unknown;
    if (stmt.params.length || stmt.hash?.pairs.length) {
      requirePathExpression(stmt.path);
      let name = stmt.path.head;
      assert(typeof name == "string", "subexpressions not supported");
      assert(stmt.path.tail.length == 0, "compound partial paths not supported");
      let helper = this.helpers[name];
      let impl = helper ? wrapBasicHelper(helper) : HELPERS[name];
      if (!impl) throw new Error(`unknown helper ${name}`);
      let val = await impl.call(this, stmt.params, stmt.hash);
      result = val?.toString();
    } else {
      let main = await interpretExpression(this, stmt.path);
      result = main?.toString();
    }
    if (result instanceof SafeString || result == null) {
      return result?.content;
    }
    let text = result.toString();
    if (stmt.escaped) {
      return escape(text);
    } else {
      return text;
    }
  },

  BlockStatement(stmt) {
    let name = stmt.path.head;
    if (stmt.path.tail?.length) {
      throw new TypeError("block helper references must be single names");
    }
    if (typeof name != "string") {
      throw new TypeError("subexpressions not supported");
    }

    // TODO support custom block helpers
    let helper = BLOCK_HELPERS[name];
    if (!helper) {
      throw new Error(`undefined helper ${name}`);
    }
    return helper.call(this, stmt);
  },

  async PartialStatement(stmt) {
    let nameExpr = stmt.name;
    requirePathExpression(nameExpr);
    let name = nameExpr.head;
    assert(typeof name == "string", "subexpressions not supported");
    assert(nameExpr.tail.length == 0, "compound partial paths not supported");
    let inner = this.partials(name);
    if (!inner) {
      throw new Error(`undefined partial ${name}`);
    }
    let partial = parseTemplate(inner);
    // deno-lint-ignore no-this-alias
    let scope = this;
    if (stmt.params.length) {
      assert(stmt.params.length == 1, "multiple parameters to partial not allowed");
      let child = await interpretExpression(this, stmt.params[0]);
      if (typeof child != "object") {
        throw new TypeError("helper context must be object");
      }
      scope = scope.scope(child as Context);
    }
    if (stmt.hash) {
      let context = await interpretHash(this, stmt.hash);
      scope = scope.scope(context);
    }
    return interpretProgram(scope, partial);
  },
};

export async function interpretStatement(env: Environment, stmt: AST.Statement): Promise<string> {
  let result = await visit(env, stmt, HANDLERS);
  return result ?? "";
}

export async function interpretProgram(env: Environment, prog: AST.Program) {
  // javsacript string concat is super fast, just use it
  let output = "";
  for (let stmt of prog.body) {
    output += await interpretStatement(env, stmt);
  }
  return output;
}
