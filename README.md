# Alternate Handlebars interpreter

[Handlebars]: https://handlebarsjs.com/

`hbsinterp` is a simple alternative [Handlebars][] interpreter, intended
primarily for cases where templates are only evaluated once (e.g. template
directives in content), not re-applying the same template to multiple contexts
(e.g. layouts).

* TypeScript-first.
* Supports asynchronous context data and helpers.
* Directly interprets the template (instead of compiling to and evaluating
  JavaScript).  This makes it slower than the original Handlebars when
  repeatedly evaluating a template, but should generally be faster when 
  evaluating a template once.

It uses the same parser as Handlebars, and directly evaluates the AST.

```typescript
import { interpret } from '@mdekstrand/hbsinterp';

let result = await interpret(templateText, {
    context: {
        var1: 'value',
    },
});
```
