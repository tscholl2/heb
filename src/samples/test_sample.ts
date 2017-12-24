import { h } from "picodom";
import { addStatelessSample, addStatefullSample } from "./";

function Counter(count = 0, onclick: any) {
  return h("div", undefined, [
    h("h1", undefined, ["counter"]),
    h("button", { onclick }, ["↑"]),
    h("h2", undefined, [count]),
  ]);
}

addStatelessSample("img", () =>
  h("img", { src: require("../view/components/account-icon.svg") }),
);

addStatefullSample<number>("counter", (state = 0, dispatch) =>
  Counter(state, () => dispatch(() => state + 1)),
);

addStatelessSample("button", () => h("button", undefined, ["clickme"]));
addStatelessSample("p", () => h("p", undefined, ["paragraph"]));
