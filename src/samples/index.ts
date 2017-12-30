import { patch, VNode } from "picodom";
import { Controller, IDispatch } from "../controller";

export interface ISample {
  name: string;
  render(root: HTMLElement): void;
}

export const samples: { [key: string]: ISample & { filename: string } } = {};

export function _addSampleFilename(filename: string) {
  Object.keys(samples).forEach(k => (samples[k].filename = samples[k].filename || filename));
}

function _addSample(name: ISample["name"], render: ISample["render"]) {
  samples[name] = { name, render, filename: "" };
}

// helper functions

export function addStatelessSample(name: ISample["name"], view: () => VNode) {
  _addSample(name, root => patch(undefined, view(), root));
}

export function addStatefullSample<S>(
  name: ISample["name"],
  view: (dispatch: IDispatch<S>) => (state: S | undefined) => VNode,
) {
  _addSample(name, root => {
    const controller = new Controller<S>();
    let node: any;
    const v = view(controller.dispatch);
    const listener = (state: S | undefined) => patch(node, (node = v(state)), root);
    controller.addListener(listener);
    controller.addListener(s =>
      history.pushState(
        {},
        "",
        `${location.pathname}${location.search}#${btoa(JSON.stringify(s))}`,
      ),
    );
    const hash = window.location.hash.substr(1);
    if (hash !== "") {
      controller.dispatch(() => JSON.parse(atob(hash)));
    } else {
      listener(undefined);
    }
  });
}
