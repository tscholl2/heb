import { go, IState as IRouterState } from "../addons/router";
import { SliceReducer, PartialReducer, PartialSliceReducer } from "./plugins";
import { IState } from "../model";

export const actions = {
  go: (path: string) => SliceReducer<IState, IRouterState>(["router"])(go(path)),
  updateCalculator: (value: string) => SliceReducer<IState, any>(["calculator"])(() => ({ value })),
  // not good example
  update: PartialReducer,
  updateIn: PartialSliceReducer,
};
