import { go, IState as IRouterState } from "../addons/router";
import { SliceReducer, PartialReducer, PartialSliceReducer } from "./plugins";
import { IState } from "../model";
import { IDispatch } from "./controller";

export const actions = {
  go: (path: string) => SliceReducer<IState, IRouterState>(["router"])(go(path)),
  updateCalculator: (value: string) => SliceReducer<IState, any>(["calculator"])(() => ({ value })),
  // not good example
  update: PartialReducer,
  updateIn: PartialSliceReducer,
};

export function bind(dispatch: IDispatch<IState>): <T extends {}>(actions: T) => T {
  return function wrap(a) {
    if (typeof a === "function") {
      return (...args: any[]) => dispatch(a(...args));
    }
    const a2: any = {};
    for (const k in a) {
      if (a.hasOwnProperty(k)) {
        a2[k] = wrap(a[k]);
      }
    }
    return a2;
  };
}

export function bindDebug(dispatch: IDispatch<IState>): <T extends {}>(actions: T) => T {
  return function wrap(a: any, path: string[] = []) {
    if (typeof a === "function") {
      return (...args: any[]) => {
        const r = a(...args);
        Object.assign(r, { __debug_name: path.join("."), __debug_args: args });
        dispatch(r);
      };
    }
    const a2: any = {};
    for (const k in a) {
      if (a.hasOwnProperty(k)) {
        a2[k] = wrap(a[k], path.concat([k]));
      }
    }
    return a2;
  };
}
