import { DefActions, Actions as HActions } from "hyperapp";
import { State } from "../state";

export interface Actions extends HActions<State> {
  router: {
    set: (path: string) => { path: string };
    go: (path: string) => void;
  };
  sortBy: (ascending: boolean) => void;
}

export const actions: Partial<DefActions<State, Actions>> = {
  sortBy: (_, __, ascending) => ({ sortAscending: ascending }),
};
