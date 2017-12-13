import { h } from "picodom";
import { IDispatch, actions } from "../controller";
import { initialState, IState } from "../model";

export function view(state = initialState, dispatch: IDispatch<IState>) {
  return h("div", undefined, [
    h("h1", undefined, [state.title]),
    h("input", {
      value: state.title,
      oninput: (e: any) => dispatch(actions.update(_ => ({ title: e.target.value }))),
    }),
    h("h1", undefined, [state.router.path]),
    h("button", { onclick: () => dispatch(actions.go("/foo")) }, ["→"]),
    h("h1", undefined, [state.count]),
    h(
      "button",
      {
        onclick: () =>
          dispatch(
            () =>
              new Promise(resolve => {
                for (let i = 0; i < 100; i++) {
                  dispatch(actions.update((s: any) => ({ count: s.count + 1 })));
                }
                setTimeout(
                  () => resolve(actions.update((s: any) => ({ count: s.count + 1 }))),
                  500,
                );
              }),
          ),
      },
      ["↑"],
    ),
  ]);
}

/*
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
          h("footer", undefined, "Footer"),
        ],
      ),
*/
