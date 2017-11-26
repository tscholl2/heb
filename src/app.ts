declare const require: any;
const { h, app } = require("hyperapp");

import { module as router, routerListener } from "./router";

declare const window: any;

export const App = (state = { count: 0 }) =>
  routerListener(
    app({
      state: state,
      view: (state: any, actions: any) =>
        h(
          "main",
          { onupdate: () => (window["state"] = state) }, // better way to do this
          h("h1", undefined, state.count),
          h("button", { onclick: actions.up }, "+"),
          h("button", { onclick: actions.down }, "-"),
          h("h1", undefined, `page: ${state.router.url}`),
          h("button", { onclick: () => actions.router.go(`/page${state.count}`) }, "->"),
        ),
      actions: {
        down: (state: any) => ({ count: state.count - 1 }),
        up: (state: any) => ({ count: state.count + 1 }),
      },
      modules: { router: router() },
    }),
  );
