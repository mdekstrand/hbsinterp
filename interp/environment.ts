import { Helper } from "./helpers.ts";

/**
 * Context for interpreting a Handlebars template.
 */
export type Context = Record<string, unknown>;

export type { Helper };
/**
 * A set of helpers for rendering a template.
 */
export type HelperSet = Record<string, Helper>;

export type PartialLookup = (name: string) => string | undefined;

export type EnvSpec = {
  context?: Context;
  helpers?: HelperSet;
  partials?: Record<string, string> | PartialLookup;
  trace: (msg: string, ...args: unknown[]) => void;
};

export function wrapPartials(set: Record<string, string>): PartialLookup {
  return (name: string) => set[name];
}

/**
 * Environment for an HBS interpreter.
 */
export class Environment {
  parent?: Environment;
  context: Context;
  helpers: HelperSet;
  partials: PartialLookup;

  constructor(ctx: Context, help: HelperSet, partials: PartialLookup) {
    this.context = ctx;
    this.helpers = help;
    this.partials = partials;
  }

  static setup(spec: EnvSpec): Environment {
    let partials = spec.partials;
    if (typeof partials == "object") {
      partials = wrapPartials(partials);
    } else if (!partials) {
      partials = () => undefined;
    }
    let env = new Environment(spec.context ?? {}, spec.helpers ?? {}, partials);
    if (spec.trace) {
      env.trace = spec.trace;
    }
    return env;
  }

  /**
   * Trace template evaluation.
   * @param _msg The message (with format specifiers, for console.log)
   * @param _args The message arguments
   */
  trace(_msg: string, ..._args: unknown[]): void {}

  /**
   * Make an environment for an inner scope.  The scope is returned as a new
   * environment; the original environment is unchanged.
   * @param ctx The nested context.
   * @returns The inner-scope environment.
   */
  scope(ctx: Context): Environment {
    let kid = new Environment(ctx, this.helpers, this.partials);
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
