import { patch } from "picodom";
import { Controller, actions } from "./controller";
import { view } from "./view";
import { initialState, IState } from "./model";
import { addListener } from "./addons/router";
declare const module: any;
declare const window: any;

function run() {
  const controller = new Controller<IState>();
  let node: any;
  const v = view(controller.dispatch);
  controller.addListener(state => {
    console.log("updating state");
    window["state"] = state;
    patch(node, (node = v(state)), document.body);
  });
  // listen for url changes
  addListener(path => controller.dispatch(actions.go(path)));
  // to get it started
  controller.dispatch(() => window["state"] || initialState);
}

if (module.hot) {
  module.hot.accept(() => {
    document.body.innerHTML = "";
    run();
  });
}

run();
