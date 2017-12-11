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
