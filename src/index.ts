import { App } from "./app";

App();

declare const module: any;
declare const window: any;
if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./app", () => {
      document.body.innerHTML = "";
      App(window["state"]);
    });
  }
}
