// deno-lint-ignore-file no-explicit-any
import { assert } from "std/assert/mod.ts";
import { AST } from "../hbs.ts";
import { Environment } from "./environment.ts";
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
    assert(typeof name == "string", "subexpressions not supported");
    let val = this.context[name] as any;
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
