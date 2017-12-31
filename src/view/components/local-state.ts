import { h, patch, VNode } from "picodom";
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
