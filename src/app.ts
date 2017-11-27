import { h, app } from "hyperapp";
import {
  newListener,
  initialState as routerInitialState,
  actions as routerActions,
  IState as IRouterState,
  IActions as IRouterActions,
} from "./router";
import {
  Calculator,
  initialState as calculatorInitialState,
  actions as calculatorActions,
  IState as ICalculatorState,
  IActions as ICalculatorActions,
} from "./components/calculator";
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
  calculator: calculatorInitialState,
  graph: graphInitialState,
};
const actions = {
  router: routerActions,
  calculator: calculatorActions,
  graph: graphActions,
};
type IState = {
  router: IRouterState;
  calculator: ICalculatorState;
  graph: IGraphState;
};
type IActions = {
  router: IRouterActions;
  calculator: ICalculatorActions;
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
                      state: state.calculator,
                      actions: actions.calculator,
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
