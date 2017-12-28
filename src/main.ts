import { patch, VNode } from "picodom";
import { Controller, actions } from "./controller";
import { view } from "./view";
import { initialState, IState } from "./model";
import { addListener as addRouterListener } from "./addons/router";
import { connectToReduxDevtools } from "./addons/redux-devtools";
declare const module: any;
declare const window: any;

class ViewController {
  private view: () => VNode;
  private isUpdating = false;
  private shouldUpdate = false;
  private node: VNode;
  constructor(view: () => VNode) {
    this.view = view;
  }
  public update = () => {
    if (this.isUpdating) {
      this.shouldUpdate = true;
      return;
    }
    this.isUpdating = true;
    // TODO compare requestAnimationFrame and setTimeout
    requestAnimationFrame(() => {
      patch(this.node, (this.node = this.view()), document.body);
      this.isUpdating = false;
      if (this.shouldUpdate) {
        this.shouldUpdate = false;
        this.update();
      }
    });
  };
}

function start(state = initialState) {
  const controller = new Controller<IState>();
  const v = view(controller.dispatch);
  const vc = new ViewController(() => v(controller.getState()));
  controller.addListener(vc.update);
  addRouterListener(path => controller.dispatch(actions.go(path)));
  // get the ball rolling
  controller.dispatch(() => state);
  // persist state in window for hot reloading
  controller.addListener(state => console.log("updating state") || (window["state"] = state));
  // attach redux devtools
  if (process.env.NODE_ENV !== "production") {
    connectToReduxDevtools(controller);
  }
}

if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept(() => start(window["state"]));
  module.hot.dispose(() => (document.body.innerHTML = ""));
  // this is run only 1x when the app first starts
  if (!window["__already_loaded__"]) {
    window["__already_loaded__"] = true;
    start();
  }
} else {
  // this is in production
  start();
}
