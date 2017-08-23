import { h, app } from "hyperapp";
import { mixins } from "./mixins";
import { State, initialState } from "./state";
import { actions, Actions } from "./actions";
import { Markdown } from "./components";

export default (state = initialState) => {
  app<State, Actions>({
    state,
    actions,
    view: (state, actions) =>
      h(
        "div",
        undefined,
        h("h1", undefined, Markdown(state.path)),
        h(
          "select",
          {
            onchange: (e: any) => actions.sortBy(e.target.value === "ascending"),
          },
          h("option", { selected: state.sortAscending }, "ascending"),
          h("option", { selected: !state.sortAscending }, "descending"),
        ),
        h(
          "div",
          undefined,
          state.listOfThings
            // this is to make a copy so we don't
            // sort the list in state
            .map(s => s)
            .sort((a, b) => {
              if (a > b) {
                return state.sortAscending ? 1 : -1;
              }
              if (a < b) {
                return state.sortAscending ? -1 : 1;
              }
              return 0;
            })
            .map(Markdown),
        ),
      ),
    mixins,
  });
};
