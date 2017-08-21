import { Mixin } from "hyperapp";
import { State } from "../state";
import { Actions } from "../actions";

export const Router: Mixin<State, Actions> = emit => ({
  actions: {
    router: {
      set: (_, __, path) => ({ path }),
      go: (_, actions, path) => {
        if (location.pathname + location.search !== path) {
          history.pushState({}, "", path);
          actions.router.set(emit("route", path));
        }
      },
    },
  },
  events: {
    load(_, actions) {
      addEventListener("popstate", () => actions.router.set(emit("route", location.pathname)));
      actions.router.set(emit("route", location.pathname));
    },
  },
});
