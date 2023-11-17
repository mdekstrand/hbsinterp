import { Context, Environment, EnvSpec, Helper, HelperSet } from "./interp/environment.ts";
import { AST, parseTemplate } from "./hbs.ts";
import { interpretProgram } from "./interp/statement.ts";
export { safe } from "./interp/strings.ts";

export { Environment };
export type { Context, Helper, HelperSet };

export function interpret(template: AST.Program | string, spec: EnvSpec): Promise<string> {
  let env = Environment.setup(spec);
  if (typeof template == "string") {
    template = parseTemplate(template);
  }
  return interpretProgram(env, template);
}
