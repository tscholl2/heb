import { IReducer } from "./index";
import * as icepick from "icepick";

const preFix = <S>(pre: (state: S) => S) => (r: IReducer<S>): IReducer<S> => state => r(pre(state));

const postFix = <S>(fn: (newState: S, oldState: S) => S) => {
  const apply = (r: IReducer<S>) => (state: S) => {
    const next = r(state);
    if (next && typeof (next as any).then === "function") {
      return (next as Promise<IReducer<S>>).then(apply);
    }
    return fn(next as S, state);
  };
  return apply;
};

// Allows a reducer to return Partial<State>.
export const PartialReducer = postFix((newState, oldState) => icepick.merge(oldState, newState));

// Allows a reducer to get and return a slice of the whole state.
export const SliceReducer = (path: string[]) => (reducer: IReducer) => {
  const after = postFix((newState, oldState) => icepick.setIn(oldState, path, newState));
  const before = preFix(state => icepick.getIn(state, path));
  return after(before(reducer));
};

// Compines Partial and Slicing.
export const PartialSliceReducer = (path: string[]) => (reducer: IReducer) =>
  PartialReducer(SliceReducer(path)(reducer));
