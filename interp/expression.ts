// deno-lint-ignore-file no-explicit-any
import { assert } from "std/assert/mod.ts";
import { AST } from "../hbs.ts";
import { Context, Environment } from "./environment.ts";
import { visit, VisitHandlers } from "./visit.ts";

type Literal = string | number | boolean | undefined | null;

const LITERALS: VisitHandlers<Environment, Literal> = {
  StringLiteral(lit) {
    return lit.value;
  },
  NumberLiteral(lit) {
    return lit.value;
  },
  BooleanLiteral(lit) {
    return lit.value;
  },
  UndefinedLiteral() {
    return undefined;
  },
  NullLiteral() {
    return null;
  },
};

const HANDLERS: VisitHandlers<Environment, any> = {
  PathExpression(path) {
    let name = path.head;
    if (name === undefined) {
      name = "$this";
    }

    assert(typeof name == "string", "subexpressions not supported");
    if (path.data) {
      name = `@${name}`;
    }
    let val = this.lookup(name) as any;
    for (let part of path.tail) {
      val = val[part];
    }
    return val;
  },
  ...LITERALS,
};

export function interpretExpression(
  env: Environment,
  expr: AST.Expression,
): Promise<unknown> {
  return visit(env, expr, HANDLERS);
}

export async function interpretHash(env: Environment, hash: AST.Hash): Promise<Context> {
  let context: Context = {};
  for (let pair of hash.pairs) {
    context[pair.key] = await interpretExpression(env, pair.value);
  }
  return context;
}
