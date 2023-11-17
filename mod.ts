import { Context, Environment, EnvSpec, HelperSet, wrapPartials } from "./interp/environment.ts";
import { AST, parseTemplate } from "./hbs.ts";
import { interpretProgram } from "./interp/statement.ts";
export { safe } from "./interp/strings.ts";

export { Environment };
export type { Context, HelperSet };

export function interpret(template: AST.Program | string, spec: EnvSpec): Promise<string> {
  let partials = spec.partials;
  if (typeof partials == "object") {
    partials = wrapPartials(partials);
  } else if (!partials) {
    partials = () => undefined;
  }
  let env = new Environment(spec.context ?? {}, spec.helpers ?? {}, partials);
  if (typeof template == "string") {
    template = parseTemplate(template);
  }
  return interpretProgram(env, template);
}
