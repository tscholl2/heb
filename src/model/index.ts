export const initialState = {
  router: { path: "" },
  graph: { f: "3*sin(x)", a: 0, b: 20, N: 100 },
  calculator: { value: "" },
};

export type IState = typeof initialState;
