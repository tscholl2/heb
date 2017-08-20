import { h, app } from "hyperapp";
import { mixins } from "./mixins";
import { State, initialState } from "./state";
import { actions, Actions } from "./actions";

export default (state = initialState) => {
  app<State, Actions, { route: any }>({
    state,
    actions,
    view: (state, actions) =>
      h(
        "div",
        undefined,
        h("h1", undefined, state.title),
        h("button", { onclick: () => actions.router.go("p1") }, "hi"),
      ),
    mixins,
  });
};
