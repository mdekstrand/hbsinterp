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
  parent?: Environment;
  context: Context;
  helpers: HelperSet;

  constructor(ctx: Context, help: HelperSet) {
    this.context = ctx;
    this.helpers = help;
  }

  /**
   * Make an environment for an inner scope.  The scope is returned as a new
   * environment; the original environment is unchanged.
   * @param ctx The nested context.
   * @returns The inner-scope environment.
   */
  scope(ctx: Context): Environment {
    let kid = new Environment(ctx, this.helpers);
    kid.parent = this;
    return kid;
  }

  /**
   * Look up a variable in the environment.
   */
  lookup(name: string): unknown {
    if (name in this.context) {
      return this.context[name];
    } else if (this.parent) {
      return this.parent.lookup(name);
    } else {
      return undefined;
    }
  }
}
