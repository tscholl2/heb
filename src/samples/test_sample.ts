import { h, patch } from "picodom";
import { Controller } from "../controller";
import { addSample, addStatelessSample, addStatefullSample } from "./";

function Counter(count = 0, onclick: any) {
  return h("div", undefined, [h("button", { onclick }, ["↑"]), h("h2", undefined, [count])]);
}

addStatelessSample("img", () =>
  h("img", { src: "dist/" + require("../view/components/account-icon.svg") }),
);

addStatefullSample<number>("countr2", (state = 0, dispatch) =>
  Counter(state, () => dispatch(() => state + 1)),
);

addSample("counter", root => {
  const controller = new Controller<number>();
  let node: any = undefined;
  const v = (state: number) => Counter(state, () => controller.dispatch(() => state + 1));
  controller.addListener(state => patch(node, (node = v(state)), root));
  controller.dispatch(() => 0);
});

addSample("button", root => patch(undefined, h("button", undefined, ["clickme"]), root));
addSample("p", root => patch(undefined, h("p", undefined, ["paragraph"]), root));

addSample;
