// deno-lint-ignore-file no-explicit-any
import { assert } from "std/assert/mod.ts";
import { AST } from "../hbs.ts";
import { Environment } from "./environment.ts";
import { visit, VisitHandlers } from "./visit.ts";

type BlockVisit = (env: Environment, expr: AST.Expression) => Promise<string | undefined>;

const HANDLERS: VisitHandlers<Environment, any> = {
  async PathExpression(path) {
    let name = path.head;
    assert(typeof name == "string", "subexpressions not supported");
    let val = this.context[name] as any;
    for (let part of path.tail) {
      val = val[part];
    }
    return val;
  },
};

export async function interpretExpression(
  env: Environment,
  expr: AST.Expression,
): Promise<unknown> {
  return visit(env, expr, HANDLERS);
}
