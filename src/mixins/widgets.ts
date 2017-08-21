import { Mixin, Emit } from "hyperapp";
import { State } from "../state";
import { Actions } from "../actions";

export let emit: Emit<{ getStateAndActions: any }>;

export const Widgets: Mixin<State, Actions> = e => {
  emit = e;
  return {
    events: {
      getStateAndActions: (state, actions) => [state, actions],
    },
  };
};
