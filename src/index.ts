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

  // TODO check if production?
  if (window["__REDUX_DEVTOOLS_EXTENSION__"]) {
    // TODO: dont re-create devtools cause history is deleted on hot-reload
    const devtools = window["__REDUX_DEVTOOLS_EXTENSION__"].connect();
    devtools.send({ type: "APP_LOADED" }, controller.getState());
    controller.addPlugin(r => state => {
      const next = r(state);
      if (!(r as any)["__REDUX_DEVTOOLS__"]) {
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

if (module.hot) {
  module.hot.accept(() => {
    document.body.innerHTML = "";
    run();
  });
}

run();
