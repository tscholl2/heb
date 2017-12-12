import { initialState as routerState } from "../addons/router";

export const initialState = {
  router: routerState,
  title: "hello",
  count: 0,
  graph: { f: "3*sin(x)", a: 0, b: 20, N: 100 },
  calculator: { value: "" },
};

export type IState = typeof initialState;
