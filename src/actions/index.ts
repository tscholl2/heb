import { go } from "../addons/router";
import { SliceReducer, PartialReducer } from "../controller/plugins";
// import { IState } from "../model";

const update = <S>(s: Partial<S> | ((state: S) => Partial<S>)) =>
  typeof s === "function" ? PartialReducer(s) : PartialReducer(() => s);

export const actions = {
  go: (path: string) => SliceReducer(["router"])(go(path)),
  updateCalculator: (value: string) => SliceReducer(["calculator"])(() => ({ value })),
  // not good example
  update,
  updateIn: (path: string[]) => SliceReducer(path)(update),
};
