import { IReducer } from "./index";
import { merge, setIn, getIn } from "icepick";

// Allows a reducer to return Partial<State>.
export type IPartialReducer<S = any> =
  | Partial<S>
  | ((state: S) => Partial<S> | Promise<Partial<S>>);
export function PartialReducer<S = any>(fn: IPartialReducer<S>): IReducer<S> {
  return async state => {
    const next = typeof fn === "object" ? fn : await fn(state);
    return state == null ? next : merge(state, next);
  };
}

// Given a reducer for a substate T of S, returns a reducer for S by wrapping
// the reducer with getIn and setIn.
export function SliceReducer<S, T = S>(path: string[]): (r: IReducer<T>) => IReducer<S> {
  return r => async state => setIn(state, path, await r(getIn(state, path)));
}

// Compines Partial and Slicing.
export const PartialSliceReducer = <S = any, T = S>(path: string[]) => (fn: IPartialReducer<T>) =>
  SliceReducer<S, T>(path)(PartialReducer<T>(fn));

export function CombineReducerList<S>(arr: IReducer<S>[]): IReducer<S> {
  return async (s: S) => {
    for (let i = 0; i < arr.length; i++) {
      s = await arr[i](s);
    }
    return s;
  };
}
