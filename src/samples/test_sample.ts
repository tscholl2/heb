import { h, patch } from "picodom";
import { Controller } from "../controller";
import { addSample } from "./sampler";

function Counter(count = 0, onclick: any) {
  return h("div", undefined, [h("button", { onclick }, ["↑"]), h("h2", undefined, [count])]);
}

addSample("counter", root => {
  const controller = new Controller<number>();
  let node: any = undefined;
  const v = (state: number) => Counter(state, () => controller.dispatch(() => state + 1));
  controller.addListener(state => patch(node, (node = v(state)), root));
  controller.dispatch(() => 0);
});

addSample("button", root => patch(undefined, h("button", undefined, ["clickme"]), root));
addSample("p", root => patch(undefined, h("p", undefined, ["paragraph"]), root));
