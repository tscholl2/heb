import { h, app } from "hyperapp";

import { router, newListener, Switch } from "./router";

type State = { count: number; router: typeof router.state };
type Actions = {
  down: () => Partial<State>;
  up: () => Partial<State>;
  router: { go: (url: string) => Partial<State> };
};

const initialState: State = { count: 0, router: router.state };

export function start(state = initialState) {
  const actions = app<State, Actions>({
    state: state,
    actions: {
      down: state => () => ({ count: state.count - 1 }),
      up: state => () => ({ count: state.count + 1 }),
      router: router.actions,
    },
    view: (state, actions) =>
      h(
        "main",
        { onupdate: () => ((window as any)["state"] = state) }, // better way to do this?
        [
          h("h1", undefined, state.count),
          h("button", { onclick: actions.up }, "+"),
          h("button", { onclick: actions.down }, "-"),
          h("h1", undefined, `page: ${state.router.url}`),
          h(
            "button",
            { onclick: () => actions.router.go(`/page${state.count}`) },
            "->",
          ),
          Switch({
            url: state.router.url,
            routes: [
              {
                route: "/page:id",
                component: ({ params }) =>
                  h("h6", undefined, `Page #${params.id}`),
              },
              {
                route: "*",
                component: () => h("h1", undefined, "404 - page not found"),
              },
            ],
          }),
        ],
      ),
  });
  newListener(actions);
}
