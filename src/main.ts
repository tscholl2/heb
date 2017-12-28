import { patch, VNode } from "picodom";
import { Controller, actions } from "./controller";
import { view } from "./view";
import { initialState, IState } from "./model";
import { addListener as addRouterListener } from "./addons/router";
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
  // controller.addListener(state => patch(node, (node = v(state)), document.body));
  // listen for url changes
  addRouterListener(path => controller.dispatch(actions.go(path)));
  // get the ball rolling
  controller.dispatch(() => state);
  // persist state in window for hot reloading
  controller.addListener(state => console.log("updating state") || (window["state"] = state));
  // attach redux devtools
  // TODO also check if production
  if (window["__REDUX_DEVTOOLS_EXTENSION__"]) {
    let devtools: any;
    if (window["devtools"] === undefined) {
      devtools = window["__REDUX_DEVTOOLS_EXTENSION__"].connect();
      window["devtools"] = devtools;
      devtools.send({ type: "APP_START" }, controller.getState());
    } else {
      devtools = window["devtools"];
      devtools.send({ type: "APP_RELOADED" }, controller.getState());
    }
    controller.addPlugin(r => state => {
      const next = r(state);
      let s: any = r;
      if (!s.__REDUX_DEVTOOLS_IGNORE__) {
        devtools.send({ type: s.__debug_name || "?", args: s.__debug_args || [] }, next);
      }
      return next;
    });
    devtools.subscribe((message: any) => {
      if (message.type === "DISPATCH" && message.state) {
        controller.dispatch(
          Object.assign(() => JSON.parse(message.state), { __REDUX_DEVTOOLS_IGNORE__: true }),
        );
      }
    });
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
