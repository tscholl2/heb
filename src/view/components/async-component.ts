import { h, patch, Component, VNode } from "picodom";

export function asyncComponent<P>(
  componentName: string,
  fn: (props: P, children?: VNode<any>[]) => Promise<VNode<any>>,
  loader: (props: P, children?: VNode<any>[]) => VNode<any>,
): Component<any> {
  const update = (el: any, props: P) => {
    const { node: oldNode, props: oldProps, isLoading } = el.__stuff || (el.__stuff = {});
    if (shallowEquals(props, oldProps)) {
      return;
    }
    el.__stuff.props = props;
    const node = loader(props);
    console.log("patching loader");
    patch(oldNode, node, el);
    Object.assign(el.__stuff, { node, isLoading: true });
    fn(props).then(node => {
      if (shallowEquals(el.__stuff.props, props) && el.__stuff.isLoading) {
        console.log("patching thing");
        patch(el.__stuff.node, node, el);
        Object.assign(el.__stuff, { node, isLoading: false });
      }
    });
  };
  return props =>
    h(`x-${componentName}`, {
      oncreate: (el: any) => update(el, props),
      onupdate: (el: any) => update(el, props),
    });
}

function shallowEquals(a: any = {}, b: any = {}) {
  if (a === b) {
    return true;
  }
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) {
    return false;
  }
  for (let i = 0; i < ka.length; i++) {
    if (!b.hasOwnProperty(ka[i]) || b[ka[i]] !== a[ka[i]]) {
      return false;
    }
  }
  return true;
}
