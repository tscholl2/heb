import { h, Component } from "hyperapp";
import { routesMatcher, Params } from "../utils/url";

export interface SwitchProps {
  url: string;
  routes: Array<{
    route: string;
    component: Component<{ params: Params }, any>;
  }>;
}

export const Switch: Component<SwitchProps, any> = (props, children) => {
  const matcher = routesMatcher(props.routes.map(v => v.route));
  const m = matcher(props.url);
  if (m === undefined) {
    return;
  }
  return h(props.routes[m.index].component, { params: m.params }, children);
};
