import { patch } from "picodom";
import { Controller } from "./controller";
import { view } from "./view";
import { initialState, IState } from "./model";

const controller = new Controller<IState>();
let node: any;
controller.addListener(state => {
  patch(node, (node = view(state, controller.dispatch)), document.body);
});

// to get it started
controller.dispatch(() => initialState);
