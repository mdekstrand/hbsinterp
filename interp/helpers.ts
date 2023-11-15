import { AST } from "../hbs.ts";
import { Environment } from "./environment.ts";
import { interpretExpression } from "./expression.ts";
import { interpretProgram } from "./statement.ts";

export type InternalBlockHelper = (
  this: Environment,
  block: AST.BlockStatement,
) => Promise<string | undefined>;

export const BLOCK_HELPERS: Record<string, InternalBlockHelper> = {
  async if(block) {
    if (block.params.length != 1) {
      throw new Error("#if helper accepts exactly one parameter");
    }
    let val = await interpretExpression(this, block.params[0]);
    if (val) {
      return interpretProgram(this, block.program);
    } else if (block.inverse) {
      return interpretProgram(this, block.inverse);
    } else {
      return undefined;
    }
  },
};
