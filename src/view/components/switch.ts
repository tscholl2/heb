import { Component } from "picodom";
import { routesMatcher, RouteProps } from "../../utils/router";

export interface SwitchProps {
  path: string;
  routes: Array<{
    route: string;
    component: Component<RouteProps>;
  }>;
}

export const Switch: Component<SwitchProps> = (props, children) => {
  const matcher = routesMatcher(props.routes.map(v => v.route));
  const m = matcher(props.path);
  if (m === undefined) {
    return;
  }
  return props.routes[m.index].component(m, children) as any;
};

export function StaticSwitch(
  routes: string[],
): Component<{ path: string; components: Component<RouteProps>[] }> {
  const matcher = routesMatcher(routes);
  return ({ path, components }, children) => {
    const m = matcher(path);
    if (m === undefined) {
      return;
    }
    return components[m.index](m, children) as any;
  };
}
