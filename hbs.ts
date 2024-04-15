import { AST } from "@handlebars/parser";

export type { AST };
export { parse as parseTemplate } from "@handlebars/parser";

export function requireMustacheStatement(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.MustacheStatement {
  if (obj.type != "MustacheStatement") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requireBlockStatement(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.BlockStatement {
  if (obj.type != "BlockStatement") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requirePartialStatement(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.PartialStatement {
  if (obj.type != "PartialStatement") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requirePartialBlockStatement(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.PartialBlockStatement {
  if (obj.type != "PartialBlockStatement") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requireContentStatement(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.ContentStatement {
  if (obj.type != "ContentStatement") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requireCommentStatement(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.CommentStatement {
  if (obj.type != "CommentStatement") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requireSubExpression(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.SubExpression {
  if (obj.type != "SubExpression") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requirePathExpression(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.PathExpression {
  if (obj.type != "PathExpression") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requireStringLiteral(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.StringLiteral {
  if (obj.type != "StringLiteral") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requireBooleanLiteral(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.BooleanLiteral {
  if (obj.type != "BooleanLiteral") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requireNumberLiteral(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.NumberLiteral {
  if (obj.type != "NumberLiteral") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requireUndefinedLiteral(
  obj: AST.Node,
  msg?: string,
): asserts obj is AST.UndefinedLiteral {
  if (obj.type != "UndefinedLiteral") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requireNullLiteral(obj: AST.Node, msg?: string): asserts obj is AST.NullLiteral {
  if (obj.type != "NullLiteral") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requireHash(obj: AST.Node, msg?: string): asserts obj is AST.Hash {
  if (obj.type != "Hash") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
export function requireHashPair(obj: AST.Node, msg?: string): asserts obj is AST.HashPair {
  if (obj.type != "HashPair") {
    throw new TypeError(msg ?? `unsupported type ${obj.type}`);
  }
}
