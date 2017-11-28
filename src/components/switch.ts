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

export function StaticSwitch(
  routes: string[],
): IComponent<{ path: string; components: IComponent<{ params: Params }>[] }, any> {
  const matcher = routesMatcher(routes);
  return ({ path, components }, children) => {
    const m = matcher(path);
    if (m === undefined) {
      return;
    }
    return h(components[m.index], { params: m.params }, children);
  };
}
