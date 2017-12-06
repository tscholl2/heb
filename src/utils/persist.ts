export function setIn(obj: any, path: string[], value: any = {}) {
  if (path.length === 0) {
    return obj;
  }
  if (path.length === 1) {
    obj[path[0]] = value;
    return obj;
  }
  obj[path[0]] = setIn(obj[path[0]], path.slice(1), value);
  return obj;
}

const save = (state: any) => ((window as any)["state"] = state);
const load = () => (window as any)["state"] || {};

const wrapAction = (a: any, path: string[] = []) => (...args: any[]) => {
  const oldState = load();
  const newSubState = a(...args);
  save(setIn(oldState, path, newSubState));
  return newSubState;
};

function wrapActions(a: any, path: string[] = []) {
  if (typeof a === "function") {
    return wrapAction(a, path);
  }
  for (let k of Object.keys(a)) {
    if (typeof a[k] === "function") {
      a[k] = wrapAction(a[k], path);
    } else {
      a[k] = wrapActions(a[k], path.concat([k]));
    }
  }
  return a;
}

export function persist(app: any) {
  return function(a: any, c: any) {
    a.actions = wrapActions(a.actions);
    save(a.state);
    return app(a, c);
  };
}
