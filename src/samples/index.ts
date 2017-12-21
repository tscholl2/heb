import { patch, VNode } from "picodom";
import { Controller, IDispatch } from "../controller";

export interface ISample {
  name: string;
  render(root: HTMLElement): void;
}

const samples: { [key: string]: ISample } = {};

export function addSample(name: ISample["name"], render: ISample["render"]) {
  samples[name] = { name, render };
}

export function getSamples() {
  return samples;
}

// helper functions

export function addStatelessSample(name: ISample["name"], view: () => VNode) {
  samples[name] = { name, render: root => patch(undefined, view(), root) };
}

export function addStatefullSample<S>(
  name: ISample["name"],
  view: (state: S | undefined, dispatch: IDispatch<S>) => VNode,
) {
  samples[name] = {
    name,
    render: root => {
      const controller = new Controller<S>();
      let node: any;
      const listener = (state: S | undefined, dispatch: IDispatch<S>) =>
        patch(node, (node = view(state, dispatch)), root);
      controller.addListener(listener);
      controller.addListener(s => history.pushState({}, "", `/${name}#${btoa(JSON.stringify(s))}`));
      const hash = window.location.hash.substr(1);
      if (hash !== "") {
        controller.dispatch(() => JSON.parse(atob(hash)));
      } else {
        listener(undefined, controller.dispatch);
      }
    },
  };
}
