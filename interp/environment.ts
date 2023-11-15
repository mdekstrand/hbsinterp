/**
 * Context for interpreting a Handlebars template.
 */
export type Context = Record<string, unknown>;

/**
 * Interface for helper functions. Underspecified; the hash is passed as the
 * *last* argument, after the positional parameters.
 */
export type Helper = (
  ...args: unknown[]
) => unknown | Promise<unknown>;
/**
 * A set of helpers for rendering a template.
 */
export type HelperSet = Record<string, Helper>;

/**
 * Environment for an HBS interpreter.
 */
export class Environment {
  context: Context;
  helpers: HelperSet;

  constructor(ctx: Context, help: HelperSet) {
    this.context = ctx;
    this.helpers = help;
  }
}
