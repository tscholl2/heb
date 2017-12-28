import { Controller } from "../controller";
declare const window: any;

export function connectToReduxDevtools(controller: Controller) {
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
