import { AST } from "../hbs.ts";

export type Result = string | undefined | Promise<string | undefined>;

export interface VisitHandlers<T, R = Result> {
  Program?(this: T, prog: AST.Program): R;

  MustacheStatement?(this: T, stmt: AST.MustacheStatement): R;
  Decorator?(this: T, stmt: AST.Decorator): R;

  BlockStatement?(this: T, stmt: AST.BlockStatement): R;
  DecoratorBlock?(this: T, stmt: AST.DecoratorBlock): R;

  PartialStatement?(this: T, prog: AST.PartialStatement): R;
  PartialBlockStatement?(this: T, prog: AST.PartialBlockStatement): R;

  ContentStatement?(this: T, stmt: AST.ContentStatement): R;
  CommentStatement?(this: T, stmt: AST.CommentStatement): R;

  SubExpression?(this: T, expr: AST.SubExpression): R;

  PathExpression?(this: T, expr: AST.PathExpression): R;

  StringLiteral?(this: T, expr: AST.StringLiteral): R;
  NumberLiteral?(this: T, expr: AST.NumberLiteral): R;
  BooleanLiteral?(this: T, expr: AST.BooleanLiteral): R;
  UndefinedLiteral?(this: T, expr: AST.UndefinedLiteral): R;
  NullLiteral?(this: T, expr: AST.NullLiteral): R;

  Hash?(this: T, hash: AST.Hash): R;
  HashPair?(this: T, pair: AST.HashPair): R;
}

export async function visit<T, R>(
  ctx: T,
  node: AST.Node,
  handlers: VisitHandlers<T, R>,
): Promise<R> {
  let hobj = handlers as Record<string, (this: T, node: AST.Node) => R>;
  let h = hobj[node.type];
  if (h) {
    return await h.call(ctx, node);
  } else {
    throw new TypeError(`no handler for node type ${node.type}`);
  }
}
