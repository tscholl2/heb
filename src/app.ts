import { h, app } from "hyperapp";
import {
  newListener,
  initialState as routerInitialState,
  actions as routerActions,
  IState as IRouterState,
  IActions as IRouterActions,
} from "./router";
import { Calculator } from "./components/calculator";
import {
  Graph,
  initialState as graphInitialState,
  actions as graphActions,
  IState as IGraphState,
  IActions as IGraphActions,
} from "./components/graph";
import { Switch } from "./components/switch";

const state = {
  router: routerInitialState,
  graph: graphInitialState,
  calculator: { value: "" },
};
type IState = {
  router: IRouterState;
  graph: IGraphState;
  calculator: { value: string };
};
const actions = {
  calculator: { update: () => (value: string) => ({ value }) },
  router: routerActions,
  graph: graphActions,
};
type IActions = {
  calculator: { update: (value: string) => any };
  router: IRouterActions;
  graph: IGraphActions;
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
                  component: () => Graph({ state: state.graph, actions: actions.graph }),
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
