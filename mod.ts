import { AST, parseTemplate } from "./hbs.ts";
import { Context, HelperSet } from "./types.ts";

export type { Context, HelperSet } from "./types.ts";

export async function interpret(
  template: AST.Program | string,
  context: Context,
  helpers: HelperSet,
): Promise<string> {
  if (typeof template == "string") {
    template = parseTemplate(template);
  }
  return "";
}
