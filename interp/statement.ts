import { AST } from "../hbs.ts";
import { Environment } from "./environment.ts";
import { interpretExpression } from "./expression.ts";
import { visit, VisitHandlers } from "./visit.ts";
import { BLOCK_HELPERS } from "./helpers.ts";

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
