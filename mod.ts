import { Context, Environment, EnvSpec, Helper, HelperSet } from "./interp/environment.ts";
import { AST, parseTemplate } from "./hbs.ts";
import { interpretProgram } from "./interp/statement.ts";
export { safe } from "./interp/strings.ts";
import type { SafeString } from "./interp/strings.ts";

export { Environment };
export type { Context, Helper, HelperSet, SafeString };

/**
 * Evaluate a template with a specified context or environment.
 *
 * @param template The template text.
 * @param spec The template environment.
 * @returns The evaluated template.
 */
export function interpret(template: AST.Program | string, spec: EnvSpec): Promise<string> {
  let env = Environment.setup(spec);
  if (typeof template == "string") {
    template = parseTemplate(template);
  }
  return interpretProgram(env, template);
}
