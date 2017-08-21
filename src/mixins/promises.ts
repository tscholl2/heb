import { Mixin } from "hyperapp";
import { State } from "../state";
import { Actions } from "../actions";

export const Promises: Mixin<State, Actions> = emit => ({
  events: {
    resolve: (_, __, result) => {
      if (result && typeof result.then === "function") {
        // unclear how this works
        return result.then((r?: Partial<State>) => emit("update", r) && result);
      }
    },
  },
});
