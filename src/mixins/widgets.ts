import { Mixin, Emit, Component } from "hyperapp";
import { State } from "../state";
import { Actions } from "../actions";

let emit: Emit;

export const NewWidget = <D extends {}>(
  view: Component<{ state: State; actions: Actions } & D, any>,
): Component<D, any> => (data, ...children) => {
  const [state, actions] = emit("getStateAndActions");
  return view(Object.assign({ state, actions }, data), ...children);
};

export const Connect = <OwnProps extends {}, StateProps extends {}>(
  view: Component<OwnProps & StateProps, any>,
  selector: (state: State, actions: Actions) => StateProps,
): Component =>
  NewWidget(({ state, actions, ...data }, ...children) =>
    view(Object.assign(data, selector(state, actions)), ...children),
  );

export const Widgets: Mixin<State, Actions> = e => {
  emit = e;
  return {
    events: {
      getStateAndActions: (state, actions) => [state, actions],
    },
  };
};
