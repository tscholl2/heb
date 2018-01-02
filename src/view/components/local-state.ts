import { h, patch, VNode, Component } from "picodom";
import { Controller, IDispatch } from "../../controller";

export function withState<P, S>(
  fn: (dispatch: IDispatch<S>) => (props: P, state: S) => VNode<any>,
) {
  const controller = new Controller<S>();
  const view = fn(controller.dispatch);
  const render = (el: any) => {
    if (!el.__listener) {
      el.__listener = () => {
        const node = view(el.__props, controller.getState());
        patch(el.__node, node, el);
        el.__node = node;
      };
      controller.addListener(el.__listener);
    }
    el.__listener();
  };
  return (props: P) => {
    const update = (el: any) => {
      el.__props = props;
      render(el);
    };
    return h("x-state", { oncreate: update, onupdate: update });
  };
}

export function withState2<P, S>(
  componentName: string,
  fn: (dispatch: IDispatch<S>) => Component<P & { state: S }>,
): Component<P> {
  const controller = new Controller<S>();
  const view = fn(controller.dispatch);
  const render = (el: any, props: P, children?: (VNode<any> | string)[]) => {
    if (!el.__listener) {
      el.__listener = () => {
        const node = view({ ...(props as any), state: controller.getState() }, children);
        patch(el.__node, node, el);
        el.__node = node;
      };
      controller.addListener(el.__listener);
    }
    el.__listener();
  };
  return (props, children) => {
    return h(`x-state-${componentName}`, {
      oncreate: (el: HTMLElement) => render(el, props, children),
      onupdate: (el: HTMLElement) => render(el, props, children),
    });
  };
}
