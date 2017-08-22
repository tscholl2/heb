import { h, app } from "hyperapp";
import { mixins } from "./mixins";
import { State, initialState } from "./state";
import { actions, Actions } from "./actions";
import { NewRouter, Link } from "./components";

const router = NewRouter([
  { route: "/", component: () => h("p", undefined, "home") },
  { route: "/:id", component: ({ params: { id } }) => h("p", undefined, `id = ${id}`) },
  { route: "*", component: () => h("p", undefined, "not found") },
]);

export default (state = initialState) => {
  app<State, Actions>({
    state,
    actions,
    view: (state, actions) =>
      h(
        "div",
        undefined,
        h("h1", undefined, state.title),
        h("button", { onclick: () => actions.router.go("/p1") }, "hi"),
        router(state.path),
        h("div", undefined, ["a", "b"]),
        h("div", undefined, "a", "b"),
        Link({ path: "/p2" }),
      ),
    mixins,
  });
};
