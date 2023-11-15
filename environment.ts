import { Context, HelperSet } from "./types.ts";

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
