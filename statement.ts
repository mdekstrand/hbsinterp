import { assert } from "std/assert/mod.ts";
import { AST } from "./hbs.ts";
import { Environment } from "./environment.ts";

type BlockVisit = (env: Environment, stmt: AST.Statement) => Promise<string | undefined>;

const HANDLERS: Record<string, BlockVisit> = {
  async ContentStatement(_env, stmt) {
    let cs = stmt as AST.ContentStatement;
    return cs.value;
  },
  async CommentStatement(_env, _stmt) {
    // noop
    return "";
  },
};

export async function interpretStatement(env: Environment, stmt: AST.Statement): Promise<string> {
  let h = HANDLERS[stmt.type];
  assert(h != null, `unsupported statement type ${stmt.type}`);
  let result = await h(env, stmt);
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
