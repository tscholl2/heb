import { h } from "picodom";
import { IDispatch } from "../controller";
import { IState } from "../model";

export function view(state: IState, dispatch: IDispatch<IState>) {
  return h("div", null, [
    h("h1", null, [state.message]),
    h("input", {
      value: state.message,
      oninput: (e: any) => dispatch(() => ({ message: e.target.value, count: state.count })),
    }),
    h("h1", null, [state.count]),
    h(
      "button",
      {
        onclick: () =>
          dispatch(
            () =>
              new Promise(resolve => {
                for (let i = 0; i < 100; i++) {
                  dispatch(state => ({ message: state.message, count: state.count + 1 }));
                }
                setTimeout(
                  () => resolve(state => ({ message: state.message, count: state.count + 1 })),
                  500,
                );
              }),
          ),
      },
      ["↑"],
    ),
  ]);
}


export function start(state = initialState) {
  const appActions = (persist(app) as typeof app)<IState, IActions>({
    state: state,
    actions: {
      router: routerActions,
      calculator: { update: value => ({ value }) },
      graph: { update: s => s },
    },
    view: state => actions =>
      h(
        "div",
        { class: "container" },
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
