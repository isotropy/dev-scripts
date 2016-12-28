/*
  Usage:
  a = { json } //from https://astexplorer.net/
  extract("AssignmentExpression", a); //AssignmentExpression is an example. Whatever you wanna pluck.
*/

function extract(type, ast) {

  function match(t) {
    return (typeof t === "object" && t) ?
      (!(t instanceof Array) ?
        (t.type === type ? 
          t : 
          Object.keys(t).map(k => t[k]).map(x => match(x)).find(x => x)) :
        t.map(x => match(x)).find(x => x)) :
      false
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
