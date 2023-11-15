import { Environment } from "./environment.ts";
import { AST, parseTemplate } from "./hbs.ts";
import { interpretProgram } from "./statement.ts";
import { Context, HelperSet } from "./types.ts";

export type { Context, HelperSet } from "./types.ts";

export async function interpret(
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
