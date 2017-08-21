import { h, app, Emit, VirtualNode } from "hyperapp";
import { mixins } from "./mixins";
import { State, initialState } from "./state";
import { actions, Actions } from "./actions";
import { NewRouter } from "./components";

const router = NewRouter([
  { route: "/", component: () => h("p", undefined, "home") },
  { route: "/:id", component: ({ params: { id } }) => h("p", undefined, `id = ${id}`) },
  { route: "*", component: () => h("p", undefined, "not found") },
]);

export let emit: Emit;

export const NewWidget = <D>(view: (state: State, actions: Actions, data: D) => VirtualNode) => (
  data: D,
) => {
  const [state, actions] = emit("getStateAndActions");
  return view(state, actions, data);
};

export default (state = initialState) => {
  emit = app<State, Actions>({
    state,
    actions,
    events: {
      getStateAndActions: (state, actions) => [state, actions],
    },
    view: (state, actions) =>
      h(
        "div",
        undefined,
        h("h1", undefined, state.title),
        h("button", { onclick: () => actions.router.go("/p1") }, "hi"),
        router(state.path),
      ),
    mixins,
  });
};
