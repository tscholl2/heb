import { h, app } from "hyperapp";
import {
  newListener,
  initialState as routerInitialState,
  actions as routerActions,
  IActions as IRouterActions,
} from "./router";
import { Calculator } from "./components/calculator";
import { Graph } from "./components/graph";
import { Switch } from "./components/switch";

const state = {
  router: routerInitialState,
  graph: { f: "3*sin(x)", a: 0, b: 20, N: 100 },
  calculator: { value: "" },
};
type IState = typeof state;
const actions = {
  router: routerActions,
  calculator: { update: () => (value: string) => ({ value }) },
  graph: { update: () => (S: Partial<typeof state.graph>) => S },
};
type IActions = {
  router: IRouterActions;
  calculator: { update: (value: string) => any };
  graph: { update: (value: Partial<typeof state.graph>) => any };
};

export function start(initialState = state) {
  const appActions = app<IState, IActions>({
    state: initialState,
    actions: actions,
    view: (state, actions) =>
      h(
        "div",
        { class: "container", onupdate: () => ((window as any)["state"] = state) }, // better way to do this?
        [
          h("header", undefined, "Sample App"),
          h("aside", undefined, [
            h("button", { onclick: () => actions.router.go("/calculator") }, "Calculator"),
            h("button", { onclick: () => actions.router.go("/graph") }, "Graph"),
            h("button", { onclick: () => actions.router.go("/page3") }, "About"),
          ]),
          h(
            "main",
            undefined,
            Switch({
              url: state.router.url,
              routes: [
                {
                  route: "/page:id",
                  component: ({ params }) => h("h6", undefined, `Page #${params.id}`),
                },
                {
                  route: "/calculator",
                  component: () =>
                    Calculator({
                      value: state.calculator.value,
                      update: actions.calculator.update,
                    }),
                },
                {
                  route: "/graph",
                  component: () => Graph({ ...state.graph, update: actions.graph.update }),
                },
                {
                  route: "*",
                  component: () => h("h1", undefined, "404 - page not found"),
                },
              ],
            }),
          ),
          h("footer", undefined, "Footer"),
        ],
      ),
  });
  newListener(appActions);
}
