/*
  Usage:
  a = { json } //from ast-explorer
  extract("AssignmentExpression", a); //AssignmentExpression is an example. Whatever you wanna pluck.
*/

function extract(type, ast) {

  function match(t) {
    if (typeof t === "object" && t) {
      if (!(t instanceof Array)) {
        if (t.type === type) {
          return t;
        } else {
          return Object.keys(t).map(k => t[k]).map(x => match(x)).find(x => x)
        }
      } else {
        return t.map(x => match(x)).find(x => x);
      }
    } else {
      return false;
    }
  }

  const matchingAST = match(ast);

  function clean(ast) {
    if (typeof ast !== "object") {
      return ast;
    } else {
      const newObj = {};
      for (const key in ast) {
        if (!(["start", "end", "loc", "computed", "shorthand", "extra"].includes(key))) {
          newObj[key] = clean(ast[key]);
        }
      }
      return newObj;
    }
  }

  return clean(matchingAST);
}
