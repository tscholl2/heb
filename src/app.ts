import { h, app } from "hyperapp";
import {
  newListener,
  initialState as routerInitialState,
  actions as routerActions,
  IActions as IRouterActions,
} from "./router";
import { Calculator } from "./components/calculator";
import { Graph } from "./components/graph";
import { StaticSwitch } from "./components/switch";
import "./style.scss";

const initialState = {
  router: routerInitialState,
  graph: { f: "3*sin(x)", a: 0, b: 20, N: 100 },
  calculator: { value: "" },
};
type IState = typeof initialState;
type IActions = {
  router: IRouterActions;
  calculator: { update(value: string): Partial<IState["calculator"]> };
  graph: { update(value: Partial<IState["graph"]>): Partial<IState["graph"]> };
};

const Switch2 = StaticSwitch(["/page:id", "/calculator", "/graph", "*"]);

export function start(state = initialState) {
  const appActions = app<IState, IActions>({
    state: state,
    actions: {
      router: routerActions,
      calculator: { update: value => ({ value }) },
      graph: { update: s => s },
    },
    view: state => actions =>
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
            Switch2({
              path: state.router.path,
              components: [
                ({ params }) => h("h6", undefined, `Page #${params.id}`),
                () =>
                  Calculator({
                    value: state.calculator.value,
                    update: actions.calculator.update,
                  }),
                () => Graph({ ...state.graph, update: actions.graph.update }),
                () => h("h1", undefined, "404 - page not found"),
              ],
            }),
          ),
          /*
          h(
            "main",
            undefined,
            Switch({
              path: state.router.path,
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
          */
          h("footer", undefined, "Footer"),
        ],
      ),
  });
  newListener(appActions.router.go);
}
