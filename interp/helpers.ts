import { AST } from "../hbs.ts";
import { Context, Environment } from "./environment.ts";
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

  async each(block) {
    if (block.params.length != 1) {
      throw new Error("#each helper accepts exactly one parameter");
    }
    let iter = await interpretExpression(this, block.params[0]) as any;
    let content = "";
    let n = 0;
    if (iter) {
      for (let x of iter) {
        let scope = this.scope({
          $this: x,
          "@index": n,
          "@first": n == 0,
        });
        if (typeof x == "object") {
          scope = scope.scope(x as Context);
        }
        let result = await interpretProgram(scope, block.program);
        content += result;
        n += 1;
      }
    }

    if (n) {
      return content;
    } else if (block.inverse) {
      return await interpretProgram(this, block.inverse);
    }
  },

  async with(block) {
    if (block.params.length != 1) {
      throw new Error("#with helper accepts exactly one parameter");
    }
    let val = await interpretExpression(this, block.params[0]);
    let scope = this.scope({ this: val });
    if (typeof val == "object") {
      scope = scope.scope(val as Context);
    }
    return interpretProgram(scope, block.program);
  },
};
