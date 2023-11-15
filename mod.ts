import { Context, Environment, HelperSet } from "./interp/environment.ts";
import { AST, parseTemplate } from "./hbs.ts";
import { interpretProgram } from "./interp/statement.ts";

export { Environment };
export type { Context, HelperSet };

export function interpret(
  template: AST.Program | string,
  context: Context,
  helpers?: HelperSet,
): Promise<string> {
  let env = new Environment(context, helpers ?? {});
  if (typeof template == "string") {
    template = parseTemplate(template);
  }
  return interpretProgram(env, template);
}
