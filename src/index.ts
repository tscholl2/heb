import { start } from "./app";

start();

declare const module: any;
declare const window: any;
if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./app", () => {
      document.body.innerHTML = "";
      start(window["state"]);
    });
  }
}
