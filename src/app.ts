declare const require: any;
const { h, app } = require("hyperapp");

import { newModule as newRouter, newListener as newRouterListener } from "./router";

declare const window: any;

export function start(initialState = { count: 0 }) {
  const actions = app({
    state: initialState,
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
    modules: { router: newRouter() },
  });
  newRouterListener(actions);
}
