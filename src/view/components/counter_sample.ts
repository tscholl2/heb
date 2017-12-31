import { h } from "picodom";
import { addStatelessSample, addStatefullSample } from "../../samples";
import { withState } from "./local-state";

const Counter = withState<any, number>(dispatch => (props, state = 0) =>
  h("div", undefined, [
    h("h1", undefined, [`localstate = ${state}`]),
    h("button", { onclick: () => dispatch((s = 0) => s + 1) }, "→ (local)"),
    h("h1", undefined, [`props = ${props}`]),
  ]),
);

addStatelessSample("local state counter", () => Counter("hi"));

addStatefullSample<number>("global + local state counter", dispatch => (state = 0) =>
  h("div", undefined, [
    h("button", { onclick: () => dispatch((s = 0) => s + 1) }, "→ (global)"),
    Counter(state),
  ]),
);
