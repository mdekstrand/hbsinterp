import { assert } from "std/assert/mod.ts";
import { AST } from "./hbs.ts";

type BlockVisit = (stmt: AST.Statement) => Promise<string | undefined>;

const HANDLERS: Record<string, BlockVisit> = {
  async ContentStatement(stmt) {
    let cs = stmt as AST.ContentStatement;
    return cs.value;
  },
  async CommentStatement(_stmt) {
    // noop
    return "";
  },
};

export async function interpretStatement(stmt: AST.Statement): Promise<string> {
  let h = HANDLERS[stmt.type];
  assert(h != null, `invalid statement type ${stmt.type}`);
  let result = await h(stmt);
  return result ?? "";
}
