import { h, app } from "hyperapp";

app({
  state: {
    title: "Hello!",
  },
  view: (state: any) => h("h1", {}, state.title),
});
