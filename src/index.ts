import { patch } from "picodom";
import { Controller, actions } from "./controller";
import { view } from "./view";
import { initialState, IState } from "./model";
import { addListener } from "./addons/router";

const controller = new Controller<IState>();
let node: any;
controller.addListener(state => {
  patch(node, (node = view(state, controller.dispatch)), document.body);
});

// listen for url changes
addListener(path => controller.dispatch(actions.go(path)));
// to get it started
controller.dispatch(() => initialState);
