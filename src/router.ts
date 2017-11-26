import { Component } from "hyperapp";
import { routesMatcher, Params } from "./utils/url";
import { h } from "hyperapp";

const state = {
  url: getURL(),
};

const actions = {
  go: (state: any) => (url: string) => {
    if (url !== getURL()) {
      history.pushState({}, "", url);
    }
    if (url !== state.url) {
      return { url };
    }
    return undefined;
  },
};

function getURL() {
  const p = location.pathname;
  const s = location.search ? `?${location.search}` : "";
  const h = location.hash ? `#${location.hash}` : "";
  return `${p}${s}${h}`;
}

export const router = { state, actions };

// Hot-reloading may add lots of new listeners, so keep track
let oldListener: any;
export const newListener = ({ router: { go } }: any) => {
  if (oldListener) removeEventListener("popstate", oldListener);
  oldListener = () => go(getURL());
  addEventListener("popstate", oldListener);
};

export interface SwitchProps {
  url: string;
  routes: Array<{ route: string; component: Component<{ params: Params }, any> }>;
}

export const Switch: Component<SwitchProps, any> = (props, children) => {
  const matcher = routesMatcher(props.routes.map(v => v.route));
  const m = matcher(props.url);
  if (m === undefined) {
    return;
  }
  return h(props.routes[m.index].component, { params: m.params }, children);
};
