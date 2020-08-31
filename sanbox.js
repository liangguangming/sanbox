function compileCode(src) {
  src = `with (exposeObj) { ${src} }`;
  return new Function("exposeObj", src);
}

function proxyObj(originObj) {
  let exposeObj = new Proxy(originObj, {
    has: (target, key) => {
      if (target.hasOwnProperty(key)) {
        return target[key];
      } else {
        throw new Error("illegal operation");
      }
    }
  });

  return exposeObj;
}

const contextObj = {
  Math: Math,
  Date: Date,
  RegExp: RegExp,
  Map: Map,
  Set: Set,
  Array: Array,
  inputStr: ""
};

function createSandbox(src, inputStr) {
  contextObj.inputStr = inputStr || "";
  let proxy = proxyObj(contextObj);

  const result = compileCode(src).call(proxy, proxy);
  return result;
}

module.exports = createSandbox;