import { h, patch } from "picodom";
import { Controller } from "../src/controller";

function Counter(count = 0, onclick) {
  return h("div", undefined, [h("button", { onclick }, ["↑"]), h("h2", undefined, [count])]);
}

export default {
  name: "counter",
  sample: root => {
    const controller = new Controller();
    let node = undefined;
    const v = (state = 0) => Counter(state, () => controller.dispatch(() => state + 1));
    controller.addListener(state => patch(node, (node = v(state)), root));
    controller.dispatch(() => 0);
  },
};
