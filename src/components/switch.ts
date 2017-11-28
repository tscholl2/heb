import { h, IComponent } from "hyperapp";
import { routesMatcher, Params } from "../utils/url";

export interface SwitchProps {
  path: string;
  routes: Array<{
    route: string;
    component: IComponent<{ params: Params }, any>;
  }>;
}

export const Switch: IComponent<SwitchProps, any> = (props, children) => {
  const matcher = routesMatcher(props.routes.map(v => v.route));
  const m = matcher(props.path);
  if (m === undefined) {
    return;
  }
  return h(props.routes[m.index].component, { params: m.params }, children);
};
