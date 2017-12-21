import { patch } from "picodom";
import { Controller, actions } from "./controller";
import { view } from "./view";
import { initialState, IState } from "./model";
import { addListener } from "./addons/router";
declare const module: any;
declare const window: any;

function start(state = initialState) {
  const controller = new Controller<IState>();
  let node: any = undefined;
  const v = view(controller.dispatch);
  controller.addListener(state => patch(node, (node = v(state)), document.body));
  // listen for url changes
  addListener(path => controller.dispatch(actions.go(path)));
  // get the ball rolling
  controller.dispatch(() => state);
  // persist state in window for hot reloading
  controller.addListener(state => {
    console.log("updating state");
    window["state"] = state;
  });
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
      if (!(r as any)["__REDUX_DEVTOOLS__"]) {
        // TODO wrap reducers with some extra debugging info
        devtools.send({ type: "TODO" }, next);
      }
      return next;
    });
    devtools.subscribe((message: any) => {
      if (message.type === "DISPATCH" && message.state) {
        controller.dispatch(
          Object.assign(() => JSON.parse(message.state), { __REDUX_DEVTOOLS__: true }),
        );
      }
    });
  }
}

if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept(() => {
    console.log("ADDING A NEW THING");
    start(window["state"]);
  });
  module.hot.dispose(() => {
    document.body.innerHTML = "";
  });
  // this is run only 1x when the app first starts
  if (!window["__already_loaded__"]) {
    window["__already_loaded__"] = true;
    start();
  }
} else {
  // this is in production
  start();
}
