import { Component } from "hyperapp";
import { routesMatcher, Params } from "../utils";

export function NewRouter(
  routes: Array<{ route: string; component: Component<{ params: Params }> }>,
): Component<string, { params: Params }> {
  const rm = routesMatcher(routes.map(r => r.route));
  return (path, ...children) => {
    const match = rm(path);
    if (!match) {
      throw new Error(`no route found for "${path}"`);
    }
    return routes[match.index].component({ params: match.params }, ...children);
  };
}
