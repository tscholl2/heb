import { IReducer } from "./index";
import { merge, setIn, getIn } from "icepick";

type IDeepPartial<S> = Partial<{ [key in keyof S]: IDeepPartial<S[key]> }>;

// Allows a reducer to return Partial<State>.
export type IPartialReducer<S = any> = Partial<S> | ((state: S) => undefined | IDeepPartial<S>);
export function PartialReducer<S = any>(fn: IPartialReducer<S>): IReducer<S> {
  return state => {
    const next = typeof fn === "object" ? fn : fn(state);
    if (next === undefined) {
      return state;
    }
    return state == null ? next : merge(state, next);
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
