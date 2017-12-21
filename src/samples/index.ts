import { h, patch, VNode } from "picodom";
import { Controller, IDispatch } from "../controller";

export interface ISample {
  name: string;
  render(root: HTMLElement): void;
}

const samples: Array<ISample> = [];

export function addSample(name: ISample["name"], render: ISample["render"]) {
  samples.push({ name, render });
}

export function getSamples() {
  return samples;
}

// helper functions

export function addStatelessSample(name: ISample["name"], view: () => VNode) {
  samples.push({ name, render: root => patch(undefined, view(), root) });
}

export function addStatefullSample<S>(
  name: ISample["name"],
  view: (state: S | undefined, dispatch: IDispatch<S>) => VNode,
) {
  const controller = new Controller<S>();
  samples.push({
    name,
    render: root => {
      let node: any;
      const listener = (state?: S) => patch(node, (node = view(state, controller.dispatch)), root);
      controller.addListener(listener);
      listener();
    },
  });
}
