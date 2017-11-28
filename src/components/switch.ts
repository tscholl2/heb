import { IComponent } from "hyperapp";
import { routesMatcher, Params } from "../utils/url";

export interface SwitchProps {
  path: string;
  routes: Array<{
    route: string;
    component: IComponent<{ params: Params }>;
  }>;
}

export const Switch: IComponent<SwitchProps> = (props, children) => {
  const matcher = routesMatcher(props.routes.map(v => v.route));
  const m = matcher(props.path);
  if (m === undefined) {
    return;
  }
  return props.routes[m.index].component(m, children);
};

export function StaticSwitch(
  routes: string[],
): IComponent<{ path: string; components: IComponent<{ params: Params }>[] }> {
  const matcher = routesMatcher(routes);
  return ({ path, components }, children) => {
    const m = matcher(path);
    if (m === undefined) {
      return;
    }
    return components[m.index](m, children);
  };
}
