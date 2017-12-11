import { IReducer } from "./index";
const icepick = require("icepick");

const preFix = (pre: (state: any) => any) => (r: IReducer) => (state: any) => r(pre(state));

const postFix = (post: (newState: any, oldState: any) => any) => (r: IReducer) => {
  return function apply(state: any) {
    const next = r(state);
    if (next == null) {
      return;
    }
    if (next && typeof next.then === "function") {
      return (next as any).then(apply);
    }
    return post(next, state);
  };
};

// Allows a reducer to return Partial<State>.
export const PartialReducer = postFix((newState, oldState) => ({ ...oldState, ...newState }));

// Allows a reducer to get and return a slice of the whole state.
export const SliceReducer = (path: string[]) => (reducer: IReducer) => {
  const after = postFix((newState, oldState) => icepick.setIn(oldState, path, newState));
  const before = preFix(state => path.reduce((p, n) => p[n], state));
  return after(before(reducer));
};

// Compines Partial and Slicing.
export const PartialSliceReducer = (path: string[]) => (reducer: IReducer) =>
  PartialReducer(SliceReducer(path)(reducer));
