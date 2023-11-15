import { AST } from "../hbs.ts";
import { Environment } from "./environment.ts";
import { interpretExpression } from "./expression.ts";
import { visit, VisitHandlers } from "./visit.ts";

type BlockVisit = (env: Environment, stmt: AST.Statement) => Promise<string | undefined>;

const HANDLERS: VisitHandlers<Environment> = {
  ContentStatement(stmt) {
    return stmt.value;
  },
  CommentStatement() {
    // noop
    return "";
  },
  async MustacheStatement(stmt) {
    let main = await interpretExpression(this, stmt.path);
    return main?.toString();
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
