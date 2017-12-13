import { IReducer } from "./index";
import { merge, setIn, getIn } from "icepick";

function isPromise(a: any): boolean {
  return a && typeof a.then === "function";
}

// Allows a reducer to return Partial<State>.
export type IPartialReducer<S = any> =
  | Partial<S>
  | ((state: S) => Partial<S> | Promise<IPartialReducer<S>>);
export const PartialReducer = <S = any>(fn: IPartialReducer<S>): IReducer<S> => (state: S) => {
  const next = typeof fn === "function" ? fn(state) : fn;
  state = state || (typeof next === "object" ? {} : []);
  return isPromise(next) ? (next as any).then(PartialReducer) : merge(state, next);
};

// Given a reducer for a substate T of S, returns a reducer for S.
export const SliceReducer = <S = any, T = S>(path: string[]) => (r: IReducer<T>): IReducer<S> => (
  state: S,
) => {
  const next = r(getIn(state, path));
  return isPromise(next) ? (next as any).then(SliceReducer(path)) : setIn(state, path, next);
};

// Compines Partial and Slicing.
export const PartialSliceReducer = <S = any, T = S>(path: string[]) => (fn: IPartialReducer<T>) =>
  SliceReducer<S, T>(path)(PartialReducer<T>(fn));
