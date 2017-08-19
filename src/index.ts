import app from "./app";

app({ title: "ugh" });

declare const module: any;
declare const window: any;
if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./app", function() {
      document.body.innerHTML = "";
      app(window["state"]);
    });
  }
}
