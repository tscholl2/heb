import { IReducer } from "./index";
import { merge, setIn, getIn } from "icepick";

// Allows a reducer to return Partial<State>.
export type IPartialReducer<S = any> = Partial<S> | ((state: S) => undefined | Partial<S>);
export function PartialReducer<S = any>(fn: IPartialReducer<S>): IReducer<S> {
  return state => {
    const next = typeof fn === "function" ? fn(state) : fn;
    if (state === undefined) {
      return next as any;
    }
    return next == null ? state : merge(state, next);
  };
}

// Given a reducer for a substate T of S, returns a reducer for S by wrapping
// the reducer with getIn and setIn.
export function SliceReducer<S, T = S>(path: string[]): (r: IReducer<T>) => IReducer<S> {
  return r => state => setIn(state, path, r(getIn(state, path)));
}

// Compines Partial and Slicing.
export const PartialSliceReducer = <S = any, T = S>(path: string[]) => (fn: IPartialReducer<T>) =>
  SliceReducer<S, T>(path)(PartialReducer<T>(fn));

export function CombineReducerList<S>(arr: IReducer<S>[]): IReducer<S> {
  return (s: S) => arr.reduce((p, n) => n(p), s);
}
