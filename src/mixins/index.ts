import { Mixin, Event } from "hyperapp";
import { State } from "../state";
import { Actions } from "../actions";
import hmr from "hyperapp-webpack-hmr";

export const Router: Mixin<State, Actions, { route: Event<State, Actions, string> }> = emit => ({
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
    load: function(_, actions) {
      addEventListener("popstate", () => actions.router.set(emit("route", location.pathname)));
      actions.router.set(emit("route", location.pathname));
      return;
    },
  },
});

export const Promises: Mixin<State> = emit => ({
  events: {
    resolve: (_, __, result) => {
      if (result && typeof result.then === "function") {
        // unclear how this works
        return result.then((r?: Partial<State>) => emit("update", r) && result);
      }
    },
  },
});

export const mixins = [hmr({ name: "state" }), Router, Promises];
