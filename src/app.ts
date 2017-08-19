import { h, app } from "hyperapp";
import hmr from "hyperapp-webpack-hmr";
export default (state: any) =>
  app({
    state,
    view: (state: any) => h("h1", undefined, state.title),
    mixins: [hmr({ name: "state" })],
  });
